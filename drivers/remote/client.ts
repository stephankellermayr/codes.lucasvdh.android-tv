import {AndroidRemoteCertificate, AndroidRemoteOptions} from "./types";

import { AndroidRemote, RemoteKeyCode, RemoteDirection } from "androidtv-remote";
import {match} from "assert";

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
    private client?: any;

    private readonly host: string;
    private readonly pairing_port: number;
    private readonly remote_port: number;
    private readonly client_name: string;
    private readonly cert: AndroidRemoteCertificate;

    constructor(
        host: string,
        cert: AndroidRemoteCertificate = {},
        client_name: string = 'androidtv-remote',
        pairing_port: number = 6467,
        remote_port: number = 6466
    ) {
        this.host = host;
        this.client_name = client_name;
        this.pairing_port = pairing_port;
        this.remote_port = remote_port;
        this.cert = cert;

        this.initClient();
    }

    private initClient() {
        this.client = new AndroidRemote(this.host, this.getOptions());
    }

    public on(event: string, callback: (data: any) => void)
    {
        this.client.on(event, callback);
    }

    public async start(): Promise<boolean> {
        return await this.client.start();
    }

    public async sendCode(code: string): Promise<boolean> {
        return await this.client.sendCode(code);
    }

    public async getCertificate(): Promise<AndroidRemoteCertificate> {
        return await this.client.getCertificate();
    }

    private getOptions(): AndroidRemoteOptions {
        return <AndroidRemoteOptions>{
            pairing_port: this.pairing_port,
            remote_port: this.remote_port,
            name: this.client_name,
            cert: this.cert
        };
    }

    public mute(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_MUTE, RemoteDirection.SHORT)
    }

    public volumeUp(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_VOLUME_UP, RemoteDirection.SHORT)
    }

    public volumeDown(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_VOLUME_DOWN, RemoteDirection.SHORT)
    }

    public sendKeySelect(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_BUTTON_SELECT, RemoteDirection.SHORT)
    }

    public setInput(input: Input): void {
        if (input === Input.HDMI1) {
            this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT_HDMI_1, RemoteDirection.SHORT)
        }
        else if (input === Input.HDMI2) {
            this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT_HDMI_2, RemoteDirection.SHORT)
        }
        else if (input === Input.HDMI3) {
            this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT_HDMI_3, RemoteDirection.SHORT)
        }
        else if (input === Input.HDMI4) {
            this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT_HDMI_4, RemoteDirection.SHORT)
        }
        else if (input === Input.VGA) {
            this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT_VGA_1, RemoteDirection.SHORT)
        }
        else if (input === Input.COMPONENT1) {
            this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT_COMPONENT_1, RemoteDirection.SHORT)
        }
        else if (input === Input.COMPONENT2) {
            this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT_COMPONENT_2, RemoteDirection.SHORT)
        }
        else if (input === Input.COMPOSITE1) {
            this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT_COMPOSITE_1, RemoteDirection.SHORT)
        }
        else if (input === Input.COMPOSITE2) {
            this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT_COMPOSITE_2, RemoteDirection.SHORT)
        }
        else {
            throw new Error('Invalid HDMI input');
        }
    }

    public sendKeyTv(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_TV, RemoteDirection.SHORT)
    }
    public sendKeySource(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT, RemoteDirection.SHORT)
    }
    public sendKeyMediaPlay(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_MEDIA_PLAY, RemoteDirection.SHORT)
    }
    public sendKeyMediaPause(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_MEDIA_PAUSE, RemoteDirection.SHORT)
    }
    public sendKeyMediaStop(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_MEDIA_STOP, RemoteDirection.SHORT)
    }
    public sendKeyMediaNext(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_MEDIA_NEXT, RemoteDirection.SHORT)
    }
    public sendKeyMediaPrevious(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_MEDIA_PREVIOUS, RemoteDirection.SHORT)
    }
    public sendKeyMediaRewind(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_MEDIA_REWIND, RemoteDirection.SHORT)
    }
    public sendKeyMediaFastForward(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_MEDIA_FAST_FORWARD, RemoteDirection.SHORT)
    }
    public sendKeyDpadUp(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_DPAD_UP, RemoteDirection.SHORT)
    }
    public sendKeyDpadDown(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_DPAD_DOWN, RemoteDirection.SHORT)
    }
    public sendKeyDpadLeft(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_DPAD_LEFT, RemoteDirection.SHORT)
    }
    public sendKeyDpadRight(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_DPAD_RIGHT, RemoteDirection.SHORT)
    }
    public sendKeyDpadCenter(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_DPAD_CENTER, RemoteDirection.SHORT)
    }
    public sendKeyHome(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_HOME, RemoteDirection.SHORT)
    }
    public sendKeyBack(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_BACK, RemoteDirection.SHORT)
    }
    public sendKeyMenu(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_MENU, RemoteDirection.SHORT)
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
