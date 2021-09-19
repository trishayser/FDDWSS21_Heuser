const amqp = require("amqplib/callback_api");
const axios = require('axios');

amqp.connect('amqp://guest:guest@rabbit:5672', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'messages';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());

            var message_string = msg.content.toString();
            var json = JSON.parse(message_string);

            var facility_id = json.facility_id;

            axios.get("http://users:16773/users").then(function (res) {
                var all_users = res.data;
                var users = [];
                for (let i=0; i < all_users.length; i++) {
                    if (all_users[i].subscribed.includes(facility_id)) {
                        users.push(all_users[i].user_id)
                    }
                }
                for (let j=0; j < users.length; j++) {
                    var message = {
                        "user": users[j],
                        "payload": json.text,
                        "timestamp": Date.now()
                    }
                    sendMessage(message);
                }
            });

        }, {
            noAck: true
        });
    });
});

function sendMessage(message) {
    axios.post("http://messages:14773/messages", message).then(function (res) {
        console.log(res);
    });
}

