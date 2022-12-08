"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var security_1 = require("../service/security");
var axios_1 = require("axios");
var customError_1 = require("../error/customError");
var Payment = /** @class */ (function () {
    function Payment(secretKey, clientId, encrypt) {
        var _this = this;
        this.security = new security_1.default();
        this.timestamp = Math.floor(Date.now());
        this.BASE_URL = process.env.API_URL || 'https://api-umeecore-dev.hcm.unicloud.ai/umee-pay';
        this.ENDPOINT_CREATE = process.env.ENDPOINT_CREATE || '/api/payment/v1/create';
        this.ENDPOINT_CHECK = process.env.ENDPOINT_CHECK || '/api/payment/v1/check';
        this.ENDPOINT_CANCEL = process.env.ENDPOINT_CANCEL || '/api/payment/v1/cancel';
        this.create = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var dataConvert, payload, apiValidate, url, response, client, dataValidate, timeResponse, responseData, dateDecrypt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataConvert = JSON.stringify(data);
                        payload = this.security.aseEcrypt(dataConvert, this.encryptKey);
                        apiValidate = this.security.genarateSign(payload, this.clientId, this.timestamp, this.secretKey);
                        url = this.BASE_URL + this.ENDPOINT_CREATE;
                        return [4 /*yield*/, axios_1.default.post(url, {
                                data: payload,
                            }, {
                                headers: {
                                    'x-api-client': this.clientId,
                                    'x-api-validate': apiValidate,
                                    'x-api-time': this.timestamp,
                                    'Content-Type': 'application/json',
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        client = response.headers['x-api-client'];
                        dataValidate = response.headers['x-api-validate'];
                        timeResponse = Number(response.headers['x-api-time']);
                        responseData = response.data;
                        if (responseData.code !== 0) {
                            throw new customError_1.default(responseData.code, responseData.message);
                        }
                        if (this.security.verifySign(responseData.data, dataValidate, client, timeResponse, this.secretKey)) {
                            dateDecrypt = this.security.aseDecrypt(responseData.data, this.encryptKey);
                            return [2 /*return*/, dateDecrypt];
                        }
                        return [2 /*return*/, null];
                }
            });
        }); };
        this.check = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var dataConvert, payload, apiValidate, url, response, client, dataValidate, timeResponse, responseData, dateDecrypt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataConvert = JSON.stringify(data);
                        payload = this.security.aseEcrypt(dataConvert, this.encryptKey);
                        apiValidate = this.security.genarateSign(payload, this.clientId, this.timestamp, this.secretKey);
                        url = this.BASE_URL + this.ENDPOINT_CHECK;
                        return [4 /*yield*/, axios_1.default.post(url, {
                                data: payload,
                            }, {
                                headers: {
                                    'x-api-client': this.clientId,
                                    'x-api-validate': apiValidate,
                                    'x-api-time': this.timestamp,
                                    'Content-Type': 'application/json',
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        client = response.headers['x-api-client'];
                        dataValidate = response.headers['x-api-validate'];
                        timeResponse = Number(response.headers['x-api-time']);
                        responseData = response.data;
                        if (responseData.code !== 0) {
                            throw new customError_1.default(responseData.code, responseData.message);
                        }
                        if (this.security.verifySign(responseData.data, dataValidate, client, timeResponse, this.secretKey)) {
                            dateDecrypt = this.security.aseDecrypt(responseData.data, this.encryptKey);
                            return [2 /*return*/, dateDecrypt];
                        }
                        return [2 /*return*/, null];
                }
            });
        }); };
        this.cancel = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var dataConvert, payload, apiValidate, url, response, client, dataValidate, timeResponse, responseData, dateDecrypt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataConvert = JSON.stringify(data);
                        payload = this.security.aseEcrypt(dataConvert, this.encryptKey);
                        apiValidate = this.security.genarateSign(payload, this.clientId, this.timestamp, this.secretKey);
                        url = this.BASE_URL + this.ENDPOINT_CHECK;
                        return [4 /*yield*/, axios_1.default.post(url, {
                                data: payload,
                            }, {
                                headers: {
                                    'x-api-client': this.clientId,
                                    'x-api-validate': apiValidate,
                                    'x-api-time': this.timestamp,
                                    'Content-Type': 'application/json',
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        client = response.headers['x-api-client'];
                        dataValidate = response.headers['x-api-validate'];
                        timeResponse = Number(response.headers['x-api-time']);
                        responseData = response.data;
                        if (responseData.code !== 0) {
                            throw new customError_1.default(responseData.code, responseData.message);
                        }
                        if (this.security.verifySign(responseData.data, dataValidate, client, timeResponse, this.secretKey)) {
                            dateDecrypt = this.security.aseDecrypt(responseData.data, this.encryptKey);
                            return [2 /*return*/, dateDecrypt];
                        }
                        return [2 /*return*/, null];
                }
            });
        }); };
        this.clientId = clientId;
        this.encryptKey = encrypt;
        this.secretKey = secretKey;
    }
    return Payment;
}());
exports.default = Payment;
