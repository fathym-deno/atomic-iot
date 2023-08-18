import { BaseResponse, BaseResponseModel, Pageable } from "../src.deps.ts";
import {
  DeviceAttestationTypes,
  DeviceEnrollmentTypes,
  DeviceInfo,
  EnrollDeviceRequest,
  EnrollDeviceResponse,
} from "./iot-ensemble-service.models.ts";

export class IoTEnsembleService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async enrollDevice(
    request: EnrollDeviceRequest,
    entLookup: string,
    attestationType: DeviceAttestationTypes,
    enrollmentType: DeviceEnrollmentTypes,
  ): Promise<EnrollDeviceResponse> {
    const url =
      `${this.baseUrl}/iot/${entLookup}/devices/enroll/${attestationType}/${enrollmentType}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to enroll device: ${response.statusText}`);
    }

    return response.json();
  }

  public async issueDeviceSASToken(
    entLookup: string,
    deviceName: string,
    expiryInSeconds = 3600,
  ): Promise<BaseResponseModel<string>> {
    const url =
      `${this.baseUrl}/iot/${entLookup}/devices/${deviceName}?expiryInSeconds=${expiryInSeconds}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to issue device SAS token: ${response.statusText}`,
      );
    }

    return response.json();
  }

  public async listEnrolledDevices(
    entLookup: string,
    page = 1,
    pageSize = 100,
  ): Promise<BaseResponse<Pageable<DeviceInfo>>> {
    const url =
      `${this.baseUrl}/iot/${entLookup}/devices/list?page=${page}&pageSize=${pageSize}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to list enrolled devices: ${response.statusText}`,
      );
    }

    return response.json();
  }

  public async revokeDeviceEnrollment(
    deviceId: string,
    entLookup: string,
  ): Promise<BaseResponse> {
    const url = `${this.baseUrl}/iot/${entLookup}/devices/${deviceId}/revoke`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to revoke device enrollment: ${response.statusText}`,
      );
    }

    return response.json();
  }

  public async sendDeviceMessage(
    payload: Record<string | number | symbol, unknown>,
    entLookup: string,
    deviceName: string,
    connStrType = "primary",
  ): Promise<BaseResponse> {
    const url =
      `${this.baseUrl}/iot/${entLookup}/devices/from/${deviceName}/send?connStrType=${connStrType}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to send device message: ${response.statusText}`);
    }

    return response.json();
  }

  public async sendCloudMessage(
    request: Record<string | number | symbol, unknown>,
    entLookup: string,
    deviceName: string,
  ): Promise<BaseResponse> {
    const url =
      `${this.baseUrl}/iot/${entLookup}/devices/to/${deviceName}/send`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to send cloud message: ${response.statusText}`);
    }

    return response.json();
  }
}
