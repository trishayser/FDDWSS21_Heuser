'use strict'

const mongoose = require('mongoose'),
    User = mongoose.model("User");

exports.list_users = function(req, res) {
    User.find({}, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.create_user = function(req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.read_user = function(req, res) {
    User.find({user_id: req.params.user_id}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.update_user = function(req, res) {
    User.findOneAndUpdate({user_id: req.params.user_id}, req.body, {new: true}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.delete_user = function(req, res) {
    User.remove({
        user_id: req.params.user_id
    }, function(err, entry) {
        if (err)
            res.send(err);
        res.json({ user: 'user wurde gelöscht' });
    });
};

