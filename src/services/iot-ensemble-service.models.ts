import { BaseRequest, BaseResponse } from "../src.deps.ts";

export interface EnrollDeviceRequest extends BaseRequest {
  AttestationOptions: JsonObject;
  DeviceID: string;
  EnrollmentOptions: JsonObject;
}

export interface EnrollDeviceResponse extends BaseResponse {
  Device: DeviceInfo;
}

export interface DeviceInfo extends Record<string | number | symbol, unknown> {
  DeviceID: string;
  ConnectionString: string;
}

export class Pageable<T> {
  Items: T[];
  TotalRecords: number;

  constructor() {
    this.Items = [];
    this.TotalRecords = 0;
  }
}

export enum DeviceAttestationTypes {
  SymmetricKey = 0,
  TrustedPlatformModule = 1,
  X509Certificate = 2,
}

export enum DeviceEnrollmentTypes {
  Group = 0,
  Individual = 1,
}