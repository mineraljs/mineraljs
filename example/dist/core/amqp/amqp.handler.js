"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqp = require("amqplib/callback_api");
const __1 = require("..");
class AmqpHandler {
    constructor() {
    }
    initialize(amqpUrl) {
        return new Promise((resolve, reject) => {
            amqp.connect(amqpUrl, (err, conn) => {
                if (err) {
                    __1.getFromContainer(__1.Logger)
                        .error(`Cannot connect to amqp with url [${amqpUrl}]: ${err}`);
                    reject(err);
                    return;
                }
                this.connection = conn;
                resolve();
            });
        });
    }
    setupSubscribers() {
        this.createChannel()
            .then(channel => {
            __1.getMetadataArgsStorage().subscribers.forEach(subscriber => {
                channel.assertExchange(subscriber.queue, 'fanout', { durable: false });
                channel.assertQueue('', { exclusive: true }, (err, queue) => {
                    channel.bindQueue(queue.queue, subscriber.queue, '');
                    channel.consume(queue.queue, (msg) => {
                        const target = __1.getFromContainer(subscriber.target);
                        target[subscriber.method].apply(target, [msg]);
                    }, { noAck: true });
                });
            });
        });
    }
    createChannel() {
        return new Promise((resolve, reject) => {
            this.connection.createChannel((err, channel) => {
                if (err) {
                    __1.getFromContainer(__1.Logger)
                        .error(`Cannot create channel: ${err}`);
                    reject(err);
                    return;
                }
                resolve(channel);
            });
        });
    }
    sendMessage(queue, message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.createChannel().then(channel => {
                channel.assertExchange(queue, 'fanout', { durable: false });
                channel.publish(queue, '', new Buffer(message));
            });
        });
    }
}
exports.AmqpHandler = AmqpHandler;
//# sourceMappingURL=amqp.handler.js.map