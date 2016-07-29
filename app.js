'use strict';

require('./database.js');

var requiresLogin = require('./utility/requiresLogin');
var dateFormat = require('dateformat');
var mongoose = require('mongoose');
var express = require('express');
var app = express();
var passport = require('passport');

// This will configure Passport to use Auth0
var strategy = require('./config/setup-passport');
// Session and cookies middlewares to keep user logged in
var cookieParser = require('cookie-parser');
var session = require('express-session');

//var Student = require('./models/student.js');
var Teacher = require('./models/teacher.js');

var teacherRoute = require('./routes/teacherRoute');

app.set('view engine','pug');

app.use(express.static('public'));

app.use(cookieParser());
app.use(session({ secret: 'EggGA0hL1oMRAy-OyFV4tU5o10ywAeqIcYNadTrGEzQmPaGkQMuXyPjsB1b5yVuZ', resave: false,  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/teacher', teacherRoute);

app.get('/', function (req, res) {
  res.render('cover');
});

app.get('/login', function(req,res){
	res.render('login');
});

//change in auth0 settings once pushed to actual url and not localhost
app.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/loginfailed' }),
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect('teacher/post-auth');
});

app.listen(3000, function () {
  console.log('KinderTracker listening on port 3000!');
});