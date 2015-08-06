var Listing = require('../models/listing');

module.exports.getListingsByDate = function(req, res) {
	//@Todo: returns all the listings, change this to return by date.
	Listing.find(function(err, listings) {
		console.log('Finding listings for date:'+req.query.date);
		if(err) 
			res.send(err);
		res.json(listings);
	});
};

module.exports.postListing = function(req, res) {
	var listing = Listing();
	console.log('Received a listing with start date:'+req.body.timeslot.start_time+'and duration of:'+req.body.timeslot.duration);
	//@todo: Translation needed for start_time from timestamp to date.
	listing.startTime = req.body.timeslot.start_time;
	listing.duration  = req.body.timeslot.duration;
	console.log('Listing object with start date:'+listing.startTime+' and duration of:'+listing.duration);
	listing.save(function(err) {
		if(err) 
			res.send(err);
		res.json(listing);
	});
};