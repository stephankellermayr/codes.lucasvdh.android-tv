import {Remote} from "../../remote";
import {DeviceData, DeviceSettings, SettingsInput} from "./types";
import AndroidTVRemoteClient, {Input, Volume} from "./client";

/**
 * @property {RemoteDriver} driver
 */
class RemoteDevice extends Remote {
    private client?: AndroidTVRemoteClient;
    private keyCapabilities: Array<string> = [
        'key_stop',
        'key_play',
        'key_pause',
        // 'key_play_pause',
        // 'key_online',
        // 'key_record',
        'key_rewind',
        'key_fast_forward',
        // 'key_toggle_ambilight',
        'key_source',
        // 'key_toggle_subtitles',
        // 'key_teletext',
        // 'key_viewmode',
        'key_watch_tv',
        'key_confirm',
        'key_previous',
        'key_next',
        // 'key_adjust',
        'key_cursor_left',
        'key_cursor_up',
        'key_cursor_right',
        'key_cursor_down',
        // 'key_info',
        // 'key_digit_1',
        // 'key_digit_2',
        // 'key_digit_3',
        // 'key_digit_4',
        // 'key_digit_5',
        // 'key_digit_6',
        // 'key_digit_7',
        // 'key_digit_8',
        // 'key_digit_9',
        // 'key_digit_0',
        // 'key_dot',
        'key_options',
        'key_back',
        'key_home',
        // 'key_find',
        // 'key_red',
        // 'key_green',
        // 'key_yellow',
        // 'key_blue'
    ]
    private CAPABILITIES_SET_DEBOUNCE: number = 100;

    async initializeClient() {
        const data: DeviceData = this.getData();
        const settings: DeviceSettings = this.getSettings();

        this.client = new AndroidTVRemoteClient(
            settings.ip,
            data.cert
        );
        await this.client.start();

        this.client.on('ready', () => {
            this.log("Client has been initialized")
            this.setAvailable();
        })

        await this.registerClientListeners()
        this.log('Client listeners have been registered')
        await this.registerCapabilityListeners()
        this.log('Capability listeners have been registered')

        this.fixCapabilities();
    }

    private async registerClientListeners() {
        if (!this.client) {
            throw new Error('Client not initialized');
        }

        this.client.on('powered', async (powered) => {
            await this.setCapabilityValue('onoff', powered);
        });

        this.client.on('volume', async (volume: Volume) => {
            this.log('volume', volume);
            this.log("Volume : " + volume.level + '/' + volume.maximum + " | Muted : " + volume.muted);

            // await this.setCapabilityValue('volume_mute', volume.muted);
            // await this.setCapabilityValue('volume', volume.level);
            await this.setCapabilityValue('volume_mute', volume.muted);
            await this.setCapabilityValue('measure_volume', Math.round(volume.level / (volume.maximum / 100)));
        });

        this.client.on('current_app', (current_app) => {
            // @ts-ignore
            return this.driver.triggerApplicationOpenedTrigger(this, {
                app: current_app
            }).catch(this.error)
        });

        this.client.on('unpaired', async () => {
            await this.setUnavailable(this.homey.__('error.unpaired'));
        });

        this.client.on('secret', async () => {
            await this.setUnavailable(this.homey.__('error.unpaired'));
        });

        this.client.on('error', async (error) => {
            this.log('client.on(error)', error);
            // TODO: is this necessary?
            await this.reloadClient(60);
        });
    }

