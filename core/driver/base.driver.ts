import { ActionMetadata } from '../metadata'
import { ServerOptions, Action } from '../server'

export abstract class BaseDriver {
    
    app: any
    
    abstract initialize(options: ServerOptions): this 

    abstract registerAction(action: ActionMetadata, executeCallback: (action: Action) => any): void

    abstract registerRoutes(): void

    abstract handleSuccess(result: any, actionMetadata: ActionMetadata, action: Action): void

    abstract handleError(result: any, action: Action): void 

    abstract errorHandler(): this
    
}