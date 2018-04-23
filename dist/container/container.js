"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultContainer = new (class {
    constructor() {
        this.instances = [];
    }
    get(someClass) {
        let instance = this.instances.find(instance => instance.type === someClass);
        if (!instance) {
            instance = { type: someClass, object: new someClass() };
            this.instances.push(instance);
        }
        return instance.object;
    }
})();
function getFromContainer(someClass) {
    return defaultContainer.get(someClass);
}
exports.getFromContainer = getFromContainer;
//# sourceMappingURL=container.js.map