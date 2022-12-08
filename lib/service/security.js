"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var Security = /** @class */ (function () {
    function Security() {
    }
    Security.prototype.genarateSign = function (data, clientId, timestamp, secretKey) {
        var message = "".concat(clientId, "|").concat(timestamp, "|").concat(data);
        var alg = 'sha256';
        var cipher = (0, crypto_1.createHmac)(alg, secretKey);
        var sign = cipher.update(message);
        return sign.digest('hex');
    };
    Security.prototype.verifySign = function (data, dataValidate, clientId, timestamp, secretKey) {
        if (timestamp > Math.floor(Date.now())) {
            return false;
        }
        var sign = this.genarateSign(data, clientId, timestamp, secretKey);
        if (dataValidate !== sign) {
            return false;
        }
        return true;
    };
    Security.prototype.aseEcrypt = function (data, encryptKey) {
        var alg = 'aes-256-cbc';
        var key = Buffer.from(encryptKey, 'hex');
        if (key.length >= 4 && key.length <= 16) {
            alg = 'aes-128-cbc';
        }
        var cipher = (0, crypto_1.createCipheriv)(alg, key, key.subarray(0, 16));
        var encrypt = cipher.update(data, 'utf8', 'base64');
        encrypt += cipher.final('base64');
        return encrypt;
    };
    Security.prototype.aseDecrypt = function (data, encryptKey) {
        var alg = 'aes-256-cbc';
        var key = Buffer.from(encryptKey, 'hex');
        if (key.length >= 4 && key.length <= 16) {
            alg = 'aes-128-cbc';
        }
        var cipher = (0, crypto_1.createDecipheriv)(alg, key, key.subarray(0, 16));
        var decrypt = cipher.update(data, 'base64', 'utf8');
        decrypt += cipher.final('utf8');
        return decrypt;
    };
    return Security;
}());
exports.default = Security;
