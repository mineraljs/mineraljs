"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("../metadata");
const event_listener_metadata_1 = require("../metadata/event.listener.metadata");
class EventPublisher {
    publish(event) {
        const eventListeners = metadata_1.getMetadataArgsStorage().filterEventListenersForEvent(event);
        eventListeners.forEach(listenerArgs => {
            const eventListener = new event_listener_metadata_1.EventListenerMetadata(listenerArgs);
            eventListener.target[eventListener.method].apply(eventListener.target, [event]);
        });
    }
}
exports.EventPublisher = EventPublisher;
//# sourceMappingURL=event.publisher.js.map