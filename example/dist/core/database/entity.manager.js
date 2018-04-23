"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const __1 = require("..");
class EntityManager {
    constructor() {
    }
    createConnection(entities) {
        typeorm_1.createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'mineral',
            logging: true,
            entities: entities
        }).then(connection => {
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