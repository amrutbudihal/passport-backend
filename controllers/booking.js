var Listing = require('../models/listing');
var Boat = require('../models/boat');

var compare = function(a,b) {
	console.log("Compare function, a: "+a.remainingSpace+", b:"+b.remainingSpace);
  	if (a.remainingSpace < b.remainingSpace)
		return -1;
	if (a.remainingSpace > b.remainingSpace)
    	return 1;
  	return 0;
}

module.exports.postBookings = function (req, res) {	
	var bookingSize = req.body.booking.size;
	Listing.findById(req.body.booking.timeslot_id, function(err, listing) {
		if(err) 
			throw err;
		if (listing.availability >= bookingSize) {
			listing.customer_count = listing.customer_count + parseInt(bookingSize);
			listing.boatsStateAfterBooking.sort(compare);
			var length = listing.boatsStateAfterBooking.length;
			for(var i=0; i< length; i++) {
				if (bookingSize <= listing.boatsStateAfterBooking[i].remainingSpace) {
					console.log("Found a boat with remaining space:"+listing.boatsStateAfterBooking[i].remainingSpace);
					listing.boatsStateAfterBooking[i].remainingSpace = listing.boatsStateAfterBooking[i].remainingSpace - bookingSize;
					break;
				}
			}
			listing.boatsStateAfterBooking.sort(compare);
			listing.availability = listing.boatsStateAfterBooking[length-1].remainingSpace;
			listing.save(function(err) {
				console.log("Listing saved:"+listing);
				res.sendStatus(204);
			});
		} else {
			console.log('Booking size: '+req.body.booking.size+' exceeds availability: '+listing.availability);
		}
	});
};