    private async registerCapabilityListeners() {
        this.registerMultipleCapabilityListener(this.keyCapabilities, async (capabilityValues: { [x: string]: any; }, capabilityOptions: { [x: string]: any; }) => {
            return this.onCapabilitiesKeySet(capabilityValues, capabilityOptions)
        }, this.CAPABILITIES_SET_DEBOUNCE)

        this.registerCapabilityListener('onoff', value => {
            return this.onCapabilityOnOffSet(value)
        })

        this.registerCapabilityListener('volume_up', value => {
            return this.client?.volumeUp();
        })

        this.registerCapabilityListener('volume_down', value => {
            return this.client?.volumeDown();
        })

        this.registerCapabilityListener('volume_mute', value => {
            return this.client?.mute();
        })

        // this.registerCapabilityListener('key', value => {
        //     return this._onCapabilityAmbilightModeSet(value)
        // })
    }

    private async onCapabilitiesKeySet(capability: { [x: string]: any; }, options: { [x: string]: any; }): Promise<void> {
        if (typeof capability.key_stop !== 'undefined') {
            return this.client?.sendKeyMediaStop();
        } else if (typeof capability.key_play !== 'undefined') {
            return this.client?.sendKeyMediaPlay();
        } else if (typeof capability.key_back !== 'undefined') {
            return this.client?.sendKeyBack();
        } else if (typeof capability.key_pause !== 'undefined') {
            return this.client?.sendKeyMediaPause();
        }
            // else if (typeof capability.key_online !== 'undefined') {
            //     return this.sendKey('Online')
            // } else if (typeof capability.key_record !== 'undefined') {
            //     return this.sendKey('Record')
        // }
        else if (typeof capability.key_rewind !== 'undefined') {
            return this.client?.sendKeyMediaRewind();
        } else if (typeof capability.key_fast_forward !== 'undefined') {
            return this.client?.sendKeyMediaFastForward();
        }
            // else if (typeof capability.key_toggle_ambilight !== 'undefined') {
            //     return this.sendKey('AmbilightOnOff')
            // } else if (typeof capability.key_source !== 'undefined') {
            //     return this.sendKey('Source')
            // } else if (typeof capability.key_toggle_subtitles !== 'undefined') {
            //     return this.sendKey('SubtitlesOnOff')
            // } else if (typeof capability.key_teletext !== 'undefined') {
            //     return this.sendKey('Teletext')
            // } else if (typeof capability.key_viewmode !== 'undefined') {
            //     return this.sendKey('Viewmode')
        // }
        else if (typeof capability.key_watch_tv !== 'undefined') {
            return this.client?.sendKeyTv();
        } else if (typeof capability.key_confirm !== 'undefined') {
            return this.client?.sendKeyDpadCenter();
        } else if (typeof capability.key_previous !== 'undefined') {
            return this.client?.sendKeyMediaPrevious();
        } else if (typeof capability.key_next !== 'undefined') {
            return this.client?.sendKeyMediaNext();
        }
            // else if (typeof capability.key_adjust !== 'undefined') {
            //     return this.sendKey('Adjust')
        // }
        else if (typeof capability.key_cursor_left !== 'undefined') {
            return this.client?.sendKeyDpadLeft();
        } else if (typeof capability.key_cursor_up !== 'undefined') {
            return this.client?.sendKeyDpadUp();
        } else if (typeof capability.key_cursor_right !== 'undefined') {
            return this.client?.sendKeyDpadRight();
        } else if (typeof capability.key_cursor_down !== 'undefined') {
            return this.client?.sendKeyDpadDown();
        }
            // else if (typeof capability.key_info !== 'undefined') {
            //     return this.sendKey('Info')
            // } else if (typeof capability.key_digit_0 !== 'undefined') {
            //     return this.sendKey('Digit0')
            // } else if (typeof capability.key_digit_1 !== 'undefined') {
            //     return this.sendKey('Digit1')
            // } else if (typeof capability.key_digit_2 !== 'undefined') {
            //     return this.sendKey('Digit2')
            // } else if (typeof capability.key_digit_3 !== 'undefined') {
            //     return this.sendKey('Digit3')
            // } else if (typeof capability.key_digit_4 !== 'undefined') {
            //     return this.sendKey('Digit4')
            // } else if (typeof capability.key_digit_5 !== 'undefined') {
            //     return this.sendKey('Digit5')
            // } else if (typeof capability.key_digit_6 !== 'undefined') {
            //     return this.sendKey('Digit6')
            // } else if (typeof capability.key_digit_7 !== 'undefined') {
            //     return this.sendKey('Digit7')
            // } else if (typeof capability.key_digit_8 !== 'undefined') {
            //     return this.sendKey('Digit8')
            // } else if (typeof capability.key_digit_9 !== 'undefined') {
            //     return this.sendKey('Digit9')
            // } else if (typeof capability.key_dot !== 'undefined') {
            //     return this.sendKey('Dot')
        // }
        else if (typeof capability.key_options !== 'undefined') {
            return this.client?.sendKeyMenu();
        } else if (typeof capability.key_back !== 'undefined') {
            return this.client?.sendKeyBack();
        } else if (typeof capability.key_home !== 'undefined') {
            return this.client?.sendKeyHome();
        }
        // else if (typeof capability.key_find !== 'undefined') {
        //     return this.sendKey('Find')
        // } else if (typeof capability.key_red !== 'undefined') {
        //     return this.sendKey('RedColour')
        // } else if (typeof capability.key_yellow !== 'undefined') {
        //     return this.sendKey('YellowColour')
        // } else if (typeof capability.key_green !== 'undefined') {
        //     return this.sendKey('GreenColour')
        // } else if (typeof capability.key_blue !== 'undefined') {
        //     return this.sendKey('BlueColour')
        // }
    }

