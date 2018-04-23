import { ControllerMetadata, ResponseHandlerMetadata } from '.'
import { ActionType } from '../types'
import { ActionMetadataArgs } from './args'
import { Action } from '../server'

export class ActionMetadata {

    controllerMetadata: ControllerMetadata
    target: Function
    method: string
    type: ActionType
    route: string
    fullRoute: string
    renderedTemplate: string
    headers: { [name: string]: any }
    isJson: boolean

    constructor(controllerMetadata: ControllerMetadata, args: ActionMetadataArgs, private options: any) {
        this.controllerMetadata = controllerMetadata
        this.route = args.route
        this.target = args.target
        this.method = args.method
        this.type = args.type   
    }

    callMethod(params: Action) {
        const controllerInstance = this.controllerMetadata.instance

        return controllerInstance[this.method].apply(controllerInstance, [params]);
    }

    build(responseHandlers: ResponseHandlerMetadata[]) {
        const renderedTemplateHandler = responseHandlers.find(handler => handler.type === 'rendered-template')
        const contentTypeHandler = responseHandlers.find(handler => handler.type === 'content-type')

        if (renderedTemplateHandler) this.renderedTemplate = renderedTemplateHandler.value

        this.isJson = (contentTypeHandler != undefined ? /json/.test(contentTypeHandler.value) : this.controllerMetadata.type === 'json')

        this.fullRoute = this.buildFullRoute()
        this.headers = this.buildHeaders(responseHandlers)
    }

    private buildFullRoute(): string {
        let path: string = ''

        if (this.controllerMetadata.route) path += this.controllerMetadata.route
        if (this.route) path += this.route

        return path
    }

    private buildHeaders(responseHandlers: ResponseHandlerMetadata[]) {
        const locationHandler = responseHandlers.find(handler => handler.type === 'location')

        const headers: { [name: string]: string } = {}

        if (locationHandler) headers['Location'] = locationHandler.value

        const headerHandlers = responseHandlers.filter(handler => handler.type === 'header')
        if (headerHandlers) headerHandlers.map(handler => headers[handler.value] = handler.secondaryValue)

        return headers
    }
}
