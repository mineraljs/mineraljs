"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const utils_1 = require("../utils");
const types_1 = require("../types");
class Server {
    constructor(driver, serverOptions) {
        this.driver = driver;
        this.metadataBuilder = new __1.MetadataBuilder(serverOptions);
        this.setupLogger(serverOptions.logLevel);
        this.driver.initialize(serverOptions);
        this.createComponents(serverOptions.components);
        this.createControllers(serverOptions.controllers);
        this.createDatabaseConnection(serverOptions, serverOptions.entities);
        this
            .setupAmqp(serverOptions.amqpUrl);
        this.driver
            .errorHandler();
        this.driver
            .app.listen(2000);
        __1.getFromContainer(__1.EventPublisher)
            .publish(new __1.ApplicationStartedEvent());
    }
    setupLogger(logLevel) {
        if (!logLevel) {
            logLevel = types_1.LogLevel.ERROR;
        }
        __1.getFromContainer(__1.Logger)
            .initialize(logLevel);
    }
    createComponents(components) {
        if (!components || components.length === 0)
            return;
        this.metadataBuilder
            .buildComponentMetadata(components)
            .forEach(component => {
        });
    }
    createControllers(controllers) {
        if (!controllers || controllers.length === 0)
            return;
        this.metadataBuilder
            .buildControllerMetadata(controllers)
            .forEach(controller => {
            controller.actions.forEach(actionMetadata => {
                this.driver.registerAction(actionMetadata, (action) => {
                    return this.executeAction(actionMetadata, action);
                });
            });
        });
    }
    createDatabaseConnection(options, entities) {
        if (!entities || entities.length === 0 || !options || !options.dbOptions)
            return;
        if (options.dbOptions.logging === null)
            options.dbOptions.logging = options.logLevel === types_1.LogLevel.DEBUG;
        __1.getFromContainer(__1.EntityManager)
            .createConnection(options.dbOptions, entities);
    }
    executeAction(actionMetadata, action) {
        try {
            return this.handleCallMethodResult(actionMetadata.callMethod(action), actionMetadata, action);
        }
        catch (err) {
            return this.driver.handleError(err, action);
        }
    }
    handleCallMethodResult(result, actionMetadata, action) {
        if (utils_1.isPromise(result)) {
            return result
                .then((data) => {
                return this.handleCallMethodResult(data, actionMetadata, action);
            }).catch(err => {
                return this.driver.handleError(err, action);
            });
        }
        else {
            return this.driver.handleSuccess(result, actionMetadata, action);
        }
    }
    setupAmqp(amqpUrl) {
        if (!amqpUrl)
            return;
        const amqpHandler = __1.getFromContainer(__1.AmqpHandler);
        amqpHandler
            .initialize(amqpUrl)
            .then(() => amqpHandler.setupSubscribers());
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map