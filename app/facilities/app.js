const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

var app = express();

var port = process.env.PORT || 13773;

const Station = require('./models/stations');
const Facility = require('./models/facilities');
const Company = require('./models/companies');


mongo_user = process.env.MONGO_USER;
mongo_pass = process.env.MONGO_PASS;
mongoose.Promise = global.Promise;

//mongoose.connect('mongodb+srv://user:fddw2021@cluster0.ghg6j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
mongoose.connect("mongodb://mongo-fac:27017/facilities");


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./routes/routes');
routes(app);

app.use(function (req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('Facility REST API Server startet auf dem Port: ' + port);

var statusMonotoring = require('./controllers/statusMonitor');
statusMonotoring();