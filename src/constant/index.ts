export class ResponseCode {
    static readonly INVALID_SIGNATURE = new ResponseCode(1, "Invalid signature");

    private constructor(private readonly code: number, private readonly message: string) {
        
    }

    public getCode(): number {
        return this.code;
    }

    public getMessage(): string {
        return this.message;
    }
}