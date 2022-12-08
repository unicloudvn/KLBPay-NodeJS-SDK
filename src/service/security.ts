import { createHmac, createCipheriv, createDecipheriv } from 'crypto';

export default class Security {
  public genarateSign(data: string, clientId: string, timestamp: number, secretKey: string): string {
    // data ma hoa
    const message = `${clientId}|${timestamp}|${data}`;
    const alg = 'sha256';
    const cipher = createHmac(alg, secretKey);
    const sign = cipher.update(message);
    return sign.digest('hex');
  }

  public verifySign(
    data: string,
    dataValidate: string,
    clientId: string,
    timestamp: number,
    secretKey: string,
  ): boolean {
    if (timestamp > Math.floor(Date.now())) {
      return false;
    }
    const sign = this.genarateSign(data, clientId, timestamp, secretKey);
    if (dataValidate !== sign) {
      return false;
    }
    return true;
  }

  public aseEcrypt(data: string, encryptKey: string) {
    let alg = 'aes-256-cbc';
    const key = Buffer.from(encryptKey, 'hex');
    if (key.length >= 4 && key.length <= 16) {
      alg = 'aes-128-cbc';
    }
    const cipher = createCipheriv(alg, key, key.subarray(0, 16));
    let encrypt = cipher.update(data, 'utf8', 'base64');
    encrypt += cipher.final('base64');
    return encrypt;
  }

  aseDecrypt(data: string, encryptKey: string) {
    let alg = 'aes-256-cbc';
    const key = Buffer.from(encryptKey, 'hex');
    if (key.length >= 4 && key.length <= 16) {
      alg = 'aes-128-cbc';
    }

    const cipher = createDecipheriv(alg, key, key.subarray(0, 16));
    let decrypt = cipher.update(data, 'base64', 'utf8');
    decrypt += cipher.final('utf8');
    return decrypt;
  }
}
