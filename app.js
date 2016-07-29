var express = require('express');
var app = express();

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('cover');
});

app.listen(3000, function () {
  console.log('KinderTracker now listening on port 3000!');
});