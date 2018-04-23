
import { getMetadataArgsStorage } from '../metadata'

export function Component(name?: string): Function {
    return function (object: Function) {
        getMetadataArgsStorage().components.push({
            target: object,
            name: name
        })
    }
}