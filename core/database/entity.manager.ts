import { createConnection, Connection, Repository } from 'typeorm'
import { getFromContainer, Logger } from '..'

export class EntityManager {

    private connection: Connection

    constructor() {
        
    }    

    createConnection(entities : Function[]) {
        createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'mineral',
            logging: true,
            entities: entities
        }).then(connection => {
            this.connection = connection
        }).catch(err => {
            getFromContainer(Logger).error(`Database connection failed. ${err}`,'Database')
        })
    }

    getRepository(entity: Function): Repository<any> {        
        return this.connection.getRepository(entity)
    }

}
