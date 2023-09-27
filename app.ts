import sourceMapSupport from "source-map-support";
import Homey, {FlowCard} from "homey";
import RemoteDevice from "./drivers/remote/device";
import {RemoteDirection} from "./androidtv-remote";

sourceMapSupport.install();

class AndroidTV extends Homey.App {
    /**
     * onInit is called when the app is initialized.
     */
    async onInit(): Promise<void> {
        this.log("App has been initialized");

        await this.registerFlowCardListeners()
        this.log('Flow card listeners have been registered')
    }

    private async registerFlowCardListeners() {
        this.homey.flow.getActionCard('open_application')
            .registerRunListener(this.onFlowActionOpenApplication)
            // .registerArgumentAutocompleteListener('app', this.onFlowApplicationAutocomplete)

        // this.homey.flow.getActionCard('open_google_assistant')
        //     .registerRunListener(this.onFlowActionOpenGoogleAssistant);

        this.homey.flow.getActionCard('select_source')
            .registerRunListener(this.onFlowActionSelectSource)

        this.homey.flow.getActionCard('press_key')
            .registerRunListener(this.onFlowActionPressKey)
            .registerArgumentAutocompleteListener('option', this.onFlowKeyAutocomplete.bind(this))

        this.homey.flow.getActionCard('long_press_key')
            .registerRunListener(this.onFlowActionLongPressKey)
            .registerArgumentAutocompleteListener('option', this.onFlowKeyAutocomplete.bind(this))

        // this.homey.flow.getActionCard('send_key')
        //     .registerRunListener(this.onFlowActionSendKey)
        //     .registerArgumentAutocompleteListener('option', this.onFlowKeyAutocomplete.bind(this))
        //
        // this.homey.flow.getActionCard('set_ambihue')
        //     .registerRunListener(this.onFlowActionSetAmbiHue)
        //
        // this.homey.flow.getActionCard('set_ambilight')
        //     .registerRunListener(this.onFlowActionSetAmbilight)
        //
        // this.homey.flow.getActionCard('set_ambilight_mode')
        //     .registerRunListener(this.onFlowActionSetAmbilightMode)

        this.log('Initialized flow')
    }

    async onFlowActionOpenApplication({device, app_link, app_name}: { device: RemoteDevice, app_link: string, app_name: string }) {
        console.log('Open application link', app_link);
        try {
            return device.openApplication(app_link)
        } catch (e) {
            console.log(e);
        }
    }

    async onFlowActionPressKey({device, option}: { device: RemoteDevice, option: { key: string } }) {
        return device.pressKey(option.key)
    }

    async onFlowActionLongPressKey({device, option, seconds}: { device: RemoteDevice, option: { key: string }, seconds: number }) {
        await device.pressKey(option.key, RemoteDirection.START_LONG);
        await new Promise(((resolve, reject) => {
            setTimeout(resolve, seconds * 1000)
        }));
        await device.pressKey(option.key, RemoteDirection.END_LONG);
    }

    async onFlowKeyAutocomplete(query: string, {device}: { device: RemoteDevice }): Promise<FlowCard.ArgumentAutocompleteResults> {
        return (await device.getKeys())
            .map(key => {
                return {
                    'id': key.key,
                    'key': key.key,
                    'name': key.name
                }
            }).filter(result => {
                return result.name.toLowerCase().indexOf(query.toLowerCase()) > -1
            })
    }

    async onFlowApplicationAutocomplete(query: string, {device}: { device: RemoteDevice }): Promise<FlowCard.ArgumentAutocompleteResults> {
        return [
            {
                name: 'Test'
            }
        ];
        // return device.getApplications().then(applications => {
        //   return applications.filter(result => {
        //     return result.name.toLowerCase().indexOf(query.toLowerCase()) > -1
        //   })
        // })
    }

    async onFlowActionSelectSource({device, source}: { device: RemoteDevice, source: string }) {
        return device.selectSource(source)
    }
}

module.exports = AndroidTV;
