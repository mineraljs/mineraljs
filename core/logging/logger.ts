import * as winston from 'winston'
import { LogLevel } from '../types';

export class Logger {

    private logger: any
    private logLevel: LogLevel

    constructor() {

    }

    initialize(level: LogLevel) {
        this.logLevel = this.logLevel

        this.logger = winston.createLogger({
            level: this.getLogLevel(),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'combined.log' })
            ]
        })
    }

    debug(message: string, label?: string) {
        if (this.logLevel === LogLevel.DEBUG) this.log(message, 'debug', label)
    }

    info(message: string, label?: string) {
        if (this.logLevel <= LogLevel.INFO) this.log(message, 'info', label)
    }

    warning(message: string, label?: string) {
        if (this.logLevel <= LogLevel.WARNING) this.log(message, 'warning', label)
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

    private getLogLevel() {
        return this.logLevel === LogLevel.DEBUG ? 'debug' : 
            this.logLevel === LogLevel.INFO ? 'info' : 
            this.logLevel === LogLevel.WARNING ? 'warning' : 
            'error' 
    }
}

