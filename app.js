var express 	= require('express');
var mongoose  	= require('mongoose');
var morgan 		= require('morgan');
var Person		= require('./Agent.js');
var bodyParser 	= require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

var db  = mongoose.connect('mongodb://localhost:27017/agentlist');

// try connection to the database
mongoose.connect('connected', function() {
	console.log("Connected to database successfully!!!")
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.get('/', function() {

});


// server is listenning
app.listen(port, function() {
	console.log('Listening on ' + port);
});