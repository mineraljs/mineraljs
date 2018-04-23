import { ActionMetadata } from '.'
import { ControllerMetadataArgs } from './args'
import { getFromContainer } from '..'

export class ControllerMetadata {

    actions: ActionMetadata[]
    target: Function
    route: string
    type: string

    constructor(args: ControllerMetadataArgs) {
        this.target = args.target
        this.route = args.route
        this.type = args.type    
    }

    get instance(): any {
        return getFromContainer(this.target)
    }

}
