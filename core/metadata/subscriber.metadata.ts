import { SubscriberMetadataArgs } from './args'
import { getFromContainer } from '..'

export class SubscriberMetadata {

    target: Object
    queue: string
    method: string

    constructor(args: SubscriberMetadataArgs) {
        this.target = args.target
        this.queue = args.queue
        this.method = args.method
    }

    get instance(): any {
        return getFromContainer(this.target.constructor)
    }

    
}
