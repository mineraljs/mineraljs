import { Component, getFromContainer, EntityManager } from '../../core'

import * as uuid from 'uuid/v4'

import { UserDTO } from './user.dto'
import { User } from './user'
import { Repository } from 'typeorm'

@Component('userService')
export class UserService {

    repository: Repository<User>

    constructor() {
        this.repository = getFromContainer(EntityManager)
            .getRepository(User)
    }

    getUsers() {
        return new Promise((resolve, reject) => {

            this.repository.find()
                .then(entities => {
                    resolve(
                        entities.map(entity => {
                            const user: UserDTO = new UserDTO()
                            user.id = entity.id
                            user.firstname = entity.firstname
                            user.lastname = entity.lastname
                        
                            return user
                        })
                    )
                }).catch(err => {
                    reject(err)
                })
        })
    }

    getUser(id: string) {
        return new Promise((resolve, reject) => {
            this.repository.findOne(id)
                .then(entity => {
                    const user: UserDTO = new UserDTO()
                    user.id = entity.id
                    user.firstname = entity.firstname
                    user.lastname = entity.lastname

                    resolve(user)
                }).catch(err => {
                    reject(err)
                })
        })
    }

    createUser(user: UserDTO) {
        const entity: User = new User()
        entity.firstname = user.firstname
        entity.lastname = user.lastname
        entity.id = uuid()

        return new Promise((resolve, reject) => {
            this.repository.save(entity)
                .then(createdEntity => {
                    const createdUser: UserDTO = new UserDTO()
                    createdUser.id = createdEntity.id
                    createdUser.firstname = createdEntity.firstname
                    createdUser.lastname = createdEntity.lastname
                    
                    resolve(createdUser)
                }).catch(err => {
                    reject(err)
                })
        })
    }

    updateUser(user: UserDTO) {

    }

    deleteUser(user: UserDTO) {

    }

}