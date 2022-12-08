export interface BaseResponse<T> {
    code: number;
    data: T;
    message: string;
}
export interface CreatePaymentResponse {
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
}
export interface CheckPaymentResponse {
    status: string;
    refTransactionId: string;
    amount: number;
}
export interface CancelPaymentResponse {
    status: boolean;
}
