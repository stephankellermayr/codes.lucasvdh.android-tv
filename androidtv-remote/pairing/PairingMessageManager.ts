import * as protobufjs from 'protobufjs';
import * as path from 'path';
const directory = __dirname;

class PairingMessageManager {
    private root: protobufjs.Root;
    private PairingMessage: protobufjs.Type;
    public Status: { [key: string]: number };
    private RoleType: { [key: string]: number };
    private EncodingType: { [key: string]: number };
    private manufacturer: string | undefined;
    private model: string | undefined;

    constructor(manufacturer: string = 'unknown', model: string = 'unknown') {
        this.root = protobufjs.loadSync(path.join(directory, 'pairingmessage.proto'));

        this.PairingMessage = this.root.lookupType('pairing.PairingMessage');
        this.Status = this.root.lookupEnum('pairing.PairingMessage.Status').values;
        this.RoleType = this.root.lookupEnum('RoleType').values;
        this.EncodingType = this.root.lookupEnum('pairing.PairingEncoding.EncodingType').values;
        this.manufacturer = manufacturer;
        this.model = model;
    }

    create(payload: any): Uint8Array {
        const errMsg = this.PairingMessage.verify(payload);
        if (errMsg) {
            throw new Error(errMsg);
        }

        const message = this.PairingMessage.create(payload);

        return this.PairingMessage.encodeDelimited(message).finish();
    }

    createPairingRequest(service_name: string): Uint8Array {
        return this.create({
            pairingRequest: {
                serviceName: service_name,
                clientName: this.model,
            },
            status: this.Status.STATUS_OK,
            protocolVersion: 2,
        });
    }

    createPairingOption(): Uint8Array {
        return this.create({
            pairingOption: {
                preferredRole: this.RoleType.ROLE_TYPE_INPUT,
                inputEncodings: [
                    {
                        type: this.EncodingType.ENCODING_TYPE_HEXADECIMAL,
                        symbolLength: 6,
                    },
                ],
            },
            status: this.Status.STATUS_OK,
            protocolVersion: 2,
        });
    }

    createPairingConfiguration(): Uint8Array {
        return this.create({
            pairingConfiguration: {
                clientRole: this.RoleType.ROLE_TYPE_INPUT,
                encoding: {
                    type: this.EncodingType.ENCODING_TYPE_HEXADECIMAL,
                    symbolLength: 6,
                },
            },
            status: this.Status.STATUS_OK,
            protocolVersion: 2,
        });
    }

    createPairingSecret(secret: Array<String | Number>): Uint8Array {
        return this.create({
            pairingSecret: {
                secret: secret,
            },
            status: this.Status.STATUS_OK,
            protocolVersion: 2,
        });
    }

    parse(buffer: Uint8Array): PairingMessage {
        return this.PairingMessage.decodeDelimited(buffer) as PairingMessage;
    }
}

export default PairingMessageManager;
