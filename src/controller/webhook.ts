import { HttpStatusCode } from 'axios';
import { ServerResponse, IncomingMessage } from 'http';
import { X_API_CLIENT, X_API_TIME, X_API_VALIDATE } from '../constant';
import { NotifyRequest, NotifyResponse } from '../model';
import { Model } from '..';
import KlbConfig from '../env';
import KlbMessage from '../service/message';
import Security from '../service/security';
import { SuccessResponse } from '../model/paymentResponse';

export interface INotifyController {
  notifyTransaction: (req: IncomingMessage, res: ServerResponse) => void;
  getBody: (req: IncomingMessage) => Promise<string>;
  handleRequest: (notifyRequest: NotifyRequest) => void;
}

class NotifyController implements INotifyController {
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

  public async notifyTransaction(req: IncomingMessage, res: ServerResponse) {
    // get header
    const headers = req.headers;
    const clientId: string = headers[X_API_CLIENT] as string;
    const timestamp: number = Number(headers[X_API_TIME]);
    const validate: string = headers[X_API_VALIDATE] as string;

    const body = await this.getBody(req);

    let notifyResponse: NotifyResponse;
    try {
      // handle request
      const bodyEncrypt: Model.BodyEncryptRequest = JSON.parse(body);
      const messageRequest = new KlbMessage(clientId, timestamp, validate, bodyEncrypt.data);
      const requestRaw: NotifyRequest = this.security.decode<NotifyRequest>(messageRequest);
      await this.handleRequest(requestRaw);
      notifyResponse = { success: true };
    } catch (e) {
      notifyResponse = { success: false };
    }

    // handle response
    const messageResponse: KlbMessage = this.security.encode(notifyResponse);
    res.writeHead(HttpStatusCode.Ok, {
      'Content-Type': 'application/json',
      'x-api-client': messageResponse.clientId,
      'x-api-validate': messageResponse.signature,
      'x-api-time': messageResponse.timestamp,
    });
    res.end(JSON.stringify(SuccessResponse(messageResponse.encryptedData)));
  }

  public async handleRequest(notifyRequest: NotifyRequest) {
    // TODO: handle logic business - example: console.log(notifyRequest);
  }

  public getBody(request: IncomingMessage) {
    return new Promise<string>((resolve) => {
      let bodyParts: string = '';
      request
        .on('data', (chunk) => {
          bodyParts += chunk.toString();
        })
        .on('end', () => {
          resolve(bodyParts);
        });
    });
  }
}

export default NotifyController;
