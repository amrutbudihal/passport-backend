var Listing = require('../models/listing');
var Boat = require('../models/boat');

module.exports.postAssignment = function(req, res) {

	req.body.assignment.timeslot_id;
	req.body.assignment.boat_id;
	var listingQuery = {"_id":req.body.assignment.timeslot_id};
	Boat.findOne({"_id":req.body.assignment.boat_id},function(err, boat) {
		if (err) {
			throw err;
		}
		console.log('Found a boat: '+boat);
		Listing.findOne(listingQuery,function(err, listing) {
			if (err) {
				throw err;
			}
			console.log('Found a listing with id: '+listing);

			//1. increase listing capacity.
			if (listing.availability < boat.capacity) {
				listing.availability = boat.capacity 
			}
			//2. insert boat id into the listing.
			listing.boats.push(boat._id);
			
			//3. update the listing.
			Listing.findOneAndUpdate(listingQuery,listing, function(err, listing) {
				if (err) {
					throw err;
				}
				console.log('Updated listing availability: '+listing);
				res.sendStatus(204);
			});
		}); //end listing callback.				
	}); //end boat callback.
};