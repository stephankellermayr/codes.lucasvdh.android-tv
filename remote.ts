import { Device } from "homey";

export class Remote extends Device {

  async onInit(): Promise<void> {
    // Force immediate production check
    this.initializeClient();
  }

  initializeClient() {
    throw new Error("Expected override");
  }
}
