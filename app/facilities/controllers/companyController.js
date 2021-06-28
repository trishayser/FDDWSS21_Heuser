'use strict'

const mongoose = require('mongoose'),
    Company = mongoose.model("Company");

exports.list_companies = function(req, res) {
    Company.find({}, function (err, company) {
        if (err)
            res.send(err);
        res.json(company);
    });
};

exports.create_company = function(req, res) {
    var new_company = new Company(req.body);
    new_company.save(function(err, company) {
        if (err)
            res.send(err);
        res.json(company);
    });
};


exports.read_company = function(req, res) {
    Company.findById({_id: req.params.company_id}, function(err, company) {
        if (err)
            res.send(err);
        res.json(company);
    });
};


exports.update_company = function(req, res) {
    Company.findOneAndUpdate({_id: req.params.company_id}, req.body, {new: true}, function(err, company) {
        if (err)
            res.send(err);
        res.json(company);
    });
};


exports.delete_company = function(req, res) {
    Company.remove({
        _id: req.params.company_id
    }, function(err, entry) {
        if (err)
            res.send(err);
        res.json({ message: 'Company wurde gelöscht' });
    });
};

// Reset Funktion für dev
// Eigentlich nicht vorgesehen
exports.reset = function (req, res) {
    Company.deleteMany({});
};