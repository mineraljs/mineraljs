"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("../metadata");
function Component(name) {
    return function (object) {
        metadata_1.getMetadataArgsStorage().components.push({
            target: object,
            name: name
        });
    };
}
exports.Component = Component;
//# sourceMappingURL=component.js.map