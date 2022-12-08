export interface CreatePaymentRequest {
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
}
export interface CheckPaymentRequest {
    transactionId: string;
}
export interface CancelPaymentRequest {
    transactionId: string;
}
