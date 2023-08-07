import Payment from './controller/payment';
import NotifyTransactionController from './controller/webhook';
import * as Model from './model';
import { ServerResponse, IncomingMessage } from 'http';
export { Payment, Model };

// Importing http module
const http = require('http');

const PORT = process.env.PORT || 3000;
// Creating http Server
const notify = new NotifyTransactionController(
  '5a404192-045b-4f6b-863f-192a0b9a88b4',
  '022E0BF1076030B6E64127107CC1BA576F643E08D2617E93DEB1D13AB1443896',
  'TZ4IYbmI6d/wvqMMCGV5u4CcE5+KDFJ+lTewp/LoRGDj94p6yFQ1k+/gMY1EXt9Tm80qRfu9BH+KCBoPwoIKs5WXKtsXpCa9vzmxcEyNW1qWwRpSWrNanOzpWRKzyZazWaziWu1A1TleeYYEUhhWZeqR42w2MX68Uu30n5tNGAwY5+Ctl1axCUzoNBC9czTXpzUNr/zIByW9RWW+BKJ6LNZv5V4HxzYesFmTTbcO9fgG5zTkTZ6s/H9n6NJ8UJFItOB5Rska7uYWmEDdkOx/5UGLrddjdHreYDIxUgTI5tHEwJM/1sXeM3N3rlqsJNBFqngA78PYypv6EUtNLFa9wQ==',
  'https://api.dev.kienlongbank.co/pay',
);
const httpServer = http.createServer(function (req: IncomingMessage, res: ServerResponse) {
  // Getting request/response header
  // by using request.headers method

  // http header
  res.writeHead(200, { 'Content-Type': 'text/html' });
  console.log(req.method);

  const url = req.url;
  if (url?.includes('/notify') && req.method === 'POST') {
    notify.notifyTransaction(req, res);
  }
});

// Listening to http Server
httpServer.listen(PORT, () => {
  console.log('Server is running at port 3000...');
});

// const pay = new Payment(
//   '5a404192-045b-4f6b-863f-192a0b9a88b4',
//   '022E0BF1076030B6E64127107CC1BA576F643E08D2617E93DEB1D13AB1443896',
//   'TZ4IYbmI6d/wvqMMCGV5u4CcE5+KDFJ+lTewp/LoRGDj94p6yFQ1k+/gMY1EXt9Tm80qRfu9BH+KCBoPwoIKs5WXKtsXpCa9vzmxcEyNW1qWwRpSWrNanOzpWRKzyZazWaziWu1A1TleeYYEUhhWZeqR42w2MX68Uu30n5tNGAwY5+Ctl1axCUzoNBC9czTXpzUNr/zIByW9RWW+BKJ6LNZv5V4HxzYesFmTTbcO9fgG5zTkTZ6s/H9n6NJ8UJFItOB5Rska7uYWmEDdkOx/5UGLrddjdHreYDIxUgTI5tHEwJM/1sXeM3N3rlqsJNBFqngA78PYypv6EUtNLFa9wQ==',
//   'https://api.dev.kienlongbank.co/pay',
// );
// const createReq: Model.CreatePaymentRequest = {
//   refTransactionId: 'TEST_1213_TEST_123_123_sadssdsadd',
//   amount: 105000,
//   description: 'string',
//   timeout: 300,
//   title: 'string',
//   language: 'vn',
//   customerInfo: {
//     fullName: 'Phan Van C',
//     email: 'cphan@gmail.com',
//     phone: '0123456789',
//     address: 'string',
//   },
//   successUrl: 'string',
//   failUrl: 'string',
//   redirectAfter: 5,
//   bankAccountId: '',
//   paymentType: 'BANKING',
// };
// pay
//   .create(createReq)
//   .then((res) => console.log('create response: ', res))
//   .catch((err) => console.log(err));
