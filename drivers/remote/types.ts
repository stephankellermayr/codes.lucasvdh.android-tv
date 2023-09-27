export interface AndroidRemoteCertificate {
  key: string | undefined;
  cert: string | undefined;
}

export interface AndroidRemoteOptions {
  pairing_port: number;
  remote_port: number;
  service_name: string;
  cert: AndroidRemoteCertificate,
  timeout: number | undefined;
}

export interface DeviceData {
  id: string;
}

export interface DeviceStore {
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
  store: DeviceStore;
  settings: DeviceSettings;
}
