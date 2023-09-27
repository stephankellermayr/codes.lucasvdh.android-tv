// TypeScript interfaces corresponding to the pairingmessage.proto file

// Enums
enum RoleType {
    RoleTypeUnknown = 0,
    RoleTypeInput = 1,
    RoleTypeOutput = 2,
    Unrecognized = -1,
}

enum EncodingType {
    EncodingTypeUnknown = 0,
    EncodingTypeAlphanumeric = 1,
    EncodingTypeNumeric = 2,
    EncodingTypeHexadecimal = 3,
    EncodingTypeQrCode = 4,
    Unrecognized = -1,
}

enum Status {
    Unknown = 0,
    StatusOk = 200,
    StatusError = 400,
    StatusBadConfiguration = 401,
    StatusBadSecret = 402,
    Unrecognized = -1,
}

// Message Interfaces
interface PairingRequest {
    clientName: string;
    serviceName: string;
}

interface PairingRequestAck {
    serverName: string;
}

interface PairingEncoding {
    type: EncodingType;
    symbolLength: number;
}

interface PairingOption {
    inputEncodings: PairingEncoding[];
    outputEncodings: PairingEncoding[];
    preferredRole: RoleType;
}

interface PairingConfiguration {
    encoding: PairingEncoding;
    clientRole: RoleType;
}

interface PairingConfigurationAck {}

interface PairingSecret {
    secret: Uint8Array;
}

interface PairingSecretAck {
    secret: Uint8Array;
}

interface PairingMessage {
    protocolVersion?: number;
    status?: Status;
    requestCase?: number;
    pairingRequest?: PairingRequest;
    pairingRequestAck?: PairingRequestAck;
    pairingOption?: PairingOption;
    pairingConfiguration?: PairingConfiguration;
    pairingConfigurationAck?: PairingConfigurationAck;
    pairingSecret?: PairingSecret;
    pairingSecretAck?: PairingSecretAck;
}
