type CreatePaymentRequest = {
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
  bankAccountId?: string;
  paymentType?: string;
};

type CheckPaymentRequest = {
  transactionId: string;
};

type CancelPaymentRequest = {
  transactionId: string;
};

type BodyEncryptRequest = {
  data: string;
};

type NotifyRequest = {
  transactionId?: string;
  refTransactionId?: string;
  virtualAccount?: string;
  actualAccount?: string;
  fromBin?: string;
  fromAccount?: string;
  success?: boolean;
  amount?: number;
  statusCode?: string;
  txnNumber?: string;
  transferDesc?: string;
  time?: string;
};

type CheckAccountNoRequest = {
  accountNo: string;
}

type LinkAccountRequest = {
  accountNo: string;
}
type VerifyLinkAccountRequest = {
  sessionId: string;
  accountNo: string;
  otp: string;
};

type DisableVirtualAccountRequest = {
  order: number;
};

type EnableVirtualAccountRequest = {
  order: number;
  timeout: number;
  fixAmount: number;
  fixContent?: string;
  bankAccountNo?: string;
};

type GetTransactionRequest = {
  size?: number;
  page?: number;
  order?: number;
  bankAccountNo?: string;
  fromDate?: string;
  toDate: string;
}

export {
  CancelPaymentRequest,
  CheckPaymentRequest,
  CreatePaymentRequest,
  BodyEncryptRequest,
  NotifyRequest,
  CheckAccountNoRequest,
  LinkAccountRequest,
  VerifyLinkAccountRequest,
  EnableVirtualAccountRequest,
  DisableVirtualAccountRequest,
  GetTransactionRequest,
};
