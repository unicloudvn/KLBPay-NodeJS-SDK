import { CancelPaymentRequest, CancelPaymentResponse, CheckPaymentRequest, CheckPaymentResponse, CreatePaymentRequest, CreatePaymentResponse } from '../model';
export default class Payment {
    private secretKey;
    private clientId;
    private encryptKey;
    private security;
    constructor(clientId: string, encryptKey: string, secretKey: string);
    private excute;
    create: (data: CreatePaymentRequest) => Promise<CreatePaymentResponse>;
    check: (data: CheckPaymentRequest) => Promise<CheckPaymentResponse>;
    cancel: (data: CancelPaymentRequest) => Promise<CancelPaymentResponse>;
}
