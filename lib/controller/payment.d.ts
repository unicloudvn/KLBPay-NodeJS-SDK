import { CheckPaymentRequest, CreatePaymentRequest } from '../model';
import Security from '../service/security';
export default class Payment {
    secretKey: string;
    clientId: string;
    encryptKey: string;
    security: Security;
    timestamp: number;
    BASE_URL: string;
    ENDPOINT_CREATE: string;
    ENDPOINT_CHECK: string;
    ENDPOINT_CANCEL: string;
    constructor(secretKey: string, clientId: string, encrypt: string);
    create: (data: CreatePaymentRequest) => Promise<string | null>;
    check: (data: CheckPaymentRequest) => Promise<string | null>;
    cancel: (data: CanPlayTypeResult) => Promise<string | null>;
}
