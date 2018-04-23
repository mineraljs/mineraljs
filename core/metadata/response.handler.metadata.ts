import { ResponseHandlerMetadataArgs } from './args'

export class ResponseHandlerMetadata {
 
    target: Function
    method: string
    type: string
    value: any
    secondaryValue: any

    constructor(args: ResponseHandlerMetadataArgs) {
        this.target = args.target
        this.method = args.method
        this.type = args.type
        this.value = args.value
        this.secondaryValue = args.secondaryValue
    }
    
}