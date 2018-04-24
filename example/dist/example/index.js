"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const user_1 = require("./user");
const driver_1 = require("../core/driver");
const user_2 = require("./user/user");
new core_1.Server(new driver_1.ExpressDriver(), {
    controllers: [user_1.UserController],
    components: [user_1.UserService],
    entities: [user_2.User],
    dbOptions: {
        host: 'localhost',
        password: 'postgres',
        username: 'postgres',
        type: 'postgres',
        port: 5432,
        database: 'mineral'
    }
});
//# sourceMappingURL=index.js.map