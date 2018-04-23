"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("../metadata");
function Controller(baseRoute) {
    return function (object) {
        metadata_1.getMetadataArgsStorage().controllers.push({
            target: object,
            route: baseRoute,
            type: 'default'
        });
    };
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map