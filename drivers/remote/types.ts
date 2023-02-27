export interface AndroidRemoteCertificate {
  key?: string;
  cert?: string;
}

export interface AndroidRemoteOptions {
  pairing_port: number;
  remote_port: number;
  name: string;
  cert: AndroidRemoteCertificate,
}

export interface DeviceData {
  id: string;
  cert: AndroidRemoteCertificate,
}

export interface SettingsInput {
  newSettings: NewSettings
  changedKeys: Array<string>
}

export interface NewSettings {
  ip?: string | null;
}

export interface DeviceSettings {
  ip: string;
}

export interface Device {
  name: string;
  data: DeviceData;
  settings: DeviceSettings;
}
