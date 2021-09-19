'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    "user_id": String,
    "user": String,
    "subscribed": [String]
});

module.exports = mongoose.model('User', UserSchema);