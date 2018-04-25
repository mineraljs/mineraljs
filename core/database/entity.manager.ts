import { createConnection, Connection, Repository } from 'typeorm'
import { getFromContainer, Logger, DbOptions } from '..'

export class EntityManager {

    private connection: Connection

    constructor() {
        
    }    

    createConnection(options: DbOptions, entities : Function[]) {
        let connectionOptions: any = {
            entities: entities,
            logging: options.logging,
            host: options.host,
            port: options.port,
            username: options.username,
            password: options.password,
            database: options.database,
            type: options.type
        }

        createConnection(connectionOptions).then(connection => {
            this.connection = connection
        }).catch(err => {
            getFromContainer(Logger).error(`Database connection failed. ${err}`,'Database')
        })
    }

    getRepository(entity: Function): Repository<any> {        
        return this.connection.getRepository(entity)
    }

}
