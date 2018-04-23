import { ComponentMetadata, ControllerMetadata, getMetadataArgsStorage, ActionMetadata, ResponseHandlerMetadata } from '.'
import { ComponentMetadataArgs } from './args'
import { ServerOptions } from '..'

export class MetadataBuilder {
 
    constructor(private serverOptions: ServerOptions) {}

    buildComponentMetadata(classes: Function[]): ComponentMetadata[] {
        const components = !classes ? getMetadataArgsStorage().components : getMetadataArgsStorage().filterComponentMetadataForClasses(classes)

        return components.map(componentArgs => {
            const component = new ComponentMetadata(componentArgs)
            
            return component
            
        })
    }
    
    buildControllerMetadata(classes: Function[]): ControllerMetadata[] {
        const controllers = !classes ? getMetadataArgsStorage().controllers : getMetadataArgsStorage().filterControllerMetadataForClasses(classes)

        return controllers.map(controllerArgs => {
            const controller = new ControllerMetadata(controllerArgs)
            controller.actions = this.createActions(controller)

            return controller
        })
    }

    private createActions(controller: ControllerMetadata): ActionMetadata[] {
        return getMetadataArgsStorage()
            .filterActionsWithTarget(controller.target)
            .map(actionArgs => {
                const action = new ActionMetadata(controller, actionArgs, this.serverOptions)
                action.build(this.createActionResponseHandlers(action))

                return action
            })
    }

    private createActionResponseHandlers(action: ActionMetadata): ResponseHandlerMetadata[] {
        return getMetadataArgsStorage()
            .filterResponseHandlersWithTargetAndMethod(action.target, action.method)
            .map(handlerArgs => new ResponseHandlerMetadata(handlerArgs))
    }
}

