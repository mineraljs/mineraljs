import { DatabaseType } from 'typeorm'
import { LogLevel } from '../types';
export interface ServerOptions {

    controllers?: Function[]

    components?: Function[]

    entities?: Function[]

    dbOptions?: DbOptions

    logLevel?: LogLevel

    amqpUrl?: string
}

export interface DbOptions {

    host: string

    type: DatabaseType

    port: number

    username: string

    password: string

    database: string

    logging?: Boolean
}
