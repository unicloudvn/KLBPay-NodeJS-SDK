import { ResponseCode } from '../constant';
import CustomError from '../error/customError';

type BaseResponse<T> = {
  code?: number;
  data?: T | null;
  message?: string;
};

type CreatePaymentResponse = {
  refTransactionId: string;
  amount: number;
  description: string;
  timeout: number;
  title: string;
  language: string;
  customerInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
  successUrl: string;
  failUrl: string;
  redirectAfter: number;
  bankAccountId: string;
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
