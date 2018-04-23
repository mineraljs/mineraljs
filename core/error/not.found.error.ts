import { HttpError } from '.'

export class NotFoundError extends HttpError {

    constructor() {
        super(404, 'Not found')
    }
    
}