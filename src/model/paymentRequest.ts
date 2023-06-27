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
};

type CheckPaymentRequest = {
  transactionId: string;
};

type CancelPaymentRequest = {
  transactionId: string;
};
export { CancelPaymentRequest, CheckPaymentRequest, CreatePaymentRequest };
