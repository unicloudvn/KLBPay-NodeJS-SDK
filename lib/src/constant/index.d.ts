export declare class ResponseCode {
    private readonly code;
    private readonly message;
    static readonly INVALID_SIGNATURE: ResponseCode;
    static readonly INVALID_CLIENT_ID: ResponseCode;
    private constructor();
    getCode(): number;
    getMessage(): string;
}
