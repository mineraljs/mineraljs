import { ControllerMetadataArgs, ComponentMetadataArgs, ActionMetadataArgs, ResponseHandlerMetadataArgs, EventListenerMetadataArgs, SubscriberMetadataArgs } from './args'

export function getMetadataArgsStorage(): MetadataArgsStorage {

    if (!(global as any).metadataArgsStorage)
        (global as any).metadataArgsStorage = new MetadataArgsStorage()

    return (global as any).metadataArgsStorage
}

export class MetadataArgsStorage {

    controllers: ControllerMetadataArgs[] = []

    components: ComponentMetadataArgs[] = []

    actions: ActionMetadataArgs[] = []

    responseHandlers: ResponseHandlerMetadataArgs[] = []

    eventListeners: EventListenerMetadataArgs[] = []

    subscribers: SubscriberMetadataArgs[] = []

    filterComponentMetadataForClasses(classes: Function[]) {
        return this.components.filter(component => {
            return classes.filter(cls => component.target === cls).length > 0
        })
    }

    filterControllerMetadataForClasses(classes: Function[]) {
        return this.controllers.filter(controller => {
            return classes.filter(cls => controller.target === cls).length > 0       
        })
    }

    filterActionsWithTarget(target: Function): ActionMetadataArgs[] {
        return this.actions.filter(action => action.target === target)
    }

    filterResponseHandlersWithTargetAndMethod(target: Function, methodName: string): ResponseHandlerMetadataArgs[] {
        return this.responseHandlers.filter(responseHandler => responseHandler.target === target && responseHandler.method === methodName)
    }

    filterEventListenersForEvent(event: Object): EventListenerMetadataArgs[] {
        return this.eventListeners.filter(eventListener => eventListener.event === event.constructor)
    }

}
