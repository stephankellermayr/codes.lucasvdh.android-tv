import tls from 'tls';
import RemoteMessageManager from './RemoteMessageManager';
import EventEmitter from 'events';

class RemoteManager extends EventEmitter {
    private host: string;
    private port: number;
    private certs: { key: string | undefined; cert: string | undefined };
    private client: tls.TLSSocket | undefined;
    private chunks: Buffer;
    private error: NodeJS.ErrnoException | null;
    private timeout: number;
    private remoteMessageManager: RemoteMessageManager;

    constructor(host: string, port: number, certs: {
        key: string | undefined;
        cert: string | undefined
    }, timeout: number = 1000, manufacturer: string = 'unknown', model: string = 'unknown') {
        super();
        this.host = host;
        this.port = port;
        this.certs = certs;
        this.chunks = Buffer.from([]);
        this.error = null;
        this.timeout = timeout;
        this.remoteMessageManager = new RemoteMessageManager(manufacturer, model);
    }

    async start(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const options: tls.ConnectionOptions = {
                key: this.certs.key,
                cert: this.certs.cert,
                port: this.port,
                host: this.host,
                rejectUnauthorized: false,
            };

            this.emit('log.debug', 'Start Remote Connect');

            this.client = tls.connect(options, () => {
                //this.emit('log.debug', "Remote connected")
            });

            this.client.on('timeout', () => {
                this.emit('log.debug', 'timeout');
                this.client?.destroy();
            });

            // Ping is received every 5 seconds
            this.client.setTimeout(1000 * 10);

            this.client.on('secureConnect', () => {
                this.emit('log.debug', this.host + ' Remote secureConnect');
                resolve();
            });

            this.client.on('data', (data) => {
                try {
                    const buffer = Buffer.from(data);
                    this.chunks = Buffer.concat([this.chunks, buffer]);

                    if (this.chunks.length > 0 && this.chunks.readInt8(0) === this.chunks.length - 1) {
                        const message = this.remoteMessageManager.parse(this.chunks);

                        if (!message.remotePingRequest) {
                            //this.emit('log.debug', this.host + " Receive : " + Array.from(this.chunks));
                            this.emit('log.debug', this.host + ' Receive : ' + JSON.stringify(message));
                        }

                        if (message.remoteConfigure) {
                            this.client?.write(
                                this.remoteMessageManager.createRemoteConfigure(
                                    622,
                                    'Build.MODEL',
                                    'Build.MANUFACTURER',
                                    1,
                                    'Build.VERSION.RELEASE'
                                )
                            );
                            this.emit('ready');
                        } else if (message.remoteSetActive) {
                            this.client?.write(this.remoteMessageManager.createRemoteSetActive(622));
                        } else if (message.remotePingRequest) {
                            this.client?.write(this.remoteMessageManager.createRemotePingResponse(message.remotePingRequest.val1));
                        } else if (message.remoteImeKeyInject) {
                            this.emit('current_app', message.remoteImeKeyInject.appInfo.appPackage);
                        } else if (message.remoteImeBatchEdit) {
                            this.emit('log.debug', 'Receive IME BATCH EDIT' + message.remoteImeBatchEdit);
                        } else if (message.remoteImeShowRequest) {
                            this.emit('log.debug', 'Receive IME SHOW REQUEST' + message.remoteImeShowRequest);
                        } else if (message.remoteVoiceBegin) {
                            //this.emit('log.debug', "Receive VOICE BEGIN" + message.remoteVoiceBegin);
                        } else if (message.remoteVoicePayload) {
                            //this.emit('log.debug', "Receive VOICE PAYLOAD" + message.remoteVoicePayload);
                        } else if (message.remoteVoiceEnd) {
                            //this.emit('log.debug', "Receive VOICE END" + message.remoteVoiceEnd);
                        } else if (message.remoteStart) {
                            this.emit('powered', message.remoteStart.started);
                        } else if (message.remoteSetVolumeLevel) {
                            this.emit('volume', {
                                level: message.remoteSetVolumeLevel.volumeLevel,
                                maximum: message.remoteSetVolumeLevel.volumeMax,
                                muted: message.remoteSetVolumeLevel.volumeMuted,
                            });
                            //this.emit('log.debug', "Receive SET VOLUME LEVEL" + message.remoteSetVolumeLevel.toJSON().toString());
                        } else if (message.remoteSetPreferredAudioDevice) {
                            //this.emit('log.debug', "Receive SET PREFERRED AUDIO DEVICE" + message.remoteSetPreferredAudioDevice);
                        } else if (message.remoteError) {
                            if (message.remoteError?.message?.remoteConfigure) {
                                this.emit('unpaired', message.remoteError);
                            } else {
                                this.emit('log.debug', "Receive REMOTE ERROR");
                                this.emit('error', message.remoteError);
                            }
                        } else if (message.remoteKeyInject) {
                            this.emit('key', message.remoteKeyInject);
                        } else {
                            this.emit('log.log', 'What else ?');
                        }
                        this.chunks = Buffer.from([]);
                    }
                } catch (error) {
                    this.emit('log.error', 'RemoteManager on data error', error);
                }
            });

            this.client.on('close', async (hasError) => {
                this.emit('close', {hasError: hasError, error: this.error});
                this.emit('log.info', this.host + ' Remote Connection closed ' + (hasError ? 'with error' : ''));

                if (hasError) {
                    this.error = this.error ?? new Error('Unknown Error');
                    reject(this.error.code);
                    if (this.error.code === 'ECONNRESET') {
                        this.emit('unpaired');
                    } else if (this.error.code === 'ECONNREFUSED') {
                        // The device is not ready yet: we restart
                        await new Promise<void>((resolve) => setTimeout(resolve, this.timeout));
                        await this.start().catch((error) => {
                            this.emit('log.error', error);
                        });
                    } else if (this.error.code === 'EHOSTDOWN') {
                        // The device is down, we do nothing
                    } else {
                        // In doubt, we restart
                        await new Promise<void>((resolve) => setTimeout(resolve, this.timeout));
                        await this.start().catch((error) => {
                            this.emit('log.error', error);
                        });
                    }
                } else {
                    // If no error, we restart. If it has turned off, an error will prevent further restarts.
                    await new Promise<void>((resolve) => setTimeout(resolve, this.timeout));
                    await this.start().catch((error) => {
                        this.emit('log.error', error);
                    });
                }
            });

            this.client.on('error', (error) => {
                this.emit('log.error', this.host, error);
                this.error = error;
            });
        });
    }

    sendPower(): void {
        this.client?.write(
            this.remoteMessageManager.createRemoteKeyInject(
                this.remoteMessageManager.RemoteDirection.SHORT,
                this.remoteMessageManager.RemoteKeyCode.KEYCODE_POWER
            )
        );
    }

    sendKey(key: number, direction: number): void {
        this.client?.write(this.remoteMessageManager.createRemoteKeyInject(direction, key));
    }

    sendAppLink(app_link: string): void {
        this.client?.write(this.remoteMessageManager.createRemoteRemoteAppLinkLaunchRequest(app_link));
    }

    stop(): void {
        this.client?.destroy();
    }
}

export {RemoteManager};