    fixCapabilities() {
        let oldCapabilities = [
            'volume'
        ];

        let newCapabilities = [
            "onoff",
            "measure_volume",
            "volume_up",
            "volume_down",
            "volume_mute",
            "key_play",
            "key_pause",
            "key_stop",
            "key_cursor_up",
            "key_cursor_right",
            "key_cursor_down",
            "key_cursor_left",
            "key_back",
            "key_home",
            "key_confirm",
            "key_previous",
            "key_next",
            "key_watch_tv"
        ]

        for (let i in oldCapabilities) {
            let oldCapability = oldCapabilities[i]

            if (this.hasCapability(oldCapability)) {
                this.log('Removing old capability: ' + oldCapability)
                this.removeCapability(oldCapability)
                    .catch(error => {
                        this.log(error);
                    })
            }
        }

        for (let i in newCapabilities) {
            let newCapability = newCapabilities[i]

            if (!this.hasCapability(newCapability)) {
                this.log('Adding new capability: ' + newCapability)
                this.addCapability(newCapability)
                    .catch(error => {
                        this.log(error);
                    })
            }
        }
    }

    private async onCapabilityOnOffSet(value: boolean): Promise<void> {
        this.log(`Powering ${value ? 'on' : 'off'} device`)

        if (value !== this.getCapabilityValue('onoff')) {
            this.client?.sendPower();
        }
    }

    async onSettings({newSettings, changedKeys}: SettingsInput) {
        if (changedKeys.includes("ip")) {
            await this.reloadClient();
        }
    }

    private async reloadClient(timeoutInSeconds: number | null = null) {
        try {
            this.client?.stop()
        } finally {
            if (timeoutInSeconds !== null) {
                await this.homey.setTimeout(this.initializeClient.bind(this), timeoutInSeconds * 1000);
            } else {
                await this.initializeClient();
            }
        }
    }

