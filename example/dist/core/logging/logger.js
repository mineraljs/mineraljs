"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
class Logger {
    constructor() {
        this.logger = winston.createLogger({
            level: 'debug',
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'combined.log' })
            ]
        });
    }
    debug(message, label) {
        this.log(message, 'debug', label);
    }
    info(message, label) {
        this.log(message, 'info', label);
    }
    warning(message, label) {
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
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map