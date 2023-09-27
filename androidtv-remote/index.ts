import {CertificateGenerator} from './certificate/CertificateGenerator';
import {PairingManager} from './pairing/PairingManager';
import {RemoteManager} from './remote/RemoteManager';
import RemoteMessageManager from './remote/RemoteMessageManager';
import EventEmitter from 'events';

export class AndroidRemote extends EventEmitter {
    private host: string;
    private cert: { key: string | undefined; cert: string | undefined };
    private pairing_port: number;
    private remote_port: number;
    private service_name: string;
    private timeout: number;
    private manufacturer: string;
    private model: string;

    private pairingManager: PairingManager | undefined;
    private remoteManager: RemoteManager | undefined;

    constructor(host: string, options: {
        pairing_port?: number;
        remote_port?: number;
        service_name?: string;
        cert?: { key: string | undefined; cert: string | undefined };
        timeout?: number,
        manufacturer?: string,
        model?: string,
    }) {
        super();
        this.host = host;
        this.cert = {
            key: options.cert?.key,
            cert: options.cert?.cert,
        };
        this.pairing_port = options.pairing_port ? options.pairing_port : 6467;
        this.remote_port = options.remote_port ? options.remote_port : 6466;
        this.service_name = options.service_name ? options.service_name : 'Service Name';
        this.timeout = options.timeout ? options.timeout : 1000;
        this.manufacturer = options.manufacturer ? options.manufacturer : 'unknown';
        this.model = options.model ? options.model : 'unknown';
    }

    async start(): Promise<void> {
        if (!this.cert.key || !this.cert.cert) {
            this.cert = CertificateGenerator.generateFull(
                this.service_name,
                'CNT',
                'ST',
                'LOC',
                'O',
                'OU'
            );

            this.pairingManager = new PairingManager(this.host, this.pairing_port, this.cert, this.service_name, this.manufacturer, this.model);
            this.pairingManager.on('secret', () => this.emit('secret'));

            this.pairingManager.on('log', (...args) => this.emit('log', args));
            this.pairingManager.on('log.debug', (...args) => this.emit('log.debug', args));
            this.pairingManager.on('log.info', (...args) => this.emit('log.info', args));
            this.pairingManager.on('log.error', (...args) => this.emit('log.error', args));

            let paired = await this.pairingManager.start()
                .catch((error) => {
                    console.error(error);
                });

            if (!paired) {
                return;
            }
        }

        this.remoteManager = new RemoteManager(this.host, this.remote_port, this.cert, this.timeout, this.manufacturer, this.model);

        this.remoteManager.on('powered', (powered) => this.emit('powered', powered));

        this.remoteManager.on('volume', (volume) => this.emit('volume', volume));

        this.remoteManager.on('current_app', (current_app) => this.emit('current_app', current_app));

        this.remoteManager.on('ready', () => this.emit('ready'));

        this.remoteManager.on('close', (data) => this.emit('close', data));

        this.remoteManager.on('unpaired', () => this.emit('unpaired'));

        this.remoteManager.on('log', (...args) => this.emit('log', args));
        this.remoteManager.on('log.debug', (...args) => this.emit('log.debug', args));
        this.remoteManager.on('log.info', (...args) => this.emit('log.info', args));
        this.remoteManager.on('log.error', (...args) => this.emit('log.error', args));

        await new Promise((resolve) => setTimeout(resolve, 1000));

        return await this.remoteManager.start().catch((error) => {
            console.error(error);
        });
    }

    sendCode(code: string): boolean | undefined {
        return this.pairingManager?.sendCode(code);
    }

    sendPower(): void {
        this.remoteManager?.sendPower();
    }

    sendAppLink(app_link: string): void {
        this.remoteManager?.sendAppLink(app_link);
    }

    sendKey(key: number, direction: number): void {
        this.remoteManager?.sendKey(key, direction);
    }

    getCertificate(): { key: string | undefined; cert: string | undefined } {
        return {
            key: this.cert.key,
            cert: this.cert.cert,
        };
    }

    stop(): void {
        this.remoteManager?.stop();
    }
}

let RemoteKeyCode = (new RemoteMessageManager).RemoteKeyCode;
let RemoteDirection = (new RemoteMessageManager).RemoteDirection;

export {RemoteKeyCode, RemoteDirection};

export default {
    AndroidRemote,
    CertificateGenerator,
    RemoteKeyCode,
    RemoteDirection,
};
