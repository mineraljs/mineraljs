import { DatabaseType } from 'typeorm'
export interface ServerOptions {

    controllers?: Function[]

    components?: Function[]

    entities?: Function[]

    dbOptions?: DbOptions

}

export interface DbOptions {

    host: string

    type: DatabaseType

    port: number

    username: string

    password: string

    database: string

}
