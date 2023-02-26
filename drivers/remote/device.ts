import {Remote} from "../../remote";
import {DeviceData, DeviceSettings, SettingsInput} from "./types";
import AndroidTVRemoteClient from "./client";

class RemoteDevice extends Remote {
    client?: AndroidTVRemoteClient;

    async initializeClient() {
        const data: DeviceData = this.getData();
        const settings: DeviceSettings = this.getSettings();

        this.client = new AndroidTVRemoteClient(
            settings.ip,
            data.cert
        );
        await this.client.start();

        this.client.on('ready', () => {
            this.log("Client has been initialized")
            this.setAvailable();
        })

        this.initializeListeners()
    }

    private initializeListeners() {
        if (!this.client) {
            throw new Error('Client not initialized');
        }

        this.client.on('powered', async (powered) => {
            await this.setCapabilityValue('onoff', powered);
        });

        this.client.on('volume', async (volume) => {
            await this.setCapabilityValue('volume', volume.level);
            this.log('volume', volume);
            this.log("Volume : " + volume.level + '/' + volume.maximum + " | Muted : " + volume.muted);
        });

        this.client.on('current_app', (current_app) => {
            // this.setCapabilityValue('current_application', current_app);
        });

        this.client.on('unpaired', async () => {
            await this.setUnavailable(this.homey.__('error.unpaired'));
        });

        this.client.on('secret', async () => {
            await this.setUnavailable(this.homey.__('error.unpaired'));
        });

        this.client.on('error', async () => {
            // TODO: is this necessary?
            await this.reloadClient(60);
        });
    }

    async onSettings({newSettings, changedKeys}: SettingsInput) {
        if (changedKeys.includes("ip")) {
            await this.reloadClient();
        }
    }

    private async reloadClient(timeoutInSeconds: number | null = null) {
        try {
            this.client?.stop()
        } finally {
            if (timeoutInSeconds !== null) {
                await this.homey.setTimeout(this.initializeClient.bind(this), timeoutInSeconds * 1000);
            } else {
                await this.initializeClient();
            }
        }
    }
}

module.exports = RemoteDevice;
