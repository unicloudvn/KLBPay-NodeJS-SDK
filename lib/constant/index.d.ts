export declare class ResponseCode {
    private readonly code;
    private readonly message;
    static readonly INVALID_SIGNATURE: ResponseCode;
    private constructor();
    getCode(): number;
    getMessage(): string;
}
