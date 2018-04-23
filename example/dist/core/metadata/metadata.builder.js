"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class MetadataBuilder {
    constructor(serverOptions) {
        this.serverOptions = serverOptions;
    }
    buildComponentMetadata(classes) {
        const components = !classes ? _1.getMetadataArgsStorage().components : _1.getMetadataArgsStorage().filterComponentMetadataForClasses(classes);
        return components.map(componentArgs => {
            const component = new _1.ComponentMetadata(componentArgs);
            return component;
        });
    }
    buildControllerMetadata(classes) {
        const controllers = !classes ? _1.getMetadataArgsStorage().controllers : _1.getMetadataArgsStorage().filterControllerMetadataForClasses(classes);
        return controllers.map(controllerArgs => {
            const controller = new _1.ControllerMetadata(controllerArgs);
            controller.actions = this.createActions(controller);
            return controller;
        });
    }
    createActions(controller) {
        return _1.getMetadataArgsStorage()
            .filterActionsWithTarget(controller.target)
            .map(actionArgs => {
            const action = new _1.ActionMetadata(controller, actionArgs, this.serverOptions);
            action.build(this.createActionResponseHandlers(action));
            return action;
        });
    }
    createActionResponseHandlers(action) {
        return _1.getMetadataArgsStorage()
            .filterResponseHandlersWithTargetAndMethod(action.target, action.method)
            .map(handlerArgs => new _1.ResponseHandlerMetadata(handlerArgs));
    }
}
exports.MetadataBuilder = MetadataBuilder;
//# sourceMappingURL=metadata.builder.js.map