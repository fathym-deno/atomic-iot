import { EnrollDeviceRequest, EnrollDeviceResponse, DeviceInfo, BaseResponse, Pageable } from './iot-ensemble-service.models.ts';

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
    envLookup: string | null = null
  ): Promise<EnrollDeviceResponse> {
    const url = `${this.baseUrl}/iot/${entLookup}/devices/enroll/${attestationType}/${enrollmentType}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    expiryInSeconds: number = 3600,
    envLookup: string | null = null
  ): Promise<BaseResponse<string>> {
    const url = `${this.baseUrl}/iot/${entLookup}/devices/${deviceName}?expiryInSeconds=${expiryInSeconds}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to issue device SAS token: ${response.statusText}`);
    }

    return response.json();
  }

  public async listEnrolledDevices(
    entLookup: string,
    page: number = 1,
    pageSize: number = 100,
    envLookup: string | null = null
  ): Promise<BaseResponse<Pageable<DeviceInfo>>> {
    const url = `${this.baseUrl}/iot/${entLookup}/devices/list?page=${page}&pageSize=${pageSize}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to list enrolled devices: ${response.statusText}`);
    }

    return response.json();
  }

  public async revokeDeviceEnrollment(
    deviceId: string,
    entLookup: string,
    envLookup: string | null = null
  ): Promise<BaseResponse> {
    const url = `${this.baseUrl}/iot/${entLookup}/devices/${deviceId}/revoke`;

    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to revoke device enrollment: ${response.statusText}`);
    }

    return response.json();
  }

  public async sendDeviceMessage(
    payload: MetadataModel,
    entLookup: string,
    deviceName: string,
    connStrType: string = 'primary',
    envLookup: string | null = null
  ): Promise<BaseResponse> {
    const url = `${this.baseUrl}/iot/${entLookup}/devices/from/${deviceName}/send?connStrType=${connStrType}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to send device message: ${response.statusText}`);
    }

    return response.json();
  }

  public async sendCloudMessage(
    request: MetadataModel,
    entLookup: string,
    deviceName: string,
    envLookup: string | null = null
  ): Promise<BaseResponse> {
    const url = `${this.baseUrl}/iot/${entLookup}/devices/to/${deviceName}/send`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to send cloud message: ${response.statusText}`);
    }

    return response.json();
  }
}