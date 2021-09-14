'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var StationSchema = new Schema({
    "station_id": String,
    "name": String,
    "company": String,
    "foreign_id": String,
    "last_updated": String,
    "created": String,
    "geo": {
        "coordinates": String,
        "typ": String,
        "name": String
    },
    "stops": [{
        "name": String,
        "lines": String,
        "foreign_id": String,
        "geo": {
            "coordinates": String,
            "typ": String,
            "name": String
        }
    }]

});

module.exports = mongoose.model('Station', StationSchema);