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
class AmqpHandler {
    constructor() {
        this.receiveMessage();
    }
    receiveMessage() {
        amqp.connect('amqp://localhost', (err, conn) => {
            conn.createChannel((err, channel) => {
                const exchange = 'mineraljs.exchange';
                channel.assertExchange(exchange, 'fanout', { durable: false });
                channel.assertQueue('', { exclusive: true }, (err, queue) => {
                    console.log('got queue', err, queue);
                    channel.bindQueue(queue.queue, exchange, '');
                    channel.consume(queue.queue, (msg) => {
                        console.log('Got message:', msg.content.toString());
                    }, { noAck: true });
                });
            });
        });
    }
    sendMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            amqp.connect('amqp://localhost', (err, conn) => {
                console.log('got connection', err, conn);
                conn.createChannel((err, channel) => {
                    console.log('got channel', err, channel);
                    const exchange = 'mineraljs.exchange';
                    const message = 'Hello World!';
                    channel.assertExchange(exchange, 'fanout', { durable: false });
                    channel.publish(exchange, '', new Buffer(message));
                });
            });
        });
    }
}
exports.AmqpHandler = AmqpHandler;
//# sourceMappingURL=amqp.handler.js.map