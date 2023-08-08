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

## Response Code

<table>
    <thead>
    <tr>
        <th style="width: 100px; text-align: center">Code</th>
        <th style="width: 300px; text-align: center">Message</th>
        <th style="width: 300px; text-align: center">Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td style="text-align: center">0</td>
        <td style="text-align: center">SUCCESS</td>
        <td style="text-align: center">Thành công</td>
    </tr>
    <tr>
        <td style="text-align: center">1</td>
        <td style="text-align: center">FAILED</td>
        <td style="text-align: center">Thất bại</td>
    </tr>
    <tr>
        <td style="text-align: center">2</td>
        <td style="text-align: center">INVALID_PARAM</td>
        <td style="text-align: center">Tham số không hợp lệ</td>
    </tr>
    <tr>
        <td style="text-align: center">1601</td>
        <td style="text-align: center">PAYMENT_SECURITY_VIOLATION</td>
        <td style="text-align: center">Vi phạm bảo mật</td>
    </tr>
    <tr>
        <td style="text-align: center">1602</td>
        <td style="text-align: center">PAYMENT_ORDER_COMPLETED</td>
        <td style="text-align: center">Giao dịch đã được thanh toán</td>
    </tr>
    <tr>
        <td style="text-align: center">1603</td>
        <td style="text-align: center">PAYMENT_AMOUNT_INVALID</td>
        <td style="text-align: center">Số tiền không hợp lệ</td>
    </tr>
    <tr>
        <td style="text-align: center">1604</td>
        <td style="text-align: center">PAYMENT_TRANSACTION_CANCELED</td>
        <td style="text-align: center">Giao dịch đã bị huỷ</td>
    </tr>
    <tr>
        <td style="text-align: center">1605</td>
        <td style="text-align: center">PAYMENT_TRANSACTION_EXPIRED</td>
        <td style="text-align: center">Giao dịch đã hết hạn</td>
    </tr>
    <tr>
        <td style="text-align: center">1606</td>
        <td style="text-align: center">PAYMENT_TRANSACTION_INVALID</td>
        <td style="text-align: center">Giao dịch không hợp lệ</td>
    </tr>
    <tr>
        <td style="text-align: center">1607</td>
        <td style="text-align: center">PAYMENT_TRANSACTION_FAILED</td>
        <td style="text-align: center">Giao dịch thất bại</td>
    </tr>
    <tr>
        <td style="text-align: center">1608</td>
        <td style="text-align: center">PAYMENT_SERVICE_UNAVAILABLE</td>
        <td style="text-align: center">Dịch vụ không khả dụng</td>
    </tr>
    <tr>
        <td style="text-align: center">1609</td>
        <td style="text-align: center">PAYMENT_INVALID_CLIENT_ID</td>
        <td style="text-align: center">Mã khách hàng không hợp lệ</td>
    </tr>
    </tbody>
</table>
