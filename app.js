var express		= require('express');
var mongoose	= require('mongoose');
var morgan		= require('morgan');
var Person		= require('./Agent.js');
var bodyParser	= require('body-parser');

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


// get '/'
app.get('/', function() {

});


// server is listenning
app.listen(port, function() {
	console.log('Listening on ' + port);
});




// console.log("HERE");
// 	var Person = new Person({
// 		agentID			: "123",
// 		agentName		: "Sample",
// 		haveWWW			: true,
// 		onHomePage		: true,
// 		brandedBanner	: true,
// 		aboveTheFold	: true,
// 		onFacebook		: true,
// 		dateAdded		: Date(),
// 		dateModified	: Date(),
// 		portalLink		: "123",
// 		validSlug		: true,
// 		websiteLink		: "123.com"
// 	});
// 	Person.save(function(err, data) {
// 		if(err) {
// 			console.log(err);
// 		}
// 		console.log("Saved");
// 	});