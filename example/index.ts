import { Server, ServerOptions, getFromContainer } from '../core'

import { UserController, UserService } from './user'

import { ExpressDriver } from '../core/driver'
import { User } from './user/user';

new Server(
    new ExpressDriver(),
    {
        controllers: [UserController],
        components: [UserService],
        entities: [User],
        dbOptions: {
            host: 'localhost',
            password: 'postgres',
            username: 'postgres',
            type: 'postgres',
            port: 5432,
            database: 'mineral'
        },
        amqpUrl: 'amqp://localhost'
    }
)


