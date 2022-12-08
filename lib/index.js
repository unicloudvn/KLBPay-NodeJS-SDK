"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
var security_1 = require("./service/security");
var payment_1 = require("./controller/payment");
exports.Payment = payment_1.default;
var data = {
    refTransactionId: "123456",
    amount: 123,
    description: "description123",
    timeout: 10000,
    title: "title123",
    language: "language",
    customerInfo: {
        fullName: "customerInfo123",
        email: "email1325",
        phone: "phone123",
        address: "address123"
    },
    successUrl: "successUrl123",
    failUrl: "failUrl123",
    redirectAfter: 5,
};
var payment = new payment_1.default("65swreHb5Q3S04wIK5sUzp+9wCPM35+3rNVL/+2lPr4JVXu4zBZUROvArJni04sn7kUNo/o5FyV5PU4nLYOLayc5PHrsSuscZJtQkpjhWFzPD9zZqT+M5hdZiW8wbpOiY7AeywWmDFg5ae5TeGdV/pYPbD345i7aRrONry2SLu4=", "838e919b-ce19-43bf-b338-75adbe045726", "6EB00D84532E5006CF86A237DE038D9A");
var security = new security_1.default();
var aes = security.aseEcrypt('Hello Merchant! Im PayGate', '78B8B5E54FAC233E1AF050B77052F79948DACDD83E18E428C1757195A8020376');
