import { ResponseCode } from '../constant';
import CustomError from '../error/customError';

type BaseResponse<T> = {
  code?: number;
  data?: T | null;
  message?: string;
};

type CreatePaymentResponse = {
  transactionId: string;
  refTransactionId: string;
  payLinkCode: string;
  timeout: number;
  url: string;
  virtualAccount: string;
  description: string;
  amount: number;
  qrCodeString: string;
  status: string;
  time: string;
  accountName: string;
};

type CheckPaymentResponse = {
  status: string;
  refTransactionId: string;
  amount: number;
};

type CancelPaymentResponse = {
  status: boolean;
};
type NotifyResponse = {
  success: boolean;
};

function SuccessResponse<T>(data?: T): BaseResponse<T> {
  return {
    code: ResponseCode.SUCCESS.getCode(),
    data: data || null,
    message: ResponseCode.SUCCESS.getMessage(),
  };
}
function BuildResponse<T>(data?: T, error?: CustomError): BaseResponse<T> {
  return {
    code: error?.getCode(),
    data: data || null,
    message: error?.getMessage(),
  };
}

export {
  BaseResponse,
  CancelPaymentResponse,
  CheckPaymentResponse,
  CreatePaymentResponse,
  NotifyResponse,
  SuccessResponse,
  BuildResponse,
};
