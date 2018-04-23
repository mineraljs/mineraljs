
import { getMetadataArgsStorage } from '../metadata'

export function EventListener(eventClass: Function): Function {
    return function (object: Object, methodName: string) {
        getMetadataArgsStorage().eventListeners.push({
            target: object,
            event: eventClass,
            method: methodName
        })
    }
}
