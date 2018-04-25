"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
class SubscriberMetadata {
    constructor(args) {
        this.target = args.target;
        this.queue = args.queue;
        this.method = args.method;
    }
    get instance() {
        return __1.getFromContainer(this.target.constructor);
    }
}
exports.SubscriberMetadata = SubscriberMetadata;
//# sourceMappingURL=subscriber.metadata.js.map