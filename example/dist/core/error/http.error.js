"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpError extends Error {
    constructor(httpCode, message) {
        super(message);
        this.httpCode = httpCode;
        this.message = message;
    }
}
exports.HttpError = HttpError;
//# sourceMappingURL=http.error.js.map