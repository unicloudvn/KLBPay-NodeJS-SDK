export default class KlbMessage {
  private _clientId: string;
  private _timestamp: number;
  private _signature: string;
  private _encryptedData: string;

  constructor(clientId: string, timestamp: number, signature: string, encryptedData: string) {
    this._clientId = clientId;
    this._timestamp = timestamp;
    this._signature = signature;
    this._encryptedData = encryptedData;
  }

  get clientId(): string {
    return this._clientId;
  }
  get timestamp(): number {
    return this._timestamp;
  }
  get signature(): string {
    return this._signature;
  }
  get encryptedData(): string {
    return this._encryptedData;
  }
}
