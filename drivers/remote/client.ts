import {AndroidRemoteCertificate, AndroidRemoteOptions} from "./types";

import {AndroidRemote, RemoteDirection, RemoteKeyCode} from "../../androidtv-remote";

export enum Input {
  HDMI1,
  HDMI2,
  HDMI3,
  HDMI4,
  VGA,
  COMPONENT1,
  COMPONENT2,
  COMPOSITE1,
  COMPOSITE2,
}

export interface Volume {
  level: number;
  maximum: number;
  muted: boolean;
}

export default class AndroidTVRemoteClient {
  private client: AndroidRemote;

  private readonly host: string;
  private readonly pairing_port: number;
  private readonly remote_port: number;
  private readonly client_name: string;
  private readonly cert: AndroidRemoteCertificate;

  constructor(
      host: string,
      cert: AndroidRemoteCertificate = {key: undefined, cert: undefined},
      client_name: string = 'androidtv-remote',
      pairing_port: number = 6467,
      remote_port: number = 6466,
      debug: boolean = false
  ) {
    this.host = host;
    this.client_name = client_name;
    this.pairing_port = pairing_port;
    this.remote_port = remote_port;
    this.cert = cert;

    this.client = new AndroidRemote(this.host, this.getOptions());
    this.client.on('error', (error: any) => {
      console.log('REMOTE CLIENT ERROR', error);
    })

    if (debug) {
      this.client.on('log', (...args) => console.log('log', ...args));
      this.client.on('log.debug', (...args) => console.log('debug', ...args));
      this.client.on('log.info', (...args) => console.log('info', ...args));
      this.client.on('log.error', (...args) => console.log('error', ...args));
    }
  }

  public on(event: string, callback: (data: any) => void) {
    this.client.on(event, callback);
  }

  public async start(): Promise<void> {
    return await this.client.start();
  }

  public async sendCode(code: string): Promise<boolean | undefined> {
    return this.client.sendCode(code);
  }

  public async getCertificate(): Promise<AndroidRemoteCertificate> {
    return this.client.getCertificate();
  }

  private getOptions(): AndroidRemoteOptions {
    return <AndroidRemoteOptions>{
      pairing_port: this.pairing_port,
      remote_port: this.remote_port,
      service_name: this.client_name,
      cert: this.cert,
      timeout: 1000 * 60
    };
  }

  public mute(): void {
    this.client.sendKey(RemoteKeyCode.KEYCODE_MUTE, RemoteDirection.SHORT)
  }

  public volumeUp(direction: number | null = null): void {
    this.client.sendKey(RemoteKeyCode.KEYCODE_VOLUME_UP, direction || RemoteDirection.SHORT)
  }

  public volumeDown(direction: number | null = null): void {
    this.client.sendKey(RemoteKeyCode.KEYCODE_VOLUME_DOWN, direction || RemoteDirection.SHORT)
  }

  public sendKeySelect(direction: number | null = null): void {
    this.client.sendKey(RemoteKeyCode.KEYCODE_BUTTON_SELECT, direction || RemoteDirection.SHORT)
  }

  public setInput(input: Input): void {
    if (input === Input.HDMI1) {
      this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT_HDMI_1, RemoteDirection.SHORT)
    } else if (input === Input.HDMI2) {
      this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT_HDMI_2, RemoteDirection.SHORT)
    } else if (input === Input.HDMI3) {
      this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT_HDMI_3, RemoteDirection.SHORT)
    } else if (input === Input.HDMI4) {
      this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT_HDMI_4, RemoteDirection.SHORT)
    } else if (input === Input.VGA) {
      this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT_VGA_1, RemoteDirection.SHORT)
    } else if (input === Input.COMPONENT1) {
      this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT_COMPONENT_1, RemoteDirection.SHORT)
    } else if (input === Input.COMPONENT2) {
      this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT_COMPONENT_2, RemoteDirection.SHORT)
    } else if (input === Input.COMPOSITE1) {
      this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT_COMPOSITE_1, RemoteDirection.SHORT)
    } else if (input === Input.COMPOSITE2) {
      this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT_COMPOSITE_2, RemoteDirection.SHORT)
    } else {
      throw new Error('Invalid HDMI input');
    }
  }

  public sendKeyTv(direction: number | null = null): void {
    this.client.sendKey(RemoteKeyCode.KEYCODE_TV, direction || RemoteDirection.SHORT)
  }

  public sendKeySource(direction: number | null = null): void {
    this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT, direction || RemoteDirection.SHORT)
  }

  public sendKeyMediaPlay(direction: number | null = null): void {
    this.client.sendKey(RemoteKeyCode.KEYCODE_MEDIA_PLAY, direction || RemoteDirection.SHORT)
  }

  public sendKeyMediaPause(direction: number | null = null): void {
    this.client.sendKey(RemoteKeyCode.KEYCODE_MEDIA_PAUSE, direction || RemoteDirection.SHORT)
  }

  public sendKeyMediaStop(direction: number | null = null): void {
    this.client.sendKey(RemoteKeyCode.KEYCODE_MEDIA_STOP, direction || RemoteDirection.SHORT)
  }

  public sendKeyMediaNext(direction: number | null = null): void {
    this.client.sendKey(RemoteKeyCode.KEYCODE_MEDIA_NEXT, direction || RemoteDirection.SHORT)
  }

  public sendKeyChannelUp(direction: number | null = null): void {
    this.client.sendKey(RemoteKeyCode.KEYCODE_CHANNEL_UP, direction || RemoteDirection.SHORT)
  }

  public sendKeyChannelDown(direction: number | null = null): void {
    this.client.sendKey(RemoteKeyCode.KEYCODE_CHANNEL_DOWN, direction || RemoteDirection.SHORT)
  }

  public sendKeyMediaPrevious(direction: number | null = null): void {
    this.client.sendKey(RemoteKeyCode.KEYCODE_MEDIA_PREVIOUS, direction || RemoteDirection.SHORT)
  }

  public sendKeyMediaRewind(direction: number | null = null): void {
    this.client.sendKey(RemoteKeyCode.KEYCODE_MEDIA_REWIND, direction || RemoteDirection.SHORT)
  }

  public sendKeyMediaFastForward(direction: number | null = null): void {
    this.client.sendKey(RemoteKeyCode.KEYCODE_MEDIA_FAST_FORWARD, direction || RemoteDirection.SHORT)
  }

  public sendKeyDpadUp(direction: number | null = null): void {
    this.client.sendKey(RemoteKeyCode.KEYCODE_DPAD_UP, direction || RemoteDirection.SHORT)
  }

  public sendKeyDpadDown(direction: number | null = null): void {
    this.client.sendKey(RemoteKeyCode.KEYCODE_DPAD_DOWN, direction || RemoteDirection.SHORT)
  }

  public sendKeyDpadLeft(direction: number | null = null): void {
    this.client.sendKey(RemoteKeyCode.KEYCODE_DPAD_LEFT, direction || RemoteDirection.SHORT)
  }

  public sendKeyDpadRight(direction: number | null = null): void {
    this.client.sendKey(RemoteKeyCode.KEYCODE_DPAD_RIGHT, direction || RemoteDirection.SHORT)
  }

  public sendKeyDpadCenter(direction: number | null = null): void {
    this.client.sendKey(RemoteKeyCode.KEYCODE_DPAD_CENTER, direction || RemoteDirection.SHORT)
  }

  public sendKeyHome(direction: number | null = null): void {
    this.client.sendKey(RemoteKeyCode.KEYCODE_HOME, direction || RemoteDirection.SHORT)
  }

  public sendKeyBack(direction: number | null = null): void {
    this.client.sendKey(RemoteKeyCode.KEYCODE_BACK, direction || RemoteDirection.SHORT)
  }

  public sendKeyMenu(direction: number | null = null): void {
    this.client.sendKey(RemoteKeyCode.KEYCODE_MENU, direction || RemoteDirection.SHORT)
  }

  public openApplication(application: string): void {
    this.client.sendAppLink(application);
  }

  public sendPower(): void {
    this.client.sendPower()
  }

  public stop(): void {
    this.client.stop()
  }

}
