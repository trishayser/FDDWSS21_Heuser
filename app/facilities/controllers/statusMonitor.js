var amqp = require('amqplib/callback_api');
const mongoose = require('mongoose'),
    Facility = mongoose.model("Facility");
module.exports = function () {
    amqp.connect('amqp://rabbit1:5672', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'status';

            channel.assertQueue(queue, {
                durable: false
            });

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

            channel.consume(queue, function(msg) {
                console.log(" [x] Received %s", msg.content.toString());
                var message = msg.content.toString();

                var id = message.split(';')[0];
                var timestamp = message.split(';')[1];
                var status = message.split(';')[2];

                Facility.find({facility_id: id}, function(err, facility) {
                    if (!err && facility.length != 0){
                        console.log("1");
                        if ("status_info" in facility) {
                            console.log("2");
                            if (facility.status_info.status != status) {
                                console.log("3");
                                var new_fac = facility[0];
                                new_fac.status_info = {
                                    status: status,
                                    last_updated: timestamp
                                };
                                Facility.findOneAndUpdate({facility_id: id}, new_fac, {new: true}, function(err, facility) {
                                    if (err)
                                        console.log(err);
                                    console.log("facility updated")
                                    //sendMessage(req.params.facility_id)
                                });
                            }
                        } else {
                            var new_fac = facility[0];
                            new_fac.status_info = {
                                status: status,
                                last_updated: timestamp
                            };
                            console.log(new_fac);
                            Facility.findOneAndUpdate({facility_id: id}, new_fac, {new: true}, function(err, facility) {
                                if (err)
                                    console.log(err);
                                console.log("facility updated");
                                console.log(facility);
                                //sendMessage(req.params.facility_id)
                            });
                        }
                    }
                });
            }, {
                noAck: true
            });
        });
    });
}
