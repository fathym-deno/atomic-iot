import { BaseRequest, BaseResponse } from "../src.deps.ts";

export interface EnrollDeviceRequest extends BaseRequest {
  AttestationOptions: Record<string | number | symbol, unknown>;
  DeviceID: string;
  EnrollmentOptions: Record<string | number | symbol, unknown>;
}

export interface EnrollDeviceResponse extends BaseResponse {
  Device: DeviceInfo;
}

export interface DeviceInfo extends Record<string | number | symbol, unknown> {
  DeviceID: string;
  ConnectionString: string;
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
