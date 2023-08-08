import { ResponseCode } from '../constant';

export default class CustomError {
  code: number;
  message: string;
  constructor(code?: number, message?: string) {
    this.code = code || ResponseCode.FAILED.getCode();
    this.message = message || ResponseCode.FAILED.getMessage();
  }

  public getCode(): number {
    return this.code;
  }

  public getMessage(): string {
    return this.message;
  }
}
