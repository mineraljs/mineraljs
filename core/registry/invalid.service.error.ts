import { HttpError } from '../error'

export class InvalidServiceError extends HttpError {

    constructor(name: string) {
        super(500, `Invalid Service ${name}`)
    }
}