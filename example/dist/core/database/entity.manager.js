"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const __1 = require("..");
class EntityManager {
    constructor() {
    }
    createConnection(options, entities) {
        let connectionOptions = {
            entities: entities,
            logging: true,
            host: options.host,
            port: options.port,
            username: options.username,
            password: options.password,
            database: options.database,
            type: options.type
        };
        if (options.type === 'postgres') {
        }
        typeorm_1.createConnection(connectionOptions).then(connection => {
            this.connection = connection;
        }).catch(err => {
            __1.getFromContainer(__1.Logger).error(`Database connection failed. ${err}`, 'Database');
        });
    }
    getRepository(entity) {
        return this.connection.getRepository(entity);
    }
}
exports.EntityManager = EntityManager;
//# sourceMappingURL=entity.manager.js.map