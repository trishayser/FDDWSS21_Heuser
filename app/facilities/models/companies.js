'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CompanySchema = new Schema({
    "company_id": Number,
    "name": String,
});

module.exports = mongoose.model('Company', CompanySchema);