"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("../metadata");
function Render(template) {
    return function (object, methodName) {
        metadata_1.getMetadataArgsStorage().responseHandlers.push({
            type: 'rendered-template',
            target: object.constructor,
            method: methodName,
            value: template
        });
    };
}
exports.Render = Render;
//# sourceMappingURL=render.js.map