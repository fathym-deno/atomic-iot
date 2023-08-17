export interface EnrollDeviceRequest {
  Device: DeviceInfo;
}

export interface EnrollDeviceResponse extends BaseResponse {
  Device: DeviceInfo;
}

export interface DeviceInfo {
  ActivelySendingData?: boolean;
  AuthenticationType?: string;
  CloudToDeviceMessageCount?: number;
  ConnectionString?: string;
  DeviceID?: string;
  DeviceName?: string;
  LastStatusUpdate?: Status;
}

export interface BaseResponse<T = any> {
  Data?: T;
  Error?: ErrorContext;
  Status?: Status;
}

export interface Pageable<T> {
  Items: T[];
  Page: number;
  PageSize: number;
  TotalItems: number;
  TotalPages: number;
}

export interface ErrorContext {
  ActionPath?: string;
  ActionTarget?: string;
  ActionText?: string;
  Message?: string;
  Title?: string;
}

export enum DeviceAttestationTypes {
  SymmetricKey = 'symmetrickey',
  X509 = 'x509',
}

export enum DeviceEnrollmentTypes {
  Individual = 'individual',
  Group = 'group',
}

export interface MetadataModel {
  DeviceData?: { [prop: string]: any };
  DeviceID?: string;
  DeviceType?: string;
  ID?: string;
  SensorMetadata?: { [prop: string]: any };
  SensorReadings?: { [prop: string]: any };
  Timestamp?: Date;
  TotalPayloads?: number;
  Version?: string;
}

export interface Status {
  Code?: number;
  Message?: string;
}