"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
class EventListenerMetadata {
    constructor(args) {
        this.target = args.target;
        this.event = args.event;
        this.method = args.method;
    }
    get instance() {
        return __1.getFromContainer(this.event.constructor);
    }
}
exports.EventListenerMetadata = EventListenerMetadata;
//# sourceMappingURL=event.listener.metadata.js.map