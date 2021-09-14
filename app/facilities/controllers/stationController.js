'use strict'

const mongoose = require('mongoose'),
    Station = mongoose.model('Station');

exports.list_stations = function(req, res) {
    Station.find({}, function (err, station) {
        if (err)
            res.send(err);
        res.json(station);
    });
};

exports.create_station = function(req, res) {
    var new_station = new Station(req.body);
    new_station.save(function(err, station) {
        if (err)
            res.send(err);
        res.json(station);
    });
};


exports.read_station = function(req, res) {
    Station.find({station_id: req.params.station_id}, function(err, station) {
        if (err)
            res.send(err);
        res.json(station);
    });
};


exports.update_station = function(req, res) {
    Station.findOneAndUpdate({station_id: req.params.station_id}, req.body, {new: true}, function(err, station) {
        if (err)
            res.send(err);
        res.json(station);
    });
};


exports.delete_station = function(req, res) {
    Station.remove({
        station_id: req.params.station_id
    }, function(err, entry) {
        if (err)
            res.send(err);
        res.json({ message: 'Station wurde gelöscht' });
    });
};

// Reset Funktion für dev
// Eigentlich nicht vorgesehen
exports.reset = function (req, res) {
    Station.deleteMany({});
};