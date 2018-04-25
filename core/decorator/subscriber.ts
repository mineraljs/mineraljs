import { getMetadataArgsStorage } from '../metadata'

export function Subscriber(queue: string): Function {
    return function (object: Object, methodName: string) {
        getMetadataArgsStorage().subscribers.push({
            target: object.constructor,
            method: methodName,
            queue: queue
        })
    }
}