"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getMetadataArgsStorage() {
    if (!global.routingControllersMetadataArgsStorage)
        global.routingControllersMetadataArgsStorage = new MetadataArgsStorage();
    return global.routingControllersMetadataArgsStorage;
}
exports.getMetadataArgsStorage = getMetadataArgsStorage;
class MetadataArgsStorage {
    constructor() {
        this.controllers = [];
        this.components = [];
    }
}
exports.MetadataArgsStorage = MetadataArgsStorage;
//# sourceMappingURL=metadata.args.storage.js.map