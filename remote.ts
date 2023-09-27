import { Device } from "homey";

export abstract class Remote extends Device {
  async onInit(): Promise<void> {
    this.log('Device has been initialized');

    // Migrate cert to store for older devices
    if (!this.getStoreKeys().includes('cert')) {
      await this.setStoreValue('cert', this.getData().cert);
    }

    // Force immediate production check
    this.initializeClient();
  }

  abstract initializeClient(): Promise<void>;
}
