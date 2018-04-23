import * as winston from 'winston'

export class Logger {

    private logger

    constructor() {
        this.logger = winston.createLogger({
            level: 'debug',
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'combined.log' })
            ]
        })
    }

    debug(message: string, label?: string) {
        this.log(message, 'debug', label)
    }

    info(message: string, label?: string) {
        this.log(message, 'info', label)
    }

    warning(message: string, label?: string) {
        this.log(message, 'warning', label)
    }

    error(message: string, label?: string) {
        this.log(message, 'error', label)
    }

    private log(message: string, level: string, label?: string) {
        const timestamp = Date.now()

        this.logger.log({
            level: level,
            message: label ? `${timestamp} [${label}] ${level}: ${message}` : `${timestamp} ${level}: ${message}`
        })
    }
}

