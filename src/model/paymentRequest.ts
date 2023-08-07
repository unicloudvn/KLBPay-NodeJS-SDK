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
export { CancelPaymentRequest, CheckPaymentRequest, CreatePaymentRequest, BodyEncryptRequest, NotifyRequest };
