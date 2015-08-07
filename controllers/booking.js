var Booking = require('../models/booking');

module.exports.postBookings = function (req, res) {
	var booking = new Booking();
	booking.timeslotId = req.body.booking.timeslot_id;
	booking.size = req.body.booking.size;
	booking.save(function(err) {
	  if(err) 
	    res.send(err);
		res.json(booking);
	});
};

module.exports.getBookings = function(req, res) {
	Booking.find(function(err, bookings) {
		if(err)
			res.send(err);
		res.json(bookings);
	})
}