"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getMetadataArgsStorage() {
    if (!global.metadataArgsStorage)
        global.metadataArgsStorage = new MetadataArgsStorage();
    return global.metadataArgsStorage;
}
exports.getMetadataArgsStorage = getMetadataArgsStorage;
class MetadataArgsStorage {
    constructor() {
        this.controllers = [];
        this.components = [];
        this.actions = [];
        this.responseHandlers = [];
        this.eventListeners = [];
    }
    filterComponentMetadataForClasses(classes) {
        return this.components.filter(component => {
            return classes.filter(cls => component.target === cls).length > 0;
        });
    }
    filterControllerMetadataForClasses(classes) {
        return this.controllers.filter(controller => {
            return classes.filter(cls => controller.target === cls).length > 0;
        });
    }
    filterActionsWithTarget(target) {
        return this.actions.filter(action => action.target === target);
    }
    filterResponseHandlersWithTargetAndMethod(target, methodName) {
        return this.responseHandlers.filter(responseHandler => responseHandler.target === target && responseHandler.method === methodName);
    }
    filterEventListenersForEvent(event) {
        return this.eventListeners.filter(eventListener => eventListener.event === event.constructor);
    }
}
exports.MetadataArgsStorage = MetadataArgsStorage;
//# sourceMappingURL=metadata.args.storage.js.map