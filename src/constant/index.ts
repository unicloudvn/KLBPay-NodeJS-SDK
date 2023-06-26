class ResponseCode {
  static readonly INVALID_SIGNATURE = new ResponseCode(1, 'Invalid signature');
  static readonly INVALID_CLIENT_ID = new ResponseCode(2, 'Invalid client id');

  // Common
  static readonly SUCCESS = new ResponseCode(0, 'Success');
  static readonly FAILED = new ResponseCode(1, 'Failed');
  static readonly INVALID_PARAM = new ResponseCode(2, 'Invalid param');

  // Payment
  static readonly PAYMENT_SECURITY_VIOLATION = new ResponseCode(1601, 'Security violation');
  static readonly PAYMENT_ORDER_COMPLETED = new ResponseCode(1602, 'Order was completed');
  static readonly PAYMENT_AMOUNT_INVALID = new ResponseCode(1603, 'Invalid amount');
  static readonly PAYMENT_TRANSACTION_CANCELED = new ResponseCode(1604, 'Canceled transaction');
  static readonly PAYMENT_TRANSACTION_EXPIRED = new ResponseCode(1605, 'Transaction expired');
  static readonly PAYMENT_TRANSACTION_INVALID = new ResponseCode(1606, 'Invalid transaction');
  static readonly PAYMENT_TRANSACTION_FAILED = new ResponseCode(1607, 'Transaction failed');
  static readonly PAYMENT_SERVICE_UNAVAILABLE = new ResponseCode(1608, 'Service unavailable');
  static readonly PAYMENT_INVALID_CLIENT_ID = new ResponseCode(1609, 'Invalid client id');

  private constructor(private readonly code: number, private readonly message: string) {}

  public getCode(): number {
    return this.code;
  }

  public getMessage(): string {
    return this.message;
  }
}

const X_API_CLIENT = 'x-api-client';
const X_API_TIME = 'x-api-time';
const X_API_VALIDATE = 'x-api-validate';

export { X_API_CLIENT, X_API_TIME, X_API_VALIDATE, ResponseCode };