    public async sendKey(key: string): Promise<void> {
        if (key === 'key_stop') {
            this.client?.sendKeyMediaStop();
        } else if (key === 'key_play') {
            this.client?.sendKeyMediaPlay();
        } else if (key === 'key_pause') {
            this.client?.sendKeyMediaPause();
        } else if (key === 'key_rewind') {
            this.client?.sendKeyMediaRewind();
        } else if (key === 'key_fast_forward') {
            this.client?.sendKeyMediaFastForward();
        } else if (key === 'key_source') {
            this.client?.sendKeySource();
        } else if (key === 'key_watch_tv') {
            this.client?.sendKeyTv();
        } else if (key === 'key_confirm') {
            this.client?.sendKeyDpadCenter();
        } else if (key === 'key_previous') {
            this.client?.sendKeyMediaStop();
        } else if (key === 'key_next') {
            this.client?.sendKeyMediaNext();
        } else if (key === 'key_cursor_left') {
            this.client?.sendKeyDpadLeft();
        } else if (key === 'key_cursor_up') {
            this.client?.sendKeyDpadUp();
        } else if (key === 'key_cursor_right') {
            this.client?.sendKeyDpadRight();
        } else if (key === 'key_cursor_down') {
            this.client?.sendKeyDpadDown();
        } else if (key === 'key_options') {
            this.client?.sendKeyMenu();
        } else if (key === 'key_back') {
            this.client?.sendKeyBack();
        } else if (key === 'key_home') {
            this.client?.sendKeyHome();
        }
    }

    public async openApplication(app: { url: string }): Promise<void> {
        this.client?.openApplication(app.url);
    }

    public async selectSource(source: string): Promise<void> {
        if (source === 'HDMI1') {
            this.client?.setInput(Input.HDMI1);
        } else if (source === 'HDMI2') {
            this.client?.setInput(Input.HDMI2);
        } else if (source === 'HDMI3') {
            this.client?.setInput(Input.HDMI3);
        } else if (source === 'HDMI4') {
            this.client?.setInput(Input.HDMI4);
        } else if (source === 'VGA') {
            this.client?.setInput(Input.VGA);
        } else if (source === 'COMPONENT1') {
            this.client?.setInput(Input.COMPONENT1);
        } else if (source === 'COMPONENT2') {
            this.client?.setInput(Input.COMPONENT2);
        } else if (source === 'COMPOSITE1') {
            this.client?.setInput(Input.COMPOSITE1);
        } else if (source === 'COMPOSITE2') {
            this.client?.setInput(Input.COMPOSITE2);
        } else {
            throw new Error(`Unknown source: ${source}`)
        }
    }

    public async getKeys(): Promise<Array<{ key: string, name: string }>> {
        return [
            {
                key: 'key_stop',
                name: this.homey.__(`key.stop`)
            },
            {
                key: 'key_play',
                name: this.homey.__(`key.play`)
            },
            {
                key: 'key_pause',
                name: this.homey.__(`key.pause`)
            },
            {
                key: 'key_rewind',
                name: this.homey.__(`key.rewind`)
            },
            {
                key: 'key_fast_forward',
                name: this.homey.__(`key.fast_forward`)
            },
            {
                key: 'key_source',
                name: this.homey.__(`key.source`)
            },
            {
                key: 'key_watch_tv',
                name: this.homey.__(`key.watch_tv`)
            },
            {
                key: 'key_confirm',
                name: this.homey.__(`key.confirm`)
            },
            {
                key: 'key_previous',
                name: this.homey.__(`key.previous`)
            },
            {
                key: 'key_next',
                name: this.homey.__(`key.next`)
            },
            {
                key: 'key_cursor_left',
                name: this.homey.__(`key.cursor_left`)
            },
            {
                key: 'key_cursor_up',
                name: this.homey.__(`key.cursor_up`)
            },
            {
                key: 'key_cursor_right',
                name: this.homey.__(`key.cursor_right`)
            },
            {
                key: 'key_cursor_down',
                name: this.homey.__(`key.cursor_down`)
            },
            {
                key: 'key_options',
                name: this.homey.__(`key.options`)
            },
            {
                key: 'key_back',
                name: this.homey.__(`key.back`)
            },
            {
                key: 'key_home',
                name: this.homey.__(`key.home`)
            },
        ];
    }
}

module.exports = RemoteDevice;

export default RemoteDevice;