import { EventListenerMetadataArgs } from './args'
import { getFromContainer } from '..'

export class EventListenerMetadata {

    target: Object
    event: Function
    method: string

    constructor(args: EventListenerMetadataArgs) {
        this.target = args.target
        this.event = args.event
        this.method = args.method
    }

    get instance(): any {
        return getFromContainer(this.event.constructor)
    }

}

