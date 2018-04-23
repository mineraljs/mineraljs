
import { getMetadataArgsStorage } from '../metadata'

export function RestController(baseRoute?: string): Function {
    return function (object: Function) {
        getMetadataArgsStorage().controllers.push({
            target: object,
            route: baseRoute,
            type: 'rest'
        })
    }
}