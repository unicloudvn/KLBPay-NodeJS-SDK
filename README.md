# KPAY SDK Node JS

Thư viện người dùng tích hợp KLBPay vào hệ thống thanh toán của Merchant

# Install

Tạo file .npmrc trong thư mục root với nội dung bên dưới:

```
@unicloudvn:registry=https://npm.pkg.github.com/unicloudvn
//npm.pkg.github.com/:_authToken=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
```

Sau đó tiến hành cài đặt

```
# Để cài đặt sử dụng lệnh
npm install @unicloudvn/kpay-nodejs-sdk
Hoặc
npm install @unicloudvn/kpay-nodejs-sdk --save-dev
```

# Usage

<h3 id="get-key">Lấy thông tin tích hợp từ: <a href = "https://mc.kienlongbank.com/">Klb Pay Portal</a> </h3>

```
Thông tin tích hợp bao gồm: Host, ClientId, SecretKey, EncryptKey
```

## Import sử dụng kpay-sdk

```
import {Payment} from 'kpay-nodejs-sdk';
Hoặc
import {Payment} from "@unicloudvn/kpay-nodejs-sdk";
```

## Ví dụ cơ bản

```
// tạo thông qua consctructor
const payment = new Payment(clientId, encryptKey, secretKey, host);

Hoặc

// tạo thông qua biến môi trường từ file .env
KLB_HOST = Host
ENCRYPT_KEY = EncryptKey
CLIENT_ID = ClientId
SECRET_KEY = SecretKey
```

### Tạo giao dịch với JavaScript

#### Request data

```
const data = {
    refTransactionId: "123456",
    amount: 123,
    description: "Mo ta thanh toan",
    timeout: 10000,
    title: "Thanh Toan",
    language: "Viet Nam",
    customerInfo: {
      fullName: "Nguyen Van A",
      email: "email@gmail.com",
      phone: "0123456789",
      address: "Ho Chi Minh"
    },
    successUrl: "https://success.example.com.vn",
    failUrl: "https://fail.example.com.vn",
    redirectAfter: 5,
    paymentType: "VIET_QR"
}


const create = payment.create(data).then(res => {
    // handle success response
})
.catch(err => {
    // handle error response
})
```

#### Response data

```
{
    transactionId: '6db5cf6e-e952-4ab5-8c55-aa82400fdd35',
    refTransactionId: '123456',
    payLinkCode: 'QCg8oFIf',
    timeout: 10000,
    url: 'https://pay-staging.kienlongbank.co/paylink/QCg8oFIf',
    virtualAccount: '10372212086747084',
    description: 'Mo ta thanh toan',
    amount: 123,
    qrCodeString: '00020101021238610010A000000727013100069704520117103722120867470840208QRIBFTTA530370454031235802VN62220818TT Don hang 12345663046352',
    status: 'CREATED',
    time: '2022-12-08T15:12:28.967953'
}
```

### Kiểm tra trạng thái giao dịch

#### Request data

```
const data = {
    transactionId: '6db5cf6e-e952-4ab5-8c55-aa82400fdd35'
}

const check = payment.check(data).then(res => {
    // handle success response
})
.catch(err => {
    // handle error response
})
```

#### Response data

```
{
    status: 'CREATED',
    refTransactionId: '123456',
    amount: 123
}
```

### Huỷ giao dịch

#### Request data

```
const data = {
    transactionId: '6db5cf6e-e952-4ab5-8c55-aa82400fdd35'
}

const cancel = payment.cancel(data).then(res => {
    // handle success response
})
.catch(err => {
    // handle error response
})
```

#### Response data

```
{ success: true }
```

### Tạo giao dịch với TypeScript

Cần import thêm Model từ sdk

```
import {Payment, Model} from 'kpay-nodejs-sdk';
```

#### Request data: Model.CreatePaymentRequest

```
const data: Model.CreatePaymentRequest = {
    refTransactionId: "123456",
    amount: 123,
    description: "Mo ta thanh toan",
    timeout: 10000,
    title: "Thanh Toan",
    language: "Viet Nam",
    customerInfo: {
      fullName: "Nguyen Van A",
      email: "email@gmail.com",
      phone: "0123456789",
      address: "Ho Chi Minh"
    },
    successUrl: "https://success.example.com.vn",
    failUrl: "https://fail.example.com.vn",
    redirectAfter: 5,
    paymentType: "VIET_QR"
}


const create = payment.create(data).then(res => {
    // handle success response
})
.catch(err => {
    // handle error response
})
```

#### Response data: Model.CreatePaymentResponse

```
{
    transactionId: '6db5cf6e-e952-4ab5-8c55-aa82400fdd35',
    refTransactionId: '123456',
    payLinkCode: 'QCg8oFIf',
    timeout: 10000,
    url: 'https://pay-staging.kienlongbank.co/paylink/QCg8oFIf',
    virtualAccount: '10372212086747084',
    description: 'Mo ta thanh toan',
    amount: 123,
    qrCodeString: '00020101021238610010A000000727013100069704520117103722120867470840208QRIBFTTA530370454031235802VN62220818TT Don hang 12345663046352',
    status: 'CREATED',
    time: '2022-12-08T15:12:28.967953'
}
```

### Kiểm tra trạng thái giao dịch: Model.CheckPaymentRequest

#### Request data

```
const data: Model.CheckPaymentRequest = {
    transactionId: '6db5cf6e-e952-4ab5-8c55-aa82400fdd35'
}

const check = payment.check(data).then(res => {
    // handle success response
})
.catch(err => {
    // handle error response
})
```

#### Response data: Model.CheckPaymentResponse

```
{
    status: 'CREATED',
    refTransactionId: '123456',
    amount: 123
}
```

### Huỷ giao dịch

#### Request data: Model.CancelPaymentRequest

```
const data: Model.CancelPaymentRequest = {
    transactionId: '6db5cf6e-e952-4ab5-8c55-aa82400fdd35'
}

const cancel = payment.cancel(data).then(res => {
    // handle success response
})
.catch(err => {
    // handle error response
})
```

#### Response data: Model.CancelPaymentResponse

```
{ success: true }
```

## Call Webhook

### API này KienlongBank sẽ thực hiện gọi sang đối tác khi giao dịch thành công

### Request Curl

```
curl --location --request GET '${YOUR_HOST}/notifyTransaction' \
--header 'x-api-client: 5a404192-045b-4f6b-863f-192a0b9a88b4' \
--header 'x-api-time: 1689925407435' \
--header 'x-api-validate: 9757bbdbe1dc61e74cd8269126af130de9448e379d6bd12aed4443fea46cc5a0' \
--header 'Content-Type: application/json' \
--data-raw '{
    "data" :"qGckAOEvH9IqzQwxODueOmsMtLNUpVXdu/hbg0oPcV6K8ORAN2U/bGPC0OfrlyvN8h4mlCAIW3E94hFdiXGVv4bWbb4siQ5JSKuxQFw9lR/iiixcJ//RCFiGUY1cvkVx4zbpfIGchKGqEeay5wJZwy6V8YC/tvYqBN2zM/upfPQAlapxbvSF2ytW9AufUOe+TjPwe4xjVXx9x6/Ji8aB5sUCOeTzJ+j5D2YPtM6n8f25iUNgYN6eUhRm620aXDt1CmIhJYBUwa07kQN0UsxzC4Nq6FJVlgOz9auvyJrgcz9ym6p9l8KlS/pSKaMyERKP7FB72EpHZBUgbPGtkC8nv7oiEpiMszEw9JSwukOBBCdtBnjT6Xvk4CJUd8lX+Eg5rVhqkEqSvaPuDpPEVHFB6GqilF2o4avm7OGaphGP7fWmN714rA0rZ8rNxzTPdiTk88Wu1DYeeWd1w8RkNf8GGH30hbkRpsZ22UqKGDb00VxDgdArEeslkQOdFUGP9vtsqu4p79ps2e8Q0SA0ng8w9A=="
}'
```

### Các bước implement

- Tạo class mới và extend class NotifyController
- Override method getBody - lấy json data từ request
- Overrid method handleRequest - xử lí business logic
- Mở rộng: Có thê override method notifyTransaction để xử lí toàn bộ business logic

### Ví dụ

- NodeJS

```
// NotifyController
class Notify extends NotifyController {
  public handleRequest(notifyRequest: Model.NotifyRequest): void {
    // handle business logic
  }
}

const notify = new Notify(
  "5a404192-045b-4f6b-863f-192a0b9a88b4",
  "022E0BF1076030B6E64127107CC1BA576F643E08D2617E93DEB1D13AB1443896",
  "TZ4IYbmI6d/wvqMMCGV5u4CcE5+KDFJ+lTewp/LoRGDj94p6yFQ1k+/gMY1EXt9Tm80qRfu9BH+KCBoPwoIKs5WXKtsXpCa9vzmxcEyNW1qWwRpSWrNanOzpWRKzyZazWaziWu1A1TleeYYEUhhWZeqR42w2MX68Uu30n5tNGAwY5+Ctl1axCUzoNBC9czTXpzUNr/zIByW9RWW+BKJ6LNZv5V4HxzYesFmTTbcO9fgG5zTkTZ6s/H9n6NJ8UJFItOB5Rska7uYWmEDdkOx/5UGLrddjdHreYDIxUgTI5tHEwJM/1sXeM3N3rlqsJNBFqngA78PYypv6EUtNLFa9wQ=="
);

// Importing http module
const http = require("http");

const PORT = process.env.PORT || 3001;
// Creating http Server
const httpServer = http.createServer(function (
  req: IncomingMessage,
  res: ServerResponse
) {
  const url = req.url;
  if (url?.includes("/notifyTransaction") && req.method === "POST") {
    notify.notifyTransaction(req, res);
  }
});

// Listening to http Server
httpServer.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}...`);
});

```

- NodeJS && ExpressJS

```
// Controller
class Notify extends NotifyController {
  getBody(request) {
    // get json data
    return new Promise((resolve) => {
      resolve(JSON.stringify(request.body));
    });
  }
  handleRequest(request) {
    //Handle business logic
  }
}

// Router
const express = require("express");
const router = express.Router();
const { Notify } = require("../controller/NotifyController");
const notify = new Notify(
  "5a404192-045b-4f6b-863f-192a0b9a88b4",
  "022E0BF1076030B6E64127107CC1BA576F643E08D2617E93DEB1D13AB1443896",
  "TZ4IYbmI6d/wvqMMCGV5u4CcE5+KDFJ+lTewp/LoRGDj94p6yFQ1k+/gMY1EXt9Tm80qRfu9BH+KCBoPwoIKs5WXKtsXpCa9vzmxcEyNW1qWwRpSWrNanOzpWRKzyZazWaziWu1A1TleeYYEUhhWZeqR42w2MX68Uu30n5tNGAwY5+Ctl1axCUzoNBC9czTXpzUNr/zIByW9RWW+BKJ6LNZv5V4HxzYesFmTTbcO9fgG5zTkTZ6s/H9n6NJ8UJFItOB5Rska7uYWmEDdkOx/5UGLrddjdHreYDIxUgTI5tHEwJM/1sXeM3N3rlqsJNBFqngA78PYypv6EUtNLFa9wQ=="
);
router.use((req, res, next) => {
  next();
});

router.post("/notifyTransaction", (req, res) => {
  notify.notifyTransaction(req, res);
});

```

### Tạo tài khoản ảo:  Model.EnableVirtualAccountRequest

#### Request data

```
const data: Model.EnableVirtualAccountRequest = {
    order: 8888,
    timeout:8888,
    fixAmount:500000,
    fixContent: "Mo ta",
    bankAccountNo: ""
}

const enableVirtualAccount = payment.enableVirtualAccount(data).then(res => {
    // handle success response
})
.catch(err => {
        // handle error response
})
```

#### Response data: Model.EnableVirtualAccountResponse

```
    {
      "order": 8888,
      "virtualAccount": "109399282792088884"
      "bankAccountNo": "4570834602",
      "fixAmount": 500000,
      "fixContent": "Mo ta",
      "qrContent": "00020101021238620010A0000007270132000697045201181093992827920888840208QRIBFTTA530370454065000005802VN62090805Mo ta63048959",
      "timeout": 1000000,
    }
```

### Hủy tài khoản ảo

#### Request data: Model.DisableVirtualAccountRequest

```
const data: Model.DisableVirtualAccountRequest = {
    order: 8888,
}


const disableVirtualAccount = payment.disableVirtualAccount(data).then(res => {
    // handle success response
})
.catch(err => {
        // handle error response
})
```
#### Response data: Model.DisableVirtualAccountResponse

```
    {
        "success": true
    }
```

### Lấy danh sách giao dịch

#### Request data: Model.GetTransactionRequest

```
const data: Model.GetTransactionRequest = {
    size: 10,
    page: 0,
    order: 8888,
    bankAccountNo: "",
    fromDate: "2023-07-10 00:00:00",
    toDate: "2023-07-20 23:00:00"
}


