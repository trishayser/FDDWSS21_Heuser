'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FacilitySchema = new Schema({
    "facility_id": {type: String, unique: true},
    "name": String,
    "description": String,
    "station_id": String,
    "type": String,
    "status_info": {
        "status": Number,
        "last_updated_user": String,
        "last_updated_company": String,
        "last_updated": String
    },
    "foreign_id": String,
    "foreign_station_id": String,
    "company": String,
    "last_updated": String,
    "created": String,
    "geo": {
        "coordinates": String,
        "typ": String,
        "name": String
    }

});

module.exports = mongoose.model('Facility', FacilitySchema);