"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ActionMetadata {
    constructor(controllerMetadata, args, options) {
        this.options = options;
        this.controllerMetadata = controllerMetadata;
        this.route = args.route;
        this.target = args.target;
        this.method = args.method;
        this.type = args.type;
    }
    callMethod(params) {
        const controllerInstance = this.controllerMetadata.instance;
        return controllerInstance[this.method].apply(controllerInstance, [params]);
    }
    build(responseHandlers) {
        const renderedTemplateHandler = responseHandlers.find(handler => handler.type === 'rendered-template');
        const contentTypeHandler = responseHandlers.find(handler => handler.type === 'content-type');
        if (renderedTemplateHandler)
            this.renderedTemplate = renderedTemplateHandler.value;
        this.isJson = (contentTypeHandler != undefined ? /json/.test(contentTypeHandler.value) : this.controllerMetadata.type === 'json');
        this.fullRoute = this.buildFullRoute();
        this.headers = this.buildHeaders(responseHandlers);
    }
    buildFullRoute() {
        let path = '';
        if (this.controllerMetadata.route)
            path += this.controllerMetadata.route;
        if (this.route)
            path += this.route;
        return path;
    }
    buildHeaders(responseHandlers) {
        const locationHandler = responseHandlers.find(handler => handler.type === 'location');
        const headers = {};
        if (locationHandler)
            headers['Location'] = locationHandler.value;
        const headerHandlers = responseHandlers.filter(handler => handler.type === 'header');
        if (headerHandlers)
            headerHandlers.map(handler => headers[handler.value] = handler.secondaryValue);
        return headers;
    }
}
exports.ActionMetadata = ActionMetadata;
//# sourceMappingURL=action.metadata.js.map