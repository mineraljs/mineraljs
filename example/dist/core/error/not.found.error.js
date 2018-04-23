"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class NotFoundError extends _1.HttpError {
    constructor() {
        super(404, 'Not found');
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=not.found.error.js.map