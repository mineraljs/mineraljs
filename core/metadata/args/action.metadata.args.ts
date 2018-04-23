import { ActionType } from '../../types'

export interface ActionMetadataArgs {

    route: string
    target: Function
    method: string
    type: ActionType
}
