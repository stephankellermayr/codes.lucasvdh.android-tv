import { Device } from "homey";

export class Remote extends Device {

  async onInit(): Promise<void> {
    this.log('Device has been initialized');
    await this.setUnavailable();

    // Force immediate production check
    this.initializeClient();
  }

  initializeClient() {
    throw new Error("Not implemented");
  }
}
