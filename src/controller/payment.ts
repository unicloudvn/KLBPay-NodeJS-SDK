import { CheckPaymentRequest, CreatePaymentRequest, CreatePaymentResponse } from '../model';
import Security from '../service/security';
import axios from 'axios';
import CustomError from '../error/customError';

export default class Payment {
  secretKey: string;
  clientId: string;
  encryptKey: string;
  security = new Security();
  timestamp: number = Math.floor(Date.now());
  BASE_URL = process.env.API_URL || 'https://api-umeecore-dev.hcm.unicloud.ai/umee-pay';
  ENDPOINT_CREATE = process.env.ENDPOINT_CREATE || '/api/payment/v1/create';
  ENDPOINT_CHECK = process.env.ENDPOINT_CHECK || '/api/payment/v1/check';
  ENDPOINT_CANCEL = process.env.ENDPOINT_CANCEL || '/api/payment/v1/cancel';

  constructor(secretKey: string, clientId: string, encrypt: string) {
    this.clientId = clientId;
    this.encryptKey = encrypt;
    this.secretKey = secretKey;
  }

  create = async (data: CreatePaymentRequest) => {
    const dataConvert = JSON.stringify(data);
    const payload = this.security.aseEcrypt(dataConvert, this.encryptKey);
    const apiValidate = this.security.genarateSign(payload, this.clientId, this.timestamp, this.secretKey);
    const url = this.BASE_URL + this.ENDPOINT_CREATE;
    const response = await axios.post(
      url,
      {
        data: payload,
      },
      {
        headers: {
          'x-api-client': this.clientId,
          'x-api-validate': apiValidate,
          'x-api-time': this.timestamp,
          'Content-Type': 'application/json',
        },
      },
    );
    const client = response.headers['x-api-client'] as string;
    const dataValidate = response.headers['x-api-validate'] as string;
    const timeResponse = Number(response.headers['x-api-time']);
    const responseData = response.data;
    if (responseData.code !== 0) {
      throw new CustomError(responseData.code, responseData.message);
    }
    if (this.security.verifySign(responseData.data, dataValidate, client, timeResponse, this.secretKey)) {
      const dateDecrypt = this.security.aseDecrypt(responseData.data, this.encryptKey);
      return dateDecrypt;
    }
    return null;
  };

  check = async (data: CheckPaymentRequest) => {
    const dataConvert = JSON.stringify(data);
    const payload = this.security.aseEcrypt(dataConvert, this.encryptKey);
    const apiValidate = this.security.genarateSign(payload, this.clientId, this.timestamp, this.secretKey);
    const url = this.BASE_URL + this.ENDPOINT_CHECK;
    const response = await axios.post(
      url,
      {
        data: payload,
      },
      {
        headers: {
          'x-api-client': this.clientId,
          'x-api-validate': apiValidate,
          'x-api-time': this.timestamp,
          'Content-Type': 'application/json',
        },
      },
    );
    const client = response.headers['x-api-client'] as string;
    const dataValidate = response.headers['x-api-validate'] as string;
    const timeResponse = Number(response.headers['x-api-time']);
    const responseData = response.data;
    if (responseData.code !== 0) {
      throw new CustomError(responseData.code, responseData.message);
    }
    if (this.security.verifySign(responseData.data, dataValidate, client, timeResponse, this.secretKey)) {
      const dateDecrypt = this.security.aseDecrypt(responseData.data, this.encryptKey);
      return dateDecrypt;
    }
    return null;
  };

  cancel = async (data: CanPlayTypeResult) => {
    const dataConvert = JSON.stringify(data);
    const payload = this.security.aseEcrypt(dataConvert, this.encryptKey);
    const apiValidate = this.security.genarateSign(payload, this.clientId, this.timestamp, this.secretKey);
    const url = this.BASE_URL + this.ENDPOINT_CHECK;
    const response = await axios.post(
      url,
      {
        data: payload,
      },
      {
        headers: {
          'x-api-client': this.clientId,
          'x-api-validate': apiValidate,
          'x-api-time': this.timestamp,
          'Content-Type': 'application/json',
        },
      },
    );
    const client = response.headers['x-api-client'] as string;
    const dataValidate = response.headers['x-api-validate'] as string;
    const timeResponse = Number(response.headers['x-api-time']);
    const responseData = response.data;
    if (responseData.code !== 0) {
      throw new CustomError(responseData.code, responseData.message);
    }
    if (this.security.verifySign(responseData.data, dataValidate, client, timeResponse, this.secretKey)) {
      const dateDecrypt = this.security.aseDecrypt(responseData.data, this.encryptKey);
      return dateDecrypt;
    }
    return null;
  };
}
