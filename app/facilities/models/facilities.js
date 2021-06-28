'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FacilitySchema = new Schema({
    "facility_id": Number,
    "name": String,
    "station_id": Number,
    "status": Number,
    "foreign_id": Number,
    "timestamp": String

});

module.exports = mongoose.model('Facility', FacilitySchema);