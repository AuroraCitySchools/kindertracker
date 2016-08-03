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
			// Send Teacher to Support Page
			req.user.msg = "Hi " + req.user.name.givenName + ". Bad news... " + 
				"We do not have you resistered to the " +
				"KinderTracker system. " + 
				"Please contact integration@aurora-schools.org " +
				"and let them know you received this message." + 
				" We'll get things fixed up for you quickly.";
			res.render('support', {
				user: req.user,
				msg: req.user.msg,
				pageTitle: 'Slight Problem...'
			});
		}
		else {
			// Head to the Teacher's Homepage
			console.log("\nWe have an existing user inbound: " 
				+ foundUser + "\n");
			var now = new Date();
			date = dateFormat(now, "dddd, mmmm dS ");
			time = dateFormat(now, " h:MM TT");
			var prettyDateToDisplay = date + 'at' + time;
			req.user.lastLogin = foundUser.lastLogin;
			req.user._id = foundUser._id;
			Teacher.update(
				{email: foundUser.email}, 
				{lastLogin: prettyDateToDisplay}
			).exec()
			.then(function(updateResults) {
				req.user.msg = "Welcome back, " + req.user.name.givenName + 
					". You last logged in on " + req.user.lastLogin + ".";
				res.redirect('homepage');
			})
			.catch(function(error) {
				console.log("Error updating last login time: " + error);
			});
		}
  })
  .catch(function(error) {
		req.user.msg = error;
		res.redirect('homepage');
	});
  
});

router.get('/homepage', function(req, res) {
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