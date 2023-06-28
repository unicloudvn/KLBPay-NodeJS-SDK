# KPAY SDK

## Install

Create file .npmrc in root folder with content below:

```
@unicloudvn:registry=https://npm.pkg.github.com/unicloudvn
//npm.pkg.github.com/:_authToken=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
```

After

```
# install package locally (recommend)
npm install @unicloudvn/kpay-nodejs-sdk
OR
npm install @unicloudvn/kpay-nodejs-sdk --save-dev
```

## Usage

<h3 id="get-key"> Get keys from <a href = "https://pay-staging.kienlongbank.co/">Klb Pay Portal</a> </h3>

```
Host = https://api-staging.kienlongbank.co/pay
EncryptKey = "4EDDEB54E83AFB428AA1184816AC9F9242DEBE24C1ACAF935427E16A06B4181A";
ClientId = "ffbc53eb-0191-4ba2-a68a-5eeeccf51428";
ClientId = "y4ULpoFcK7Cb1l4OBh364qZ5wSkMjtJCW4FtFZfbil9rzjs4bn9eWbdJuGLWaGp9eEHB/HU7k9PSwc7J4wjbGZnDIfb/1e6htG9NtduklhH5R8FQLRwxWnRmXlnqcUgPg/K+AxaXdplfXox2vMxwLoLNwr+Qo7wGDATBl/C+cdXgdnYeNQmAxCrUBKKKxjWXFqP2wcxM7JYhF7k85o4EKIRJwJnQmGjM6ZKaz4294M6wDWvK0NruHUqN+wYRAXnH5SrcK+k88DJBIx+o9BipAWulINA3+mOVAHLJ7VAJXD4Hg1YB73uhozGZxrMzpS+T+iW035JbOvNd6GS4MfFNJA==";
```

### Import kpay-sdk

```
import {Payment} from 'kpay-nodejs-sdk';
```

### Example create new Object Payment

### [Keys were gotten above: CLIENT_ID, ENCRYPT_KEY, SECRET_KEY](#get-key)

```
import {Payment} from 'kpay-nodejs-sdk';

// create via constructor
const payment = new Payment(clientId, encryptKey, secretKey, host);

OR

// create via environment variables - file .env contains variable below
KLB_HOST = "https://api-staging.kienlongbank.co/pay"
ENCRYPT_KEY = "4EDDEB54E83AFB428AA1184816AC9F9242DEBE24C1ACAF935427E16A06B4181A"
CLIENT_ID = "ffbc53eb-0191-4ba2-a68a-5eeeccf51428"
SECRET_KEY = "y4ULpoFcK7Cb1l4OBh364qZ5wSkMjtJCW4FtFZfbil9rzjs4bn9eWbdJuGLWaGp9eEHB/HU7k9PSwc7J4wjbGZnDIfb/1e6htG9NtduklhH5R8FQLRwxWnRmXlnqcUgPg/K+AxaXdplfXox2vMxwLoLNwr+Qo7wGDATBl/C+cdXgdnYeNQmAxCrUBKKKxjWXFqP2wcxM7JYhF7k85o4EKIRJwJnQmGjM6ZKaz4294M6wDWvK0NruHUqN+wYRAXnH5SrcK+k88DJBIx+o9BipAWulINA3+mOVAHLJ7VAJXD4Hg1YB73uhozGZxrMzpS+T+iW035JbOvNd6GS4MfFNJA=="
```

### Create new payment:

```
# Declare data
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
}


const create = payment.create(data).then(res => {
    // handle success response
})
.catch(err => {
    // handle error response
})
```

### Response create payment

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

### Check status payment

```
# Declare data
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

### Response check status payment

```
{
    status: 'CREATED',
    refTransactionId: '123456',
    amount: 123
}
```

### Cancel payment

```
# Declare data
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

### Response cancel payment

```
{ success: true }
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
