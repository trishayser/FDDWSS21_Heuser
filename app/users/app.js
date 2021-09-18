const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');

var app = express();

var port = process.env.PORT || 16773;

const User = require('./model');


mongo_user = process.env.MONGO_USER;
mongo_pass = process.env.MONGO_PASS;
mongoose.Promise = global.Promise;

//mongoose.connect('mongodb+srv://user:fddw2021@cluster0.ghg6j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
mongoose.connect("mongodb://mongo-usr:27017/users");


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

var routes = require('./routing');
routes(app);

app.use(function (req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('User REST API Server startet auf dem Port: ' + port);