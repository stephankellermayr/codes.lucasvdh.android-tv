import {Device, DiscoveryResultMAC, DiscoveryResultMDNSSD, DiscoveryResultSSDP, DiscoveryStrategy, Driver} from "homey";
import AndroidTVRemoteClient from "./client";
import {Device as DeviceType} from "./types";

class RemoteDriver extends Driver {
    pairingClient?: AndroidTVRemoteClient;

    async onInit(): Promise<void> {
        this.log("Driver has been initialised");
    }

    handleDiscoveryResult(discoveryResult: any) {
        this.log("Got result:", discoveryResult);
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
                let discoveredDevices = this.getDiscovedDevices(discoveryStrategy)
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
                pairingDevice.data.cert = await pairingClient.getCertificate();
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

        // const pairingClient = this.getPairingClientByIp(discoveryResult.address);

        // this.log('pairingClient.start()');
        // pairingClient.start();

        // this.discovery('android-tv');

        // this.client.on('secret', () => {
        //   line.question("Code : ", async (code) => {
        //     this.client.sendCode(code);
        //   });
        // });
        //
        // session.setHandler("validate", async (data: PairData) => {
        //   this.homey.log("Pair data received");
        //
        //   const { apiKey } = data;
        //   this.apiKey = apiKey;
        //
        //   return new SolarEdgeApi(apiKey).getSites();
        // });
        //
        // session.setHandler("list_devices", async () => {
        //   this.homey.log("Listing devices");
        //
        //   const devicesList: Device[] = [];
        //
        //   if (this.apiKey) {
        //     const sitesList = await new SolarEdgeApi(this.apiKey).getSites();
        //
        //     for (const site of sitesList.sites.site) {
        //       const equipmentList = await new SolarEdgeApi(
        //         this.apiKey,
        //         site.id
        //       ).getEquipmentList();
        //
        //       const inverterCount = equipmentList.reporters.list.length;
        //
        //       for (const reporter of equipmentList.reporters.list) {
        //         devicesList.push({
        //           name: `${reporter.name} (${reporter.manufacturer} ${reporter.model})`,
        //           data: {
        //             sid: site.id,
        //             serial_number: reporter.serialNumber,
        //           },
        //           settings: { key: this.apiKey, interval: 15 * inverterCount },
        //         });
        //       }
        //     }
        //   }
        //
        //   return devicesList;
        // });
    }

    private getPairingClientByDevice(device: DeviceType): AndroidTVRemoteClient {
        return new AndroidTVRemoteClient(device.settings.ip, device.data.cert);
    }

    private getDeviceByDiscoveryResult(discoveryResult: DiscoveryResultMDNSSD): DeviceType {
        return {
            name: this.getNameByMDNSDiscoveryResult(discoveryResult),
            data: {
                id: discoveryResult.id,
                cert: {}
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

    private getDiscovedDevices(discoveryStrategy: DiscoveryStrategy): Array<DeviceType> {
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
}

module.exports = RemoteDriver;
