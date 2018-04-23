import * as express from 'express'
import * as logger from 'morgan'
import * as bodyParser from 'body-parser'
import * as methodOverride from 'method-override'
import * as cors from 'cors'
import * as pug from 'pug'

import { Action, ServerOptions, getFromContainer, ActionMetadata, Logger, NotFoundError } from '..'

import { BaseDriver } from '.'

export class ExpressDriver extends BaseDriver {
    
    logger: Logger

    constructor(public express?: any) {
        super()
        this.logger = getFromContainer(Logger)
        this.loadExpress()
        this.app = this.express
    }

    initialize(options: ServerOptions): this {
        this.logger.debug('Initializing Express driver')

        this.app.use(logger('dev'))
        this.app.use(bodyParser.json())
        this.app.use(methodOverride())

        this.app.set('views', `${process.cwd()}/views`)
        this.app.set('view engine', 'pug')  
        
        return this
    }

    errorHandler(): this {
        getFromContainer(Logger).debug('Registering error handler')

        this.app.use(function(err, req, res, next) {   
            console.log('Using Error')
            this.handleError(err, {
                request: req,
                response: res,
                next
            })
        })

        return this
    }

    registerAction(actionMetadata: ActionMetadata, executeCallback: (options: Action) => any): void {
        getFromContainer(Logger).debug(`Registering action [${actionMetadata.type}] to ${actionMetadata.fullRoute}`)

        const routeHandler = function routeHandler(request: any, response: any, next: Function) {
            if (request.method.toLowerCase() !== actionMetadata.type.toLowerCase()) return next()

            return executeCallback({request, response, next})
        }

        this.app[actionMetadata.type.toLowerCase()](...[
            actionMetadata.fullRoute,
            routeHandler
        ])

    }

    registerRoutes(): void {
    }

    handleSuccess(result: any, actionMetadata: ActionMetadata, action: Action) {
        if (result && result === action.response) {
            action.next()
            return
        }

        Object.keys(actionMetadata.headers).forEach(name => {
            action.response.header(name, actionMetadata.headers[name])
        })

        if (result === undefined || result === null) {
            action.response.status(204)
        } else {
            action.response.status(200)
        }

        if (actionMetadata.renderedTemplate) {
            const renderOptions = result && result instanceof Object ? result: {}

            getFromContainer(Logger)
                .debug(`Rendering page ${actionMetadata.renderedTemplate}`)
            
            action.response.render(
                actionMetadata.renderedTemplate,
                renderOptions
            )
        } else if (action === undefined) {
            throw new NotFoundError()
        } else if (action === null) {
            if (actionMetadata.isJson) {
                action.response.json(null)
            } else {
                action.response.send(null)
            }

            action.next()
        } else {
            if (actionMetadata.isJson) {
                action.response.json(result)
            } else {
                action.response.send(result)
            }

            action.next()
        }
    }

    handleError(error: any, action: Action) {
        getFromContainer(Logger).debug(`Handling error: ${error}`)

        const response: any = action.response
        
        if (error.httpCode) {
            response.status(error.httpCode)
        } else {
            response.status(500)
        }

        if (typeof error === 'string') {
            action.response.header('content-type', 'text/plain')
        }

        return action.response.send(error)
    }

    loadExpress() {
        if (!this.express) {
            this.express = express()
        }
    }

}
