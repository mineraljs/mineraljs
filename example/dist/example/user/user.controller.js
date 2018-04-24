"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../core");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./user.dto");
let UserController = class UserController {
    constructor() {
        this.userService = core_1.getFromContainer(user_service_1.UserService);
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            yield core_1.getFromContainer(core_1.AmqpHandler)
                .sendMessage();
            return this.userService.getUsers();
        });
    }
    usersIndex() {
        return this.userService.getUsers();
    }
    error() {
        throw Error('test');
    }
    getUser(req) {
        return this.userService.getUser(req.request.params.id);
    }
    createUser(req) {
        const user = new user_dto_1.UserDTO();
        user.firstname = req.request.body.firstname;
        user.lastname = req.request.body.lastname;
        return this.userService.createUser(user);
    }
};
__decorate([
    core_1.Get('/api'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    core_1.Get(),
    core_1.Template('users/index'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "usersIndex", null);
__decorate([
    core_1.Get('/error'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "error", null);
__decorate([
    core_1.Get('/api/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUser", null);
__decorate([
    core_1.Post('/api'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUser", null);
UserController = __decorate([
    core_1.RestController('/users'),
    __metadata("design:paramtypes", [])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map