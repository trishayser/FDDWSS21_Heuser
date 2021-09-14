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
    Facility.findOneAndUpdate({facility_id: req.params.facility_id}, req.body, {new: true}, function(err, facility) {
        if (err)
            res.send(err);
        res.json(facility);
        //sendMessage(req.params.facility_id)
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

function sendMessage(facility_id) {
    try {
        amqp.connect('amqp://guest:guest@rabbit1:5672', function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
                var exchange = 'facilities';
                var msg = facility_id + ' updated';
                var severity = facility_id;

                channel.assertExchange(exchange, 'direct', {
                    durable: false
                });
                channel.publish(exchange, severity, Buffer.from(msg));
                console.log(" [x] Sent %s: '%s'", severity, msg);
            });
        });
    }catch (e) {
        console.log(e)
    }

}