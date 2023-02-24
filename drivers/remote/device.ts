import { Remote } from "../../remote";
import { DeviceData, DeviceSettings } from "./types";
import AndroidTVRemoteClient from "./client";

class RemoteDevice extends Remote {
  client?: AndroidTVRemoteClient;

  async initializeClient() {
    const data: DeviceData = this.getData();
    const settings: DeviceSettings = this.getSettings();

    this.client = new AndroidTVRemoteClient(
        settings.ip,
        {secret: data.secret}
    );

    this.initializeListeners()
  }

  private initializeListeners()
  {
    if (!this.client) {
      throw new Error('Client not initialized');
    }

    this.client.on('powered', (powered) => {
      console.debug("Powered : " + powered)
    });

    this.client.on('volume', (volume) => {
      console.debug("Volume : " + volume.level + '/' + volume.maximum + " | Muted : " + volume.muted);
    });

    this.client.on('current_app', (current_app) => {
      console.debug("Current App : " + current_app);
    });

    // this.client.on('ready', async () => {
    //   let cert = this.client.getCertificate();
    //
    //   this.client.sendKey(RemoteKeyCode.MUTE, RemoteDirection.SHORT)
    //
    //   this.client.sendAppLink("https://www.disneyplus.com");
    // });
  }

  async onSettings({
    newSettings,
    changedKeys,
  }: {
    newSettings: object;
    changedKeys: string[];
  }) {
    // TODO: fix typing once Athom fixes their TypeScript implementation
    const typedNewSettings = newSettings as DeviceSettings;

    // if (changedKeys.includes("key")) {
    //   const data: DeviceData = this.getData();
    //   const newApi = new SolarEdgeApi(
    //     typedNewSettings.key,
    //     data.sid,
    //     data.serial_number,
    //     this.homey.clock.getTimezone()
    //   );
    //
    //   await newApi.checkSettings();
    //
    //   this.client = newApi;
    //
    //   // Force production check when API key is changed
    //   this.checkProduction();
    // }
    //
    // if (changedKeys.includes("interval") && typedNewSettings.interval) {
    //   this.resetInterval(typedNewSettings.interval);
    //   this.homey.log(`Changed interval to ${typedNewSettings.interval}`);
    // }
  }
}

module.exports = RemoteDevice;
