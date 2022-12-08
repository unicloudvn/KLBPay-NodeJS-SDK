# KPAY SDK

## Install

```
# install package locally (recommend)
npm install kpay-sdk --save
```

## Usage

<h3 id="get-key"> Get keys from <a href = "https://pay-staging.umeeapp.co/">UmeePay Portal</a> </h3>

```
ENCRYPT_KEY = "6EB00D84532E5006CF86A237DE038D9A";
CLIENT_ID = "6EB00D84532E5006CF86A237DE038D9A";
SECRET_KEY = "6EB00D84532E5006CF86A237DE038D9A";
```

### Import kpay-sdk

```
import {Payment} from 'kpay-nodejs-sdk';
```

### Example create new Object Payment

### [Keys were gotten above: CLIENT_ID, ENCRYPT_KEY, SECRET_KEY](#get-key)

```
import {Payment} from 'kpay-nodejs-sdk';

const payment = new Payment(CLIENT_ID, ENCRYPT_KEY, SECRET_KEY);
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
    console.log('res data: ', res);
})
.catch(err => {
    console.log('error: ', err);
})
```

### Response create payment

```
{
    transactionId: '6db5cf6e-e952-4ab5-8c55-aa82400fdd35',
    refTransactionId: '123456',
    payLinkCode: 'QCg8oFIf',
    timeout: 10000,
    url: 'https://umee-pay-dev.hcm.unicloud.ai/paylink/QCg8oFIf',
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
const dataCheck = {
    transactionId: '6db5cf6e-e952-4ab5-8c55-aa82400fdd35'
}

const check = payment.check(dataCheck).then(res => {
    console.log('res data: ', res);
})
.catch(err => {
    console.log('error: ', err);
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
const dataCancel = {
    transactionId: '6db5cf6e-e952-4ab5-8c55-aa82400fdd35'
}

const cancel = payment.cancel(dataCheck).then(res => {
    console.log('res data: ', res);
})
.catch(err => {
    console.log('error: ', err);
})
```

### Response cancel payment

```
{ success: true }
```
