var Listing = require('../models/listing');
var Boat = require('../models/boat');

module.exports.postBookings = function (req, res) {	
	Listing.findOne({"_id":req.body.booking.timeslot_id}, function(err, listing) {
		if(err) 
			throw err;
		listing.customer_count = listing.customer_count + req.body.booking.size;
		Listing.findOneAndUpdate({"_id":req.body.booking.timeslot_id}, listing, function(err) {
			if(err) throw err;
			res.sendStatus(204);
		});
	});
};




