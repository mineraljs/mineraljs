import { getMetadataArgsStorage } from "../metadata";
import { EventListener } from "..";
import { EventListenerMetadata } from "../metadata/event.listener.metadata";

export class EventPublisher {

    publish(event: Object) {
        const eventListeners = getMetadataArgsStorage().filterEventListenersForEvent(event)

        eventListeners.forEach(listenerArgs => {
            const eventListener = new EventListenerMetadata(listenerArgs)

            eventListener.target[eventListener.method].apply(eventListener.target, [event])
        })
    }

}
