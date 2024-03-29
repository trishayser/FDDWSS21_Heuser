'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    "user_id": {type: String, unique: true},
    "user": String,
    "subscribed": [String]
});

module.exports = mongoose.model('User', UserSchema);