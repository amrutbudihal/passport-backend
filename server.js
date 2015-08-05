var express = require('express');
var app = express();
var port = 3000;

app.route('/api/timeslots')
  .get(function(req, res) {
    res.send('List timeslots');
  })
  .post(function(req, res) {
    res.send('Timeslot created.');
  });

app.route('/api/boats')
  .get(function(req, res) {
    res.send('List boats');
  })
  .post(function(req, res) {
    res.send('Boat created.');
  });

// Start the server
app.listen(port);
console.log('Insert activities on port ' + port);