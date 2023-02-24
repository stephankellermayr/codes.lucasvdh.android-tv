import {AndroidRemoteCert, AndroidRemoteOptions} from "./types";

const AndroidRemote = require("androidtv-remote");

export default class AndroidTVRemoteClient {
    private client?: any;

    private host: string;
    private pairing_port: number;
    private remote_port: number;
    private client_name: string;
    private cert: AndroidRemoteCert;

    constructor(
        host: string,
        cert: AndroidRemoteCert = {},
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

    public on(event: string, callback: (any) => void)
    {
        this.client.on(event, callback);
    }

    public async start(): Promise<boolean> {
        return await this.client.start();
    }

    checkSettings = async (): Promise<void> => {
        if (!this.host) {
            throw new Error("Please check your settings and try again.");
        }


        try {
            const equipmentListResponse =
                AndroidTVRemoteClient.fetchApiEndpoint<EquipmentListResponse>(equipmentUrl);

            if ((await equipmentListResponse).reporters.count < 1) {
                throw new Error("No SolarEdge inverters were found in this site");
            }
        } catch (e) {
            // Check if equipment is available within site
        }
    };

    private getOptions(): AndroidRemoteOptions {
        return <AndroidRemoteOptions>{
            pairing_port: this.pairing_port,
            remote_port: this.remote_port,
            name: this.client_name,
            cert: this.cert
        };
    }

}
