import * as amqp from 'amqplib/callback_api'

import { getMetadataArgsStorage, getFromContainer, Subscriber, Logger } from '..'

export class AmqpHandler {

    private amqpUrl: string
    private connection: any

    constructor() {
    }

    initialize(amqpUrl: string): Promise<void> {
        return new Promise((resolve, reject) => {
            amqp.connect(amqpUrl, (err, conn) => {
                if (err) {
                    getFromContainer(Logger)
                        .error(`Cannot connect to amqp with url [${amqpUrl}]: ${err}`)
                    
                        reject(err)
                    return
                }
                this.connection = conn

                resolve()
            })
        })
            
    }

    setupSubscribers() {
        this.createChannel()
            .then(channel => {

            getMetadataArgsStorage().subscribers.forEach(subscriber => {
                channel.assertExchange(subscriber.queue, 'fanout', {durable: false})
                channel.assertQueue('', {exclusive: true}, (err, queue) => {

                    channel.bindQueue(queue.queue, subscriber.queue, '')
                    channel.consume(queue.queue, (msg) => {

                      const target = getFromContainer(subscriber.target)
                        target[subscriber.method].apply(target, [msg])
                    }, {noAck:true})
                })
            })
        })
    
    }

    private createChannel(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.createChannel((err, channel) => {
                if (err) {
                    getFromContainer(Logger)
                        .error(`Cannot create channel: ${err}`)

                    reject(err)
                    return
                }

                resolve(channel)
            })
        })
    }

    async sendMessage(queue: string, message: any) {
        this.createChannel().then(channel => {    
            channel.assertExchange(queue, 'fanout', {durable: false})
            channel.publish(queue, '', new Buffer(message))
        })
    }
}

