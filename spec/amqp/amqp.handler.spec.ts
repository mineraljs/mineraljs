import { AmqpHandler } from '../../core/amqp'
import { expect } from 'chai'
import { when, anyFunction, verify } from 'ts-mockito'
import * as mocha from 'mocha'

describe('AmqpHandler', () => {
    it('should init amqp handler', () => {
        const handler = new AmqpHandler()

        expect(handler).not.to.be.null
    })

    it('should connect to amqp', () => {
        const handler = new AmqpHandler()

        handler.initialize('url')
    })

})

