var express = require('express');
var app = express();
var port = 3000;

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


var mongoose = require('mongoose');
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  console.log('Connection to mongodb succesfull');
});

var BoatController = require('./controllers/boat')


mongoose.connect('mongodb://localhost:27017/activities');

app.route('/api/timeslots')
  .get(function(req, res) {
    res.send('List timeslots');
  })
  .post(function(req, res) {
    res.send('Timeslot created.');
  });

app.route('/api/boats')
  .get(BoatController.getBoats)
  .post(BoatController.postBoat);

// Start the server
app.listen(port);
console.log('Insert activities on port ' + port);