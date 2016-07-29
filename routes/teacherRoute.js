var mongoose = require('mongoose');
var express = require('express');
var app = express();
var Teacher = require('../models/teacher.js');
var dateFormat = require('dateformat');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/post-auth', function (req, res) {
  //see if teacher exists
  Teacher.findOne({email: req.user._json.email}).exec()
  .then(function(foundUser) {
  	if(foundUser === null) {
			var now = new Date();
			date = dateFormat(now, "dddd, mmmm dS ");
			time = dateFormat(now, " h:MM TT");
			prettyDateToDisplay = date + ' at' + time;
			Teacher.create(
			{ 
				name:{first:req.user.name.givenName,last:req.user.name.familyName} ,
		 		email: req.user._json.email,
		 		picture: req.user._json.picture,
				lastLogin: prettyDateToDisplay
			})
			.then(function(userCreationResults) {
				req.user.msg = 'Welcome ' + req.user.name.givenName + 
					'. You\'re into KinderTracker!';
				req.user._id = userCreationResults;
				res.redirect('homepage');
			})
			.catch(function(error) {
				req.user.msg = error;
				res.redirect('homepage');
			});
		}
		else {
			console.log("\nWe have an existing user inbound: " 
				+ foundUser + "\n");
			var now = new Date();
			date = dateFormat(now, "dddd, mmmm dS ");
			time = dateFormat(now, " h:MM TT");
			prettyDateToDisplay = date + ' at' + time;
			req.user.lastLogin = prettyDateToDisplay;
			req.user._id = foundUser._id;
			req.user.msg = 'Welcome back, ' + req.user.name.givenName + 
				'. You last logged in on ' + req.user.lastLogin + '.';
			res.redirect('homepage');
		}
  })
  .catch(function(error) {
		req.user.msg = error;
		res.redirect('homepage');
	});
  
});

router.get('/homepage', function(req, res) {
	console.log("Boom!");
	// Check, save, then clear any inbound messages
	if(req.user.msg) {
		var msg = req.user.msg;
		req.user.msg = null;
	}
	res.render('homepage', {
		user: req.user,
		msg: msg,
		pageTitle: 'Welcome!'
	});
});

router.get('/logout',function(req, res) {
	res.redirect("https://aurora-schools.auth0.com/v2/logout?returnTo=http://localhost:3000/login&client_id=HNQibHitwV1MOFg3Zt5e2XcpKLwUg79W");
});

module.exports = router;