"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("../metadata");
function Entity(options) {
    return function (object) {
        metadata_1.getMetadataArgsStorage().entities.push({
            target: object,
            options: options
        });
    };
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map