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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../core");
const uuid = require("uuid/v4");
const user_dto_1 = require("./user.dto");
const user_1 = require("./user");
let UserService = class UserService {
    constructor() {
        this.repository = core_1.getFromContainer(core_1.EntityManager)
            .getRepository(user_1.User);
    }
    getUsers() {
        return new Promise((resolve, reject) => {
            this.repository.find()
                .then(entities => {
                resolve(entities.map(entity => {
                    const user = new user_dto_1.UserDTO();
                    user.id = entity.id;
                    user.firstname = entity.firstname;
                    user.lastname = entity.lastname;
                    return user;
                }));
            }).catch(err => {
                reject(err);
            });
        });
    }
    getUser(id) {
        return new Promise((resolve, reject) => {
            this.repository.findOne(id)
                .then(entity => {
                const user = new user_dto_1.UserDTO();
                user.id = entity.id;
                user.firstname = entity.firstname;
                user.lastname = entity.lastname;
                resolve(user);
            }).catch(err => {
                reject(err);
            });
        });
    }
    createUser(user) {
        const entity = new user_1.User();
        entity.firstname = user.firstname;
        entity.lastname = user.lastname;
        entity.id = uuid();
        return new Promise((resolve, reject) => {
            this.repository.save(entity)
                .then(createdEntity => {
                const createdUser = new user_dto_1.UserDTO();
                createdUser.id = createdEntity.id;
                createdUser.firstname = createdEntity.firstname;
                createdUser.lastname = createdEntity.lastname;
                resolve(createdUser);
            }).catch(err => {
                reject(err);
            });
        });
    }
    updateUser(user) {
    }
    deleteUser(user) {
    }
};
UserService = __decorate([
    core_1.Component('userService'),
    __metadata("design:paramtypes", [])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map