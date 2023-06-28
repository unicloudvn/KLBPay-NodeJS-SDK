import axios from 'axios';
import { ResponseCode } from '../constant';
import CustomError from '../error/customError';
import Security from '../service/security';
import { X_API_CLIENT, X_API_TIME, X_API_VALIDATE } from '../constant';
import KlbMessage from '../service/message';
import KlbConfig from '../env';
import * as Model from '../model';

const ENDPOINT_CREATE = '/api/payment/v1/create';
const ENDPOINT_CHECK = '/api/payment/v1/check';
const ENDPOINT_CANCEL = '/api/payment/v1/cancel';

export default class Payment {
  private readonly host: string;
  private readonly secretKey: string;
  private readonly clientId: string;
  private readonly encryptKey: string;
  private readonly maxTimestampDiff: number;
  private security = new Security();

  constructor(clientId?: string, encryptKey?: string, secretKey?: string, host?: string, maxTimestampDiff?: number) {
    this.host = host || KlbConfig.host;
    this.clientId = clientId || KlbConfig.clientId;
    this.encryptKey = encryptKey || KlbConfig.encryptKey;
    this.secretKey = secretKey || KlbConfig.secretKey;
    this.maxTimestampDiff = maxTimestampDiff || 3000;
  }

  private async excute<T, S>(url: string, data: T): Promise<S> {
    const message = this.encode(data);
    const response = await axios.post(
      url,
      {
        data: message.encryptedData,
      },
      {
        headers: {
          'x-api-client': this.clientId,
          'x-api-validate': message.signature,
          'x-api-time': message.timestamp,
          'Content-Type': 'application/json',
        },
      },
    );
    const client = response.headers[X_API_CLIENT] as string;
    const dataValidate = response.headers[X_API_VALIDATE] as string;
    const timeResponse = Number(response.headers[X_API_TIME]);
    const responseData: Model.BaseResponse<T> = response.data;

    if (responseData.code !== 0) {
      throw new CustomError(responseData.code, responseData.message);
    }

    const messageResponse = new KlbMessage(client, timeResponse, dataValidate, responseData.data as string);
    return this.decode<S>(messageResponse);
  }

  public async create(data: Model.CreatePaymentRequest) {
    const url = this.host + ENDPOINT_CREATE;
    return await this.excute<Model.CreatePaymentRequest, Model.CreatePaymentResponse>(url, data);
  }

  public async check(data: Model.CheckPaymentRequest) {
    const url = this.host + ENDPOINT_CHECK;
    return this.excute<Model.CheckPaymentRequest, Model.CheckPaymentResponse>(url, data);
  }

  public async cancel(data: Model.CancelPaymentRequest) {
    const url = this.host + ENDPOINT_CANCEL;
    return this.excute<Model.CancelPaymentRequest, Model.CancelPaymentResponse>(url, data);
  }

  private encode<T>(data: T): KlbMessage {
    if (data === null || data === undefined) {
      throw new CustomError(
        ResponseCode.PAYMENT_TRANSACTION_FAILED.getCode(),
        ResponseCode.PAYMENT_TRANSACTION_FAILED.getMessage(),
      );
    }
    try {
      const timestamp: number = Math.floor(Date.now());
      const dataConvert = JSON.stringify(data);
      const payload = this.security.aseEcrypt(dataConvert, this.encryptKey);
      const apiValidate = this.security.genarateSign(payload, this.clientId, timestamp, this.secretKey);
      return new KlbMessage(this.clientId, timestamp, apiValidate, payload);
    } catch (e) {
      throw new CustomError(
        ResponseCode.PAYMENT_TRANSACTION_FAILED.getCode(),
        ResponseCode.PAYMENT_TRANSACTION_FAILED.getMessage(),
      );
    }
  }

  private decode<T>(message: KlbMessage): T {
    if (message.clientId !== this.clientId) {
      throw new CustomError(
        ResponseCode.PAYMENT_INVALID_CLIENT_ID.getCode(),
        ResponseCode.PAYMENT_INVALID_CLIENT_ID.getMessage(),
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
      const validDate = this.security.verifySign(
        message.encryptedData,
        message.signature,
        message.clientId,
        message.timestamp,
        this.secretKey,
      );
      if (validDate) {
        const dateDecrypt = this.security.aseDecrypt(message.encryptedData, this.encryptKey);
        const result: T = JSON.parse(dateDecrypt);
        return result;
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
}
