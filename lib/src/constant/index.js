"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseCode = void 0;
var ResponseCode = /** @class */ (function () {
    function ResponseCode(code, message) {
        this.code = code;
        this.message = message;
    }
    ResponseCode.prototype.getCode = function () {
        return this.code;
    };
    ResponseCode.prototype.getMessage = function () {
        return this.message;
    };
    ResponseCode.INVALID_SIGNATURE = new ResponseCode(1, "Invalid signature");
    ResponseCode.INVALID_CLIENT_ID = new ResponseCode(2, "Invalid client id");
    return ResponseCode;
}());
exports.ResponseCode = ResponseCode;
