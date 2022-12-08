import axios from 'axios';
import { ResponseCode } from '../constant';
import CustomError from '../error/customError';
import { CancelPaymentRequest, CancelPaymentResponse, CheckPaymentRequest, CheckPaymentResponse, CreatePaymentRequest, CreatePaymentResponse } from '../model';
import Security from '../service/security';

const BASE_URL = 'https://api-umeecore-dev.hcm.unicloud.ai/umee-pay';
const ENDPOINT_CREATE = '/api/payment/v1/create';
const ENDPOINT_CHECK = '/api/payment/v1/check';
const ENDPOINT_CANCEL = '/api/payment/v1/cancel';

export default class Payment {
  private secretKey: string;
  private clientId: string;
  private encryptKey: string;
  private security = new Security();

  constructor( clientId: string, encrypt: string, secretKey: string) {
    this.clientId = clientId;
    this.encryptKey = encrypt;
    this.secretKey = secretKey;
  }
  private async excute<T,S> (url: string, data: T): Promise<S> {
    const timestamp: number = Math.floor(Date.now());
    const dataConvert = JSON.stringify(data);
    const payload = this.security.aseEcrypt(dataConvert, this.encryptKey);
    const apiValidate = this.security.genarateSign(payload, this.clientId, timestamp, this.secretKey);
    const response = await axios.post(
      url,
      {
        data: payload,
      },
      {
        headers: {
          'x-api-client': this.clientId,
          'x-api-validate': apiValidate,
          'x-api-time': timestamp,
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
      const result: S = JSON.parse(dateDecrypt);
      return result;
    }
    throw new CustomError(ResponseCode.INVALID_SIGNATURE.getCode(), ResponseCode.INVALID_SIGNATURE.getMessage());
  }

  create = async (data: CreatePaymentRequest) => {
    const url = BASE_URL + ENDPOINT_CREATE;
    return this.excute<CreatePaymentRequest, CreatePaymentResponse> (url, data);
  };

  check = async (data: CheckPaymentRequest) => {
    const url = BASE_URL + ENDPOINT_CHECK;
    return this.excute<CheckPaymentRequest, CheckPaymentResponse> (url, data);
  };

  cancel = async (data: CancelPaymentRequest) => {
    const url = BASE_URL + ENDPOINT_CANCEL;
    return this.excute<CancelPaymentRequest, CancelPaymentResponse> (url, data);
  };
}
