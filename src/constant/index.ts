class ResponseCode {
  static readonly INVALID_SIGNATURE = new ResponseCode(1, 'Invalid signature');
  static readonly INVALID_CLIENT_ID = new ResponseCode(2, 'Invalid client id');

  // Common
  static readonly SUCCESS = new ResponseCode(0, 'Success');
  static readonly FAILED = new ResponseCode(1, 'Failed');
  static readonly INVALID_PARAM = new ResponseCode(2, 'Invalid param');

  // Payment
  static readonly PAYMENT_SECURITY_VIOLATION = new ResponseCode(1601, 'Security violation');
  static readonly PAYMENT_CLIENT_ID_INVALID = new ResponseCode(1602, 'Invalid client id');
  static readonly PAYMENT_INVALID_TRANSACTION_ID = new ResponseCode(1603, 'Invalid transactionId');
  static readonly DUPLICATE_REFERENCE_TRANSACTION_ID = new ResponseCode(1604, 'Duplicate ref transaction id');
  static readonly PAYMENT_TYPE_INVALID = new ResponseCode(1605, 'Invalid payment type');
  static readonly PAYMENT_INVALID_DATA = new ResponseCode(1606, 'Invalid data');
  static readonly PAYMENT_ORDER_COMPLETED = new ResponseCode(1607, 'Order was completed');
  static readonly PAYMENT_TRANSACTION_TIMEOUT = new ResponseCode(1608, 'Scan QR code timeout');
  static readonly PAYMENT_TRANSACTION_CANCELED = new ResponseCode(1609, 'Canceled transaction');
  static readonly PAYMENT_TRANSACTION_EXPIRED = new ResponseCode(1610, 'Transaction expired');
  static readonly PAYMENT_TRANSACTION_FAILED = new ResponseCode(1611, 'Transaction failed');
  static readonly PAYMENT_SERVICE_UNAVAILABLE = new ResponseCode(1612, 'Service unavailable');
  static readonly PAYMENT_TRANSACTION_STATUS_INVALID = new ResponseCode(1613, 'Invalid transaction status');

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