const getTransaction = payment.getTransaction(data).then(res => {
    // handle success response
})
.catch(err => {
        // handle error response
})
```

#### Response data: Model.PageResponse

```
     {
      "items": [
        {
          "id": "f22fcd1a-46fe-4f42-bc5f-8dc02915121e",
          "status": "SUCCESS",
          "amount": 100000,
          "refTransactionId": "",
          "createDateTime": "2023-07-19 17:30:20",
          "completeTime": "2023-07-19 17:30:20",
          "virtualAccount": "109399282792000020",
          "description": "[109399282792000020.4570834602] Payme",
          "paymentType": "VIET_QR",
          "txnNumber": "P00000000353",
          "accountName": "TRAN NGOC THANG",
          "accountNo": "4570834602",
          "interBankTrace": "057ZEXA2313500IW"
        },
        {
          "id": "1b15b159-e8a2-4c84-8c20-4e620377f171",
          "status": "SUCCESS",
          "amount": 1000000,
          "refTransactionId": "",
          "createDateTime": "2023-07-19 17:12:16",
          "completeTime": "2023-07-19 17:12:16",
          "virtualAccount": "109399282792000020",
          "description": "[109399282792000020.4570834602] Payme",
          "paymentType": "VIET_QR",
          "txnNumber": "P00000000351",
          "accountName": "TRAN NGOC THANG",
          "accountNo": "4570834602",
          "interBankTrace": "057ZEXA2313500IV"
        }
      ],
      "pageNumber": 0,
      "pageSize": 10,
      "totalPage": 1,
      "totalSize": 2
    }
```
### Kiểm tra tài khoản

#### Request data: Model.CheckAccountNoRequest


```
const data: Model.CheckAccountNoRequest = {
    accountNo:"77417777"
}


const checkAccountNo = payment.checkAccountNo(data).then(res => {
    // handle success response
})
.catch(err => {
        // handle error response
})
```
#### Response data: Model.CheckAccountNoResponse

```
    {
        "accountNo": "77417777",
        "accountName": "TRAN THANH LOC"
    }
```

### Liên kết tài khoản

#### Request data: Model.LinkAccountRequest

```
const data: Model.LinkAccountRequest = {
    accountNo:"77417777"
}


const linkAccountNo = payment.linkAccountNo(data).then(res => {
    // handle success response
})
.catch(err => {
        // handle error response
})
```
#### Response data: Model.LinkAccountResponse

```
    {
        "accountNo": "77417777",
        "accountName": "TRAN THANH LOC",
        "phone": "0326577774",
        "expireTime": 60,
        "sessionId": "49c02a62-f65f-4f75-9697-f64744de37ad",
    }
```
### Xác nhận liên kết tài khoản

#### Request data: Model.VerifyLinkAccountRequest

```
const data: Model.VerifyLinkAccountRequest = {
    sessionId:"49c02a62-f65f-4f75-9697-f64744de37ad",
    accountNo:"77417777",
    otp:"468158",
}


const verifyLinkAccount = payment.verifyLinkAccountNo(data).then(res => {
    // handle success response
})
    .catch(err => {
        // handle error response
    })
```
#### Response data: Model.VerifyLinkAccountResponse

```
    {
        "success": true
    }
```




## Response Code

```
  PAYMENT_SECURITY_VIOLATION = new ResponseCode(1601, 'Security violation');
  PAYMENT_CLIENT_ID_INVALID = new ResponseCode(1602, 'Invalid client id');
  PAYMENT_INVALID_TRANSACTION_ID = new ResponseCode(1603, 'Invalid transactionId');
  DUPLICATE_REFERENCE_TRANSACTION_ID = new ResponseCode(1604, 'Duplicate ref transaction id');
  PAYMENT_TYPE_INVALID = new ResponseCode(1605, 'Invalid payment type');
  PAYMENT_INVALID_DATA = new ResponseCode(1606, 'Invalid data');
  PAYMENT_ORDER_COMPLETED = new ResponseCode(1607, 'Order was completed');
  PAYMENT_TRANSACTION_TIMEOUT = new ResponseCode(1608, 'Scan QR code timeout');
  PAYMENT_TRANSACTION_CANCELED = new ResponseCode(1609, 'Canceled transaction');
  PAYMENT_TRANSACTION_EXPIRED = new ResponseCode(1610, 'Transaction expired');
  PAYMENT_TRANSACTION_FAILED = new ResponseCode(1611, 'Transaction failed');
  PAYMENT_SERVICE_UNAVAILABLE = new ResponseCode(1612, 'Service unavailable');
  PAYMENT_TRANSACTION_STATUS_INVALID = new ResponseCode(1613, 'Invalid transaction status');
  PAYMENT_ACCESS_DENIED = new ResponseCode(1614, 'Access denied');
  MIDDLEWARE_EXISTED_OTP = new ResponseCode(100014, 'Existed OTP');
  MIDDLEWARE_INVALID_OTP = new ResponseCode(100015, 'Invalid OTP');
  BENEFICIARY_NOT_EXISTED = new ResponseCode(5100000, 'Beneficiary not existed');
```
