var mongoose = require('mongoose');

var BookingSchema = mongoose.Schema({
	timeslotId: String, 
	bookingSize: Number
});

module.exports = mongoose.model('Booking', BookingSchema);