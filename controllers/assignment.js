var Listing = require('../models/listing');
var Boat = require('../models/boat');

module.exports.postAssignment = function(req, res) {

	var boat = Boat.findOne({"_id":req.body.assignment.boat_id}, function(err, boat) {
		if (err) {
			throw err;
		}
		//console.log('Found a boat: '+boat);
		Listing.findByIdAndUpdate(req.body.assignment.timeslot_id
			, { $push: { boats: req.body.assignment.boat_id }}
			, { "new" : true, "upsert" : true}
			, function(err, listing) {
			//console.log('Assigned boat: '+listing);
			
			Listing.findByIdAndUpdate(req.body.assignment.timeslot_id
			, { $push: { boatsStateAfterBooking: {
							"id": req.body.assignment.boat_id, 
							"capacity": boat.capacity, 
							"remainingSpace": boat.capacity
						}
					}
				}
			, { "new" : true, "upsert" : true}
			, function(err, listing) {
				
				//console.log('Assigned boatsStateAfterBooking: '+listing);

				Listing.findByIdAndUpdate(req.body.assignment.timeslot_id
				, { $max: { availability: boat.capacity }}
				, { "new" : true, "upsert" : true}
				, function(err, listing) {
					//console.log('Updated listing availability: '+listing);
					res.sendStatus(204);
				});

			});
		});
	});
};