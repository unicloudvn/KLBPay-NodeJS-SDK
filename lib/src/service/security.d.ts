export default class Security {
    genarateSign(data: string, clientId: string, timestamp: number, secretKey: string): string;
    verifySign(data: string, dataValidate: string, clientId: string, timestamp: number, secretKey: string): boolean;
    aseEcrypt(data: string, encryptKey: string): string;
    aseDecrypt(data: string, encryptKey: string): string;
}
