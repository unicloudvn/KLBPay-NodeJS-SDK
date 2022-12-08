export class ResponseCode {
    static readonly INVALID_SIGNATURE = new ResponseCode(1, "Invalid signature");
    static readonly INVALID_CLIENT_ID = new ResponseCode(2, "Invalid client id");

    private constructor(private readonly code: number, private readonly message: string) {
        
    }

    public getCode(): number {
        return this.code;
    }

    public getMessage(): string {
        return this.message;
    }
}