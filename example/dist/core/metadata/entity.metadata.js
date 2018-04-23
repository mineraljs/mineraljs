"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class EntityMetadata {
    constructor(args) {
        this.target = args.target;
        this.options = args.options;
    }
    build() {
        return typeorm_1.Entity(this.options);
    }
}
exports.EntityMetadata = EntityMetadata;
//# sourceMappingURL=entity.metadata.js.map