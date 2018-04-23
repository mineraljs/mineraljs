import { RestController, getFromContainer, Get, Post, EventListener, Template } from '../../core'
import { UserService } from './user.service'
import { UserDTO } from './user.dto'

@RestController('/users')
export class UserController {

    userService: UserService

    constructor() {
        this.userService = getFromContainer(UserService)
    }

    @Get('/api')
    getUsers() {
        return this.userService.getUsers()
    }

    @Get()
    @Template('users/index')
    usersIndex() {
        return this.userService.getUsers()
    }
    
    @Get('/error')
    error() {
        throw Error('test')
    }

    @Get('/api/:id')
    getUser(req: any) {
        return this.userService.getUser(req.request.params.id)
    }

    @Post('/api')
    createUser(req: any) {
        const user: UserDTO = new UserDTO()
        user.firstname = req.request.body.firstname
        user.lastname = req.request.body.lastname

        return this.userService.createUser(user)
    }
}
