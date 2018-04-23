"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const __1 = require("..");
const _1 = require(".");
class ExpressDriver extends _1.BaseDriver {
    constructor(express) {
        super();
        this.express = express;
        this.logger = __1.getFromContainer(__1.Logger);
        this.loadExpress();
        this.app = this.express;
    }
    initialize(options) {
        this.logger.debug('Initializing Express driver');
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(methodOverride());
        this.app.set('views', `${process.cwd()}/views`);
        this.app.set('view engine', 'pug');
        return this;
    }
    errorHandler() {
        __1.getFromContainer(__1.Logger).debug('Registering error handler');
        this.app.use(function (err, req, res, next) {
            console.log('Using Error');
            this.handleError(err, {
                request: req,
                response: res,
                next
            });
        });
        return this;
    }
    registerAction(actionMetadata, executeCallback) {
        __1.getFromContainer(__1.Logger).debug(`Registering action [${actionMetadata.type}] to ${actionMetadata.fullRoute}`);
        const routeHandler = function routeHandler(request, response, next) {
            if (request.method.toLowerCase() !== actionMetadata.type.toLowerCase())
                return next();
            return executeCallback({ request, response, next });
        };
        this.app[actionMetadata.type.toLowerCase()](...[
            actionMetadata.fullRoute,
            routeHandler
        ]);
    }
    registerRoutes() {
    }
    handleSuccess(result, actionMetadata, action) {
        if (result && result === action.response) {
            action.next();
            return;
        }
        Object.keys(actionMetadata.headers).forEach(name => {
            action.response.header(name, actionMetadata.headers[name]);
        });
        if (result === undefined || result === null) {
            action.response.status(204);
        }
        else {
            action.response.status(200);
        }
        if (actionMetadata.renderedTemplate) {
            const renderOptions = result && result instanceof Object ? result : {};
            __1.getFromContainer(__1.Logger)
                .debug(`Rendering page ${actionMetadata.renderedTemplate}`);
            action.response.render(actionMetadata.renderedTemplate, renderOptions);
        }
        else if (action === undefined) {
            throw new __1.NotFoundError();
        }
        else if (action === null) {
            if (actionMetadata.isJson) {
                action.response.json(null);
            }
            else {
                action.response.send(null);
            }
            action.next();
        }
        else {
            if (actionMetadata.isJson) {
                action.response.json(result);
            }
            else {
                action.response.send(result);
            }
            action.next();
        }
    }
    handleError(error, action) {
        __1.getFromContainer(__1.Logger).debug(`Handling error: ${error}`);
        const response = action.response;
        if (error.httpCode) {
            response.status(error.httpCode);
        }
        else {
            response.status(500);
        }
        if (typeof error === 'string') {
            action.response.header('content-type', 'text/plain');
        }
        return action.response.send(error);
    }
    loadExpress() {
        if (!this.express) {
            this.express = express();
        }
    }
}
exports.ExpressDriver = ExpressDriver;
//# sourceMappingURL=express.driver.js.map