"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isPromise(arg) {
    return arg != null && typeof arg === 'object' && typeof arg.then === 'function';
}
exports.isPromise = isPromise;
//# sourceMappingURL=is.promise.js.map