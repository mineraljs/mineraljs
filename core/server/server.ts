import { Action, ServerOptions } from '.'
import { getFromContainer, EventPublisher, ApplicationStartedEvent, BaseDriver, MetadataBuilder, ActionMetadata, EntityManager } from '..'

import { isPromise } from '../utils'

export class Server {

    private metadataBuilder: MetadataBuilder
    
    constructor(private driver: BaseDriver, serverOptions: ServerOptions) {
        this.metadataBuilder = new MetadataBuilder(serverOptions)
        
        this.driver.initialize(serverOptions)

        this.createComponents(serverOptions.components)
        this.createControllers(serverOptions.controllers)
        this.createDatabaseConnection(serverOptions.entities)

        this.driver
            .errorHandler()
            .app.listen(2000)
            
        getFromContainer(EventPublisher)
            .publish(new ApplicationStartedEvent())
            
        
    }

    private createComponents(components? : Function[]) {
        if (!components || components.length === 0) return
        
        this.metadataBuilder
            .buildComponentMetadata(components)
            .forEach(component => {
            })
    }

    private createControllers(controllers? : Function[]) {
        if (!controllers || controllers.length === 0) return

        this.metadataBuilder
            .buildControllerMetadata(controllers)
            .forEach(controller => {
                controller.actions.forEach(actionMetadata => {
                    this.driver.registerAction(actionMetadata, (action: Action) => {
                        return this.executeAction(actionMetadata, action)
                    })
                })
            })
    }

    private createDatabaseConnection(entities?: Function[]) {
        if (!entities || entities.length === 0) return

        getFromContainer(EntityManager)
            .createConnection(entities)
    }

    private executeAction(actionMetadata: ActionMetadata, action: Action) {
        try {
            return this.handleCallMethodResult(
                actionMetadata.callMethod(action),
                actionMetadata,
                action
            )
        } catch(err) {
            return this.driver.handleError(err, action)
        }
    }

    private handleCallMethodResult(result: any, actionMetadata: ActionMetadata, action: Action): any {
        if (isPromise(result)) {
            return result
                .then((data: any) => {
                    return this.handleCallMethodResult(data, actionMetadata, action)
                }).catch(err => {
                    return this.driver.handleError(err, action)
                })
        } else {
            return this.driver.handleSuccess(result, actionMetadata, action)
        }
    }

}
