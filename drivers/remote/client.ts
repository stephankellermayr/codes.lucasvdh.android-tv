import {AndroidRemoteCertificate, AndroidRemoteOptions} from "./types";

import { AndroidRemote, RemoteKeyCode, RemoteDirection } from "androidtv-remote";
import {match} from "assert";

enum HDMIInput {
    HDMI1 = 1,
    HDMI2 = 2,
    HDMI3 = 3,
    HDMI4 = 4
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

    public back(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_BACK, RemoteDirection.SHORT)
    }

    public home(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_HOME, RemoteDirection.SHORT)
    }

    public select(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_BUTTON_SELECT, RemoteDirection.SHORT)
    }

    public setHDMIInput(input: HDMIInput): void {
        if (input === HDMIInput.HDMI1) {
            this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT_HDMI_1, RemoteDirection.SHORT)
        }
        else if (input === HDMIInput.HDMI2) {
            this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT_HDMI_2, RemoteDirection.SHORT)
        }
        else if (input === HDMIInput.HDMI3) {
            this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT_HDMI_3, RemoteDirection.SHORT)
        }
        else if (input === HDMIInput.HDMI4) {
            this.client.sendKey(RemoteKeyCode.KEYCODE_TV_INPUT_HDMI_4, RemoteDirection.SHORT)
        }
        else {
            throw new Error('Invalid HDMI input');
        }
    }

    public tv(): void {
        this.client.sendKey(RemoteKeyCode.KEYCODE_TV, RemoteDirection.SHORT)
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
