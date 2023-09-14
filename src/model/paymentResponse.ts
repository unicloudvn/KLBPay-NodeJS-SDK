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

type CheckAccountNoResponse = {
  accountNo?: string;
  accountName?: string;
};


type LinkAccountResponse = {
  accountNo: string;
  accountName: string;
  phone: string;
  expireTime: number;
  sessionId: string;
};

type VerifyLinkAccountResponse = {
  success: boolean;
}
type DisableVirtualAccountResponse = {
  success: boolean;
}

type EnableVirtualAccountResponse = {
  order: boolean;
  virtualAccount: string;
  bankAccountNo: string;
  fixAmount: string;
  fixContent: string;
  qrContent: string;
  timeout: string;
}

type GetTransactionResponse = {
  id: string;
  status: string;
  amount: number;
  refTransactionId?: string;
  createDateTime: string;
  completeTime: string;
  virtualAccount: string;
  description: string;
  paymentType: string;
  txnNumber: string;
  accountName: string;
  accountNo: string;
  interBankTrace: string;
}

type PageResponse = {
  items: GetTransactionResponse[];
  pageNumber: number;
  pageSize: number;
  totalPage: number;
  totalSize: number;
}


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
  CheckAccountNoResponse,
  LinkAccountResponse,
  VerifyLinkAccountResponse,
  EnableVirtualAccountResponse,
  DisableVirtualAccountResponse,
  GetTransactionResponse,
  PageResponse,
  SuccessResponse,
  BuildResponse,
};
