'use strict'

const mongoose = require('mongoose'),
    Facility = mongoose.model("Facility");
const amqp = require("amqplib/callback_api");


exports.list_facilites = function(req, res) {
    Facility.find({}, function (err, facility) {
        if (err)
            res.send(err);
        res.json(facility);
    });
};

exports.create_facility = function(req, res) {
    var new_facility = new Facility(req.body);
    new_facility.save(function(err, facility) {
        if (err)
            res.send(err);
        res.json(facility);
    });
};


exports.read_facility = function(req, res) {
    Facility.find({facility_id: req.params.facility_id}, function(err, facility) {
        if (err)
            res.send(err);
        res.json(facility);
    });
};


exports.update_facility = function(req, res) {
    Facility.find({facility_id: req.params.facility_id}, function(err, old_facility) {
        if (err)
            res.send(err);
        Facility.findOneAndUpdate({facility_id: req.params.facility_id}, req.body, {new: true}, function(err, facility) {
            if (err)
                res.send(err);
            res.json(facility);
            if ("status_info" in facility && "status_info" in old_facility[0]) {
                console.log("YES!!!!");
                if (old_facility[0].status_info.status != facility.status_info.status) {
                    console.log("UPDATE!!!!");
                    sendMessage(req.params.facility_id, facility.status_info.status);
                }
            }

        });
    });

};


exports.delete_facility = function(req, res) {
    Facility.remove({
        facility_id: req.params.facility_id
    }, function(err, entry) {
        if (err)
            res.send(err);
        res.json({ message: 'Facility wurde gelöscht' });
    });
};

// Reset Funktion für dev
// Eigentlich nicht vorgesehen
exports.reset = function (req, res) {
    Facility.deleteMany({});
};

function sendMessage(facility_id, status) {
    console.log("sendMessage()");
    try {
        amqp.connect('amqp://guest:guest@rabbit1:5672', function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
                var queue = 'messages';
                var text = "";
                if (status == 0) {
                    text = "Facility " + facility_id + ": Status is now unknown";
                } else if (status == 1) {
                    text = "Facility " + facility_id + ": is now defect";
                } else if (status == 2) {
                    text = "Facility " + facility_id + ": is now working";
                }

                var data = {
                    "facility_id": facility_id,
                    "text": text
                }

                var msg = JSON.stringify(data);

                channel.assertQueue(queue, {
                    durable: false
                });

                channel.sendToQueue(queue, Buffer.from(msg));
                console.log(" [x] Sent %s", msg);
            });
        });
    }catch (e) {
        console.log(e)
    }

}