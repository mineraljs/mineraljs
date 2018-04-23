"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
class ControllerMetadata {
    constructor(args) {
        this.target = args.target;
        this.route = args.route;
        this.type = args.type;
    }
    get instance() {
        return __1.getFromContainer(this.target);
    }
}
exports.ControllerMetadata = ControllerMetadata;
//# sourceMappingURL=controller.metadata.js.map