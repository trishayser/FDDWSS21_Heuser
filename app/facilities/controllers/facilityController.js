'use strict'

const mongoose = require('mongoose'),
    Facility = mongoose.model("Facility");

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
    Facility.findById({_id: req.params.facility_id}, function(err, facility) {
        if (err)
            res.send(err);
        res.json(facility);
    });
};


exports.update_facility = function(req, res) {
    Facility.findOneAndUpdate({_id: req.params.facility_id}, req.body, {new: true}, function(err, facility) {
        if (err)
            res.send(err);
        res.json(facility);
    });
};


exports.delete_facility = function(req, res) {
    Facility.remove({
        _id: req.params.facility_id
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