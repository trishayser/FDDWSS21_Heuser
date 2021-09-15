'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MessageSchema = new Schema({
    "user": String,
    "timestamp": String,
    "payload": String
});

module.exports = mongoose.model('Message', MessageSchema);