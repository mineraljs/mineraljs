"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("../metadata");
function Subscriber(queue) {
    return function (object, methodName) {
        metadata_1.getMetadataArgsStorage().subscribers.push({
            target: object.constructor,
            method: methodName,
            queue: queue
        });
    };
}
exports.Subscriber = Subscriber;
//# sourceMappingURL=subscriber.js.map