var mongoose = require('mongoose');

// Set mongoose.Promise to any Promise implementation
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/kindertracker');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
	console.log("KinderTracker DB connection successful...")
 });