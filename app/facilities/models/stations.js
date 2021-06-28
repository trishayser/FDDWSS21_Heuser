'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var StationSchema = new Schema({
    "station_id": Number,
    "name": String,
    "company_id": Number,
    "foreign_id": Number,
    "timestamp": String

});

module.exports = mongoose.model('Station', StationSchema);