var express = require('express');
var app = express();
var port = 3000;

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3333');

	// Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


var mongoose = require('mongoose');
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  console.log('Connection to mongodb succesfull');
});

var BoatController = require('./controllers/boat');
var ListingController = require('./controllers/listing');
var AssignmentsController = require('./controllers/assignment');
var BookingsController = require('./controllers/booking');

mongoose.connect('mongodb://localhost:27017/activities');

app.route('/api/timeslots')
  .get(ListingController.getListingsByDate)
  .post(ListingController.postListing);

app.route('/api/boats')
  .get(BoatController.getBoats)
  .post(BoatController.postBoat);

app.route('/api/assignments').post(AssignmentsController.postAssignment);

app.route('/api/bookings').post(BookingsController.postBookings)

// Start the server
app.listen(port);
console.log('Insert activities on port ' + port);