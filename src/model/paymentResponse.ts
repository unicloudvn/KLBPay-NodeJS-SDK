type BaseResponse<T> = {
  code: number;
  data: T;
  message: string;
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

export { BaseResponse, CancelPaymentResponse, CheckPaymentResponse, CreatePaymentResponse };
