"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("../metadata");
function EventListener(eventClass) {
    return function (object, methodName) {
        metadata_1.getMetadataArgsStorage().eventListeners.push({
            target: object,
            event: eventClass,
            method: methodName
        });
    };
}
exports.EventListener = EventListener;
//# sourceMappingURL=event.listener.js.map