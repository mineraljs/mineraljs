"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const types_1 = require("../types");
class Logger {
    constructor() {
    }
    initialize(level) {
        this.logLevel = this.logLevel;
        this.logger = winston.createLogger({
            level: this.getLogLevel(),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'combined.log' })
            ]
        });
    }
    debug(message, label) {
        if (this.logLevel === types_1.LogLevel.DEBUG)
            this.log(message, 'debug', label);
    }
    info(message, label) {
        if (this.logLevel <= types_1.LogLevel.INFO)
            this.log(message, 'info', label);
    }
    warning(message, label) {
        if (this.logLevel <= types_1.LogLevel.WARNING)
            this.log(message, 'warning', label);
    }
    error(message, label) {
        this.log(message, 'error', label);
    }
    log(message, level, label) {
        const timestamp = Date.now();
        this.logger.log({
            level: level,
            message: label ? `${timestamp} [${label}] ${level}: ${message}` : `${timestamp} ${level}: ${message}`
        });
    }
    getLogLevel() {
        return this.logLevel === types_1.LogLevel.DEBUG ? 'debug' :
            this.logLevel === types_1.LogLevel.INFO ? 'info' :
                this.logLevel === types_1.LogLevel.WARNING ? 'warning' :
                    'error';
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map