import { createCipheriv, createDecipheriv, createHmac } from 'crypto';
import KlbMessage from './message';
import CustomError from '../error/customError';
import { ResponseCode } from '../constant';
import KlbConfig from '../env';

export default class Security {
  private readonly host: string;
  private readonly secretKey: string;
  private readonly clientId: string;
  private readonly encryptKey: string;
  private readonly maxTimestampDiff: number;

  constructor(clientId?: string, encryptKey?: string, secretKey?: string, host?: string, maxTimestampDiff?: number) {
    this.host = host || KlbConfig.host;
    this.clientId = clientId || KlbConfig.clientId;
    this.encryptKey = encryptKey || KlbConfig.encryptKey;
    this.secretKey = secretKey || KlbConfig.secretKey;
    this.maxTimestampDiff = maxTimestampDiff || 3000;
  }

  public generateSign(data: string, clientId: string, timestamp: number, secretKey: string): string {
    const message = `${clientId}|${timestamp}|${data}`;
    const alg = 'sha256';
    const cipher = createHmac(alg, secretKey);
    const sign = cipher.update(message);
    return sign.digest('hex');
  }

  public verifySign(
    data: string,
    dataValidate: string,
    clientId: string,
    timestamp: number,
    secretKey: string,
  ): boolean {
    const sign = this.generateSign(data, clientId, timestamp, secretKey);
    return dataValidate === sign;

  }

  public encode<T>(data: T): KlbMessage {
    if (data === null || data === undefined) {
      throw new CustomError(
        ResponseCode.PAYMENT_TRANSACTION_FAILED.getCode(),
        ResponseCode.PAYMENT_TRANSACTION_FAILED.getMessage(),
      );
    }
    try {
      const timestamp: number = Math.floor(Date.now());
      const dataConvert = JSON.stringify(data);
      const payload = this.aesEncrypt(dataConvert, this.encryptKey);
      const apiValidate = this.generateSign(payload, this.clientId, timestamp, this.secretKey);
      return new KlbMessage(this.clientId, timestamp, apiValidate, payload);
    } catch (e) {
      throw new CustomError(
        ResponseCode.PAYMENT_TRANSACTION_FAILED.getCode(),
        ResponseCode.PAYMENT_TRANSACTION_FAILED.getMessage(),
      );
    }
  }

  public decode<T>(message: KlbMessage): T {
    if (message.clientId !== this.clientId) {
      throw new CustomError(
        ResponseCode.PAYMENT_CLIENT_ID_INVALID.getCode(),
        ResponseCode.PAYMENT_CLIENT_ID_INVALID.getMessage(),
      );
    }
    const checkTime: number = Math.floor(Date.now()) - message.timestamp;
    if (checkTime > this.maxTimestampDiff) {
      throw new CustomError(
        ResponseCode.PAYMENT_TRANSACTION_EXPIRED.getCode(),
        ResponseCode.PAYMENT_TRANSACTION_EXPIRED.getMessage(),
      );
    }
    try {
      const validDate = this.verifySign(
        message.encryptedData,
        message.signature,
        message.clientId,
        message.timestamp,
        this.secretKey,
      );
      if (validDate) {
        const dateDecrypt = this.aesDecrypt(message.encryptedData, this.encryptKey);
        return JSON.parse(dateDecrypt);
      }
    } catch (e) {
      throw new CustomError(
        ResponseCode.PAYMENT_SECURITY_VIOLATION.getCode(),
        ResponseCode.PAYMENT_SECURITY_VIOLATION.getMessage(),
      );
    }
    throw new CustomError(
      ResponseCode.PAYMENT_SECURITY_VIOLATION.getCode(),
      ResponseCode.PAYMENT_SECURITY_VIOLATION.getMessage(),
    );
  }

  private aesEncrypt(data: string, encryptKey: string) {
    let alg = 'aes-256-cbc';
    const key = Buffer.from(encryptKey, 'hex');
    if (key.length >= 4 && key.length <= 16) {
      alg = 'aes-128-cbc';
    }
    const cipher = createCipheriv(alg, key, key.subarray(0, 16));
    let encrypt = cipher.update(data, 'utf8', 'base64');
    encrypt += cipher.final('base64');
    return encrypt;
  }

  private aesDecrypt(data: string, encryptKey: string) {
    let alg = 'aes-256-cbc';
    const key = Buffer.from(encryptKey, 'hex');
    if (key.length >= 4 && key.length <= 16) {
      alg = 'aes-128-cbc';
    }

    const cipher = createDecipheriv(alg, key, key.subarray(0, 16));
    let decrypt = cipher.update(data, 'base64', 'utf8');
    decrypt += cipher.final('utf8');
    return decrypt;
  }
}
