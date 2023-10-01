import {
  Device,
  DiscoveryResultMAC,
  DiscoveryResultMDNSSD,
  DiscoveryResultSSDP,
  DiscoveryStrategy,
  Driver,
  FlowCardTriggerDevice
} from "homey";
import AndroidTVRemoteClient from "./client";
import {Device as DeviceType, DeviceData, DeviceSettings} from "./types";
import RemoteDevice from "./device";
import PairSession from "homey/lib/PairSession";

class RemoteDriver extends Driver {
  private applicationOpenedTrigger: FlowCardTriggerDevice | undefined;

  async onInit(): Promise<void> {
    this.log("Driver has been initialised");

    await this.registerFlowCards()
    this.log('Flow cards have been initialized')
  }

  async onPair(session: any): Promise<void> {
    let devices: Array<DeviceType> = []
    let existingDevices: Array<Device> = this.getDevices()
    let pairingDevice: DeviceType | null = null
    let pairingClient: AndroidTVRemoteClient | null = null
    const discoveryStrategy: DiscoveryStrategy = this.getDiscoveryStrategy();

    session.setHandler('showView', async (view: string) => {
      this.log('Show view', view)

      if (view === 'discover') {
        let discoveredDevices = this.getDiscoveredDevices(discoveryStrategy)
        let hasDiscoveredDevices = false
        devices = discoveredDevices.filter(item => {
          if (item === null) {
            return false
          }

          hasDiscoveredDevices = true

          return existingDevices.filter(existingDevice => {
            return item.data.id === existingDevice.getData().id
          }).length === 0
        })

        if (devices.length > 0) {
          await session.showView('list_devices')
        } else {
          await session.showView('add_by_ip')

          if (hasDiscoveredDevices) {
            await session.emit('add_by_ip_hint', this.homey.__('pair.add_by_ip.no_new_devices_hint'))
          }
        }
      }

      if (view === "authenticate") {
        if (pairingDevice === null) {
          await session.showView('list_devices')
          this.error('Pairing device not set');
          return
        }

        pairingClient = this.getPairingClientByDevice(pairingDevice);

        await pairingClient.start();
      }
    });

    session.setHandler('list_devices', async (): Promise<DeviceType[]> => {
      return devices;
    })

    session.setHandler('list_devices_selection', async (devices: DeviceType[]) => {
      let device = devices.pop();

      if (device !== undefined) {
        pairingDevice = device;
      }
    })

    session.setHandler('pincode', async (code: Buffer) => {
      if (pairingClient === null) {
        this.error('Pairing client should not be null');
        return;
      }
      if (pairingDevice === null) {
        this.error('Pairing device should not be null');
        return;
      }

      this.log('Pincode submitted', code.join(''))

      const pairingResult = await pairingClient.sendCode(code.join(''));

      if (pairingResult) {
        pairingDevice.store.cert = await pairingClient.getCertificate();
        session.showView('add_device')
      } else {
        session.showView('discover')
      }

      return pairingResult;
    })

    session.setHandler('getDevice', async (): Promise<DeviceType> => {
      if (pairingDevice === null) {
        throw new Error('Pairing device not set');
      }

      return pairingDevice
    })
  }

  async onRepair(session: PairSession, repairingDevice: Device): Promise<void> {
    // Argument session is a PairSocket, similar to Driver.onPair
    // Argument device is a Homey.Device that's being repaired

    this.log('Repairing device', repairingDevice.getName())

    const pairingClient = this.getPairingClientByDevice({
      name: repairingDevice.getName(),
      data: repairingDevice.getData() as DeviceData,
      store: {},
      settings: repairingDevice.getSettings() as DeviceSettings
    } as DeviceType);

    session.setHandler('showView', async (view: string) => {
      this.log('Show view', view)

      if (view === 'start_repair') {
        console.log('START PAIRING')

        pairingClient.on('secret', () => {
          this.log('Pairing client started, show authenticate view')
          session.showView('authenticate')
        })

        await pairingClient.start();
      }
    });

    session.setHandler('pincode', async (code: Buffer) => {
      if (pairingClient === null) {
        this.error('Pairing client should not be null');
        return;
      }
      if (repairingDevice === null) {
        this.error('Pairing device should not be null');
        return;
      }

      this.log('Pincode submitted', code.join(''))

      const pairingResult = await pairingClient.sendCode(code.join(''));

      if (pairingResult) {
        await repairingDevice.setStoreValue('cert', await pairingClient.getCertificate());
        session.done()
      } else {
        session.showView('authenticate')
      }

      return pairingResult;
    })

    session.setHandler("disconnect", async () => {
      // Cleanup
    });
  }

  private getPairingClientByDevice(device: DeviceType): AndroidTVRemoteClient {
    return new AndroidTVRemoteClient(device.settings.ip, device.store.cert);
  }

  private getDeviceByDiscoveryResult(discoveryResult: DiscoveryResultMDNSSD): DeviceType {
    return {
      name: this.getNameByMDNSDiscoveryResult(discoveryResult),
      data: {
        id: discoveryResult.id,
      },
      store: {
        cert: {
          key: undefined,
          cert: undefined,
        }
      },
      settings: {
        ip: discoveryResult.address
      },
    }
  }

  private getNameByMDNSDiscoveryResult(discoveryResult: DiscoveryResultMDNSSD): string {
    let name: string = '';
    let txtKeys = Object.keys(discoveryResult.txt);
    let txtValues = Object.values(discoveryResult.txt);

    if (txtKeys.indexOf('fn')) {
      name = txtValues[txtKeys.indexOf('fn')];
    }

    return name;
  }

  private getDiscoveredDevices(discoveryStrategy: DiscoveryStrategy): Array<DeviceType> {
    const discoveryResults = discoveryStrategy.getDiscoveryResults();

    return Object.values(discoveryResults)
        .map(discoveryResult => {
          if (discoveryResult instanceof DiscoveryResultSSDP || discoveryResult instanceof DiscoveryResultMAC) {
            this.log('Incorrect discovery result type received.');
            return null;
          }

          return this.getDeviceByDiscoveryResult(discoveryResult)
        })
        .filter(device => device !== null)
        .map(discoveryResult => discoveryResult as DeviceType);
  }

  private async registerFlowCards() {
    this.applicationOpenedTrigger = this.homey.flow.getDeviceTriggerCard('application_opened')
  }

  private triggerApplicationOpenedTrigger(device: RemoteDevice, args: { app: string }) {
    return this.applicationOpenedTrigger?.trigger(device, args)
  }
}

module.exports = RemoteDriver;
