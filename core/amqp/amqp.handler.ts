import * as amqp from 'amqplib/callback_api'

export class AmqpHandler {

    constructor() {
        this.receiveMessage()
       // this.sendMessage()
    }

    receiveMessage() {
        amqp.connect('amqp://localhost', (err, conn) => {
            conn.createChannel((err, channel) => {
                const exchange = 'mineraljs.exchange'

                channel.assertExchange(exchange, 'fanout', {durable: false})

                channel.assertQueue('', {exclusive: true}, (err, queue) => {
                    console.log('got queue', err, queue )
                    channel.bindQueue(queue.queue, exchange, '')

                    channel.consume(queue.queue, (msg) => {
                        console.log('Got message:', msg.content.toString())
                    }, {noAck: true})
                })
            })
        })
    }

    async sendMessage() {
        amqp.connect('amqp://localhost', (err, conn) => {
            console.log('got connection', err, conn)
            conn.createChannel((err, channel) => {
                console.log('got channel', err, channel)
                const exchange = 'mineraljs.exchange'

                const message = 'Hello World!'

                channel.assertExchange(exchange, 'fanout', {durable: false})
                channel.publish(exchange, '', new Buffer(message))
            })
        })
    }
}
