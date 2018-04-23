"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("../metadata");
function Delete(route) {
    return actionType('DELETE', route);
}
exports.Delete = Delete;
function Get(route) {
    return actionType('GET', route);
}
exports.Get = Get;
function Post(route) {
    return actionType('POST', route);
}
exports.Post = Post;
function Put(route) {
    return actionType('PUT', route);
}
exports.Put = Put;
const actionType = (type, route) => {
    return (object, methodName) => {
        metadata_1.getMetadataArgsStorage().actions.push({
            type: type,
            target: object.constructor,
            method: methodName,
            route: route
        });
    };
};
//# sourceMappingURL=http.methods.js.map