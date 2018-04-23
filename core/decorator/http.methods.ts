import { getMetadataArgsStorage } from '../metadata' 
import { ActionType } from '../types'

export function Delete(route?: string): Function {
    return actionType('DELETE', route)
}

export function Get(route?: string): Function {
    return actionType('GET', route)
}

export function Post(route?: string): Function {
    return actionType('POST', route)
}

export function Put(route?: string): Function {
    return actionType('PUT', route)
}

const actionType = (type: ActionType, route?: string) => {
    return (object: Object, methodName: string) => {
        getMetadataArgsStorage().actions.push({
            type: type,
            target: object.constructor,
            method: methodName,
            route: route
        })
    }
}
