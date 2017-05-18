require('dotenv').config();

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var multer = require('multer');
var dbUrl = 'mongodb://localhost/videos';
var cloudinary = require('cloudinary');

mongoose.connect(dbUrl);
mongoose.connection.on('open', function(err){
    if (err) {
        console.log(err);
    }
    console.log('connected to ' + dbUrl);
});

app.use(multer({dest:__dirname+'/uploads/'}).any());

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));

require('./app/routes')(app);

app.listen(5000, function(err){
    if (err) {
        console.log(err);
    }
    console.log('app server running');
});

module.exports = app;