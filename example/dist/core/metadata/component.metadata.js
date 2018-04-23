"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
class ComponentMetadata {
    constructor(args) {
        this.name = args.name;
        this.target = args.target;
    }
    get instance() {
        return __1.getFromContainer(this.target);
    }
}
exports.ComponentMetadata = ComponentMetadata;
//# sourceMappingURL=component.metadata.js.map