import { AxiosRequestHeaders, HttpStatusCode } from 'axios';
import { Request } from 'node-fetch';
import { ServerResponse, IncomingMessage } from 'http';
import { X_API_CLIENT, X_API_TIME, X_API_VALIDATE } from '../constant';
import { BodyEncryptRequest, NotifyRequest, NotifyResponse } from '../model';
import { Model } from '..';
import KlbConfig from '../env';
import KlbMessage from '../service/message';
import Security from '../service/security';
import CustomError from '../error/customError';

class NotifyTransactionController {
  private readonly host: string;
  private readonly secretKey: string;
  private readonly clientId: string;
  private readonly encryptKey: string;
  private readonly maxTimestampDiff: number;
  private readonly security: Security;

  constructor(clientId?: string, encryptKey?: string, secretKey?: string, host?: string, maxTimestampDiff?: number) {
    this.host = host || KlbConfig.host;
    this.clientId = clientId || KlbConfig.clientId;
    this.encryptKey = encryptKey || KlbConfig.encryptKey;
    this.secretKey = secretKey || KlbConfig.secretKey;
    this.maxTimestampDiff = maxTimestampDiff || 3000;
    this.security = new Security(clientId, encryptKey, secretKey, host, maxTimestampDiff);
  }

  public notifyTransaction(req: IncomingMessage, res: ServerResponse) {
    // get header
    const headers = req.headers;
    const clientId: string = headers[X_API_CLIENT] as string;
    const timestamp: number = Number(headers[X_API_TIME]);
    const validate: string = headers[X_API_VALIDATE] as string;

    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    res.writeHead(HttpStatusCode.Ok, { 'Content-Type': 'application/json' });
    req.on('end', () => {
      try {
        const bodyEncrypt: Model.BodyEncryptRequest = JSON.parse(body);
        console.log('data: ', bodyEncrypt.data);
        this.processNotifyTransactionRequest(new KlbMessage(clientId, timestamp, validate, bodyEncrypt.data));
        const response: NotifyResponse = { success: true };

        res.end(JSON.stringify(response));
      } catch (e) {
        res.end(JSON.stringify(e));
      }
    });
  }
  private processNotifyTransactionRequest(message: KlbMessage) {
    const requestRaw: NotifyRequest = this.security.decode<NotifyRequest>(message);
    console.log(requestRaw);
  }
}
export default NotifyTransactionController;
