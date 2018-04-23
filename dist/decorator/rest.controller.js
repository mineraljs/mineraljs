"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("../metadata");
function RestController(baseRoute) {
    return function (object) {
        metadata_1.getMetadataArgsStorage().controllers.push({
            target: object,
            route: baseRoute,
            type: 'rest'
        });
    };
}
exports.RestController = RestController;
//# sourceMappingURL=rest.controller.js.map