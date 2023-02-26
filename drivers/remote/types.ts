// // SolarEdge API responses
// export interface Value {
//   date: string;
//   value?: number;
// }
//
// export interface Meter {
//   type: "Production" | "Consumption";
//   values: Value[];
// }
//
// export interface Details {
//   timeUnit: string;
//   unit: string;
//   meters: Meter[];
// }
//
// export interface PowerResponse {
//   powerDetails: Details;
// }
//
// export interface EnergyResponse {
//   energyDetails: Details;
// }
//
// export interface List {
//   name: string;
//   manufacturer: string;
//   model: string;
//   serialNumber: string;
//   kWpDC?: any;
// }
//
// export interface Reporters {
//   count: number;
//   list: List[];
// }
//
// export interface EquipmentListResponse {
//   reporters: Reporters;
// }
//
// export interface PhaseData {
//   acCurrent: number;
//   acVoltage: number;
//   acFrequency: number;
//   apparentPower: number;
//   activePower: number;
//   reactivePower: number;
//   cosPhi: number;
// }
//
// export interface Telemetry {
//   date: string;
//   totalActivePower: number;
//   dcVoltage: number;
//   groundFaultResistance: number;
//   powerLimit: number;
//   totalEnergy: number;
//   temperature?: number;
//   inverterMode: string;
//   operationMode: number;
//   L1Data: PhaseData;
// }
//
// export interface Data {
//   count: number;
//   telemetries: Telemetry[];
// }
//
// export interface EquipmentDataResponse {
//   data: Data;
// }
//
// export interface Location {
//   country: string;
//   city: string;
//   address: string;
//   address2: string;
//   zip: string;
//   timeZone: string;
//   countryCode: string;
// }
//
// export interface PrimaryModule {
//   manufacturerName: string;
//   modelName: string;
//   maximumPower: number;
// }
//
// export interface Uris {
//   SITE_IMAGE: string;
//   DATA_PERIOD: string;
//   DETAILS: string;
//   OVERVIEW: string;
// }
//
// export interface PublicSettings {
//   isPublic: boolean;
// }
//
// export interface Site {
//   id: number;
//   name: string;
//   accountId: number;
//   status: string;
//   peakPower: number;
//   lastUpdateTime: string;
//   currency: string;
//   installationDate: string;
//   ptoDate?: any;
//   notes: string;
//   type: string;
//   location: Location;
//   primaryModule: PrimaryModule;
//   uris: Uris;
//   publicSettings: PublicSettings;
// }
//
// export interface Sites {
//   count: number;
//   site: Site[];
// }
//
// export interface SitesResponse {
//   sites: Sites;
// }
//
// // Homey types
// export interface PairData {
//   apiKey: string;
// }

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
