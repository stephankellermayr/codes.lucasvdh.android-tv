import sourceMapSupport from "source-map-support";
sourceMapSupport.install();

import { App } from "homey";

class AndroidTV extends App {
  /**
   * onInit is called when the app is initialized.
   */
  async onInit(): Promise<void> {
    this.homey.log("App has been initialized");

    const discoveryStrategy = this.homey.discovery.getStrategy("mdns");

    // Use the discovery results that were already found
    const initialDiscoveryResults = discoveryStrategy.getDiscoveryResults();
    for (const discoveryResult of Object.values(initialDiscoveryResults)) {
      this.handleDiscoveryResult(discoveryResult);
    }

    // And listen to new results while the app is running
    discoveryStrategy.on("result", discoveryResult => {
      this.handleDiscoveryResult(discoveryResult);
    });
  }

  handleDiscoveryResult(discoveryResult) {
    this.log("Got result:", discoveryResult);
  }
}

module.exports = SolarPanels;
