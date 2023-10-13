---
description: Save Energy with the Android TV App for Homey and an NVIDIA Shield
layout:
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# Saving Energy

## Introduction

In our modern households, media stations like the NVIDIA Shield, Smart TVs, and amplifiers have become essential. However, did you know that most devices still consume significant amounts of energy even in standby mode?

Fortunately, there's a smart solution that can help you prevent standby power consumption. This way, you not only save energy and costs but also retain convenience. With just one press of the NVIDIA Shield remote control, you can power everything on, and with the same ease, turn everything off.

In this article, we'll show you how to make your media station more energy-efficient using the Android TV app for Homey and an NVIDIA Shield.

<figure><img src="../.gitbook/assets/media-station-android-tv-example.png" alt="" width="563"><figcaption></figcaption></figure>

### Requirements

* Homey Pro
* NVIDIA Shield with the Android TV app
* Philips TV with the Android TV and Philips TV apps
* Yamaha amplifier with the Yamaha app
* Smart plug (e.g., from INNR)

### How it Works

The key to preventing standby power consumption lies in the collaboration between Homey, the Android TV app, and the smart plug.

**Step 1: Installation and Integration**

Ensure that the Philips TV app for Homey, as well as the Yamaha app, are correctly installed and integrated with your devices.

**Step 2: Placing the Smart Plug**

Connect the smart plug to the power outlet and link it to your TV and amplifier. This will act as the switch between the media station and the power supply.

**Step 3: Setting up Automation**

Through Homey, you can now set up an automation that ensures when the NVIDIA Shield is turned on, the smart plug is activated. This provides power to the TV and amplifier.

**Step 4: Infrared Signal for the TV**

The Philips TV app for Homey utilizes an infrared signal to power on the television. This is automatically triggered when the NVIDIA Shield starts up.

**Step 5: Yamaha App for the Amplifier**

Using the Yamaha app, Homey selects the correct input channel and sets the volume to a standard level as soon as the amplifier is activated.

### Savings and Annual Calculation:

Standby power consumption of TVs can range from 50 to 100 watts, depending on the model. By completely shutting down these devices when not in use, you can achieve significant savings.

Let's take an example: assuming your media station is on for an average of 8 hours a day. With a standby consumption of 75 watts, you would consume 1.2 kWh per day. Annually, this amounts to 438 kWh. With an average electricity price of 0.25 euros per kWh, you would save about 109.5 euros annually.

### Conclusion

With the Android TV app for Homey and a smart plug, you can easily prevent standby power consumption and make substantial savings on your energy bill. By implementing this smart solution, you not only contribute to a greener future but also keep some extra money in your pocket.

### Detailed Flows

Below, you'll find an example of how you can set up the flows for turning on and off.

<figure><img src="../.gitbook/assets/turn-on-media-station-dutch.jpg" alt=""><figcaption><p>Turn on Media Center</p></figcaption></figure>

<figure><img src="../.gitbook/assets/turn-off-media-station-dutch.jpg" alt=""><figcaption><p>Turn off Media Center</p></figcaption></figure>
