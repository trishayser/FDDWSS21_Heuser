#!/usr/bin/env python
import pika, sys, os


def main():
    url = "amqps://rgcgkvdo:OFnwyOy4Tw8L5U16HOqXW3zf1HrXVL1T@cow.rmq2.cloudamqp.com/rgcgkvdo"
    params = pika.URLParameters(url)
    connection = pika.BlockingConnection(params)
    channel = connection.channel()

    channel.queue_declare(queue='facility')

    def callback(ch, method, properties, body):
        print(" [x] Received %r" % body)

    channel.basic_consume(queue='facility', on_message_callback=callback, auto_ack=True)

    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)