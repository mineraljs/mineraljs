"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const utils_1 = require("../utils");
class Server {
    constructor(driver, serverOptions) {
        this.driver = driver;
        this.metadataBuilder = new __1.MetadataBuilder(serverOptions);
        this.driver.initialize(serverOptions);
        this.createComponents(serverOptions.components);
        this.createControllers(serverOptions.controllers);
        this.createDatabaseConnection(serverOptions.dbOptions, serverOptions.entities);
        this.setupAmqp();
        this.driver
            .errorHandler()
            .app.listen(2000);
        __1.getFromContainer(__1.EventPublisher)
            .publish(new __1.ApplicationStartedEvent());
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
        if (!entities || entities.length === 0 || !options)
            return;
        __1.getFromContainer(__1.EntityManager)
            .createConnection(options, entities);
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
    setupAmqp() {
        __1.getFromContainer(__1.AmqpHandler)
            .sendMessage();
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map