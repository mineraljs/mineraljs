import { ComponentMetadataArgs } from './args'
import { getFromContainer } from '..';

export class ComponentMetadata {

    name: string
    target: Function

    constructor(args: ComponentMetadataArgs) {
        this.name = args.name
        this.target = args.target
    }

    get instance(): any {
        return getFromContainer(this.target)
    }

}
