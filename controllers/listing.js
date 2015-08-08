var Listing = require('../models/listing');

module.exports.getListingsByDate = function(req, res) {
	var startTime = new Date(req.query.date);
	var endTime = new Date(startTime);
	endTime.setDate(endTime.getDate()+1);

	Listing.find({"startTime": {"$gte": startTime, "$lt": endTime}}, function(err, listings) {
		if(err) 
			res.send(err);
		res.json(listings);
	});
};

module.exports.postListing = function(req, res) {
	var listing = Listing();
	listing.startTime = new Date(req.body.timeslot.start_time*1000);
	listing.duration  = req.body.timeslot.duration;
	listing.save(function(err) {
		if(err) 
			res.send(err);
		res.json(listing);
	});
};