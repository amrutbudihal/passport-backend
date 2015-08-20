var Listing = require('../models/listing');
var Boat = require('../models/boat');

var compare = function(a,b) {
	//console.log("Compare function, a: "+a.remainingSpace+", b:"+b.remainingSpace);
  	if (a.remainingSpace < b.remainingSpace)
		return -1;
	if (a.remainingSpace > b.remainingSpace)
    	return 1;
  	return 0;
}

var handleOverlapListingForBoat = function(boatId, listing) {
	//find all the listings with same boat
	console.log("Finding a listing for a boat:"+boatId);
	Listing.find({$and:[{"boats": {$eq: boatId}},{"_id": {$ne: listing._id}}]}, function(err, listings) {
		for(var i=0; i<listings.length; i++) {
			if(doListingsOverlap(listing, listings[i])) {
				//console.log("Found overlapping listing:"+listings[i]);
				//are there any other boats assinged.
				var boatsStateAfterBookingLength = listings[i].boatsStateAfterBooking.length;
				for(var j=0; j<boatsStateAfterBookingLength; j++) {
					if (listings[i].boatsStateAfterBooking[j].id === boatId) {
						listings[i].boatsStateAfterBooking[j].remainingSpace = 0;
					}
				}
				listings[i].boatsStateAfterBooking.sort(compare);
				listings[i].availability = listings[i].boatsStateAfterBooking[boatsStateAfterBookingLength-1].remainingSpace;
				//console.log("Listing saved for boat overlap:"+listings[i]);
				listings[i].save();
			}
		}
	});
}

var doListingsOverlap = function(listing1, listing2) {
	//console.log("Listing 1:"+listing1);
	//console.log("Listing 2:"+listing2);
	var l1start = listing1.startTime.getTime();
  	var l1end = l1start + (listing1.duration*60*1000);
  	var l2start = listing2.startTime.getTime();
  	var l2end = l2start + (listing1.duration*60*1000);
  	//console.log("(l1start < l2start && l2start < l1end)"+(l1start < l2start && l2start < l1end));
  	//console.log("(l1start < l2end && l2end < l1end)"+(l1start < l2end && l2end < l1end));
  	return ((l1start < l2start && l2start < l1end) || (l1start < l2end && l2end < l1end));
}

var updateRemainingSpaceAfterBooking = function(bookingSize, listing) {
	var length = listing.boatsStateAfterBooking.length;
	for(var i=0; i< length; i++) {
		if (bookingSize <= listing.boatsStateAfterBooking[i].remainingSpace) {
			//console.log("Found a boat with remaining space:"+listing.boatsStateAfterBooking[i].remainingSpace);
			listing.boatsStateAfterBooking[i].remainingSpace = listing.boatsStateAfterBooking[i].remainingSpace - bookingSize;
			//check for overlap listings sharing this boat.
			handleOverlapListingForBoat(listing.boatsStateAfterBooking[i].id, listing);
			break;
		}
	}
}

module.exports.postBookings = function (req, res) {	
	var bookingSize = req.body.booking.size;
	Listing.findById(req.body.booking.timeslot_id, function(err, listing) {
		if(err) 
			throw err;
		if (listing.availability >= bookingSize) {
			listing.boatsStateAfterBooking.sort(compare);
			var length = listing.boatsStateAfterBooking.length;
			
			updateRemainingSpaceAfterBooking(bookingSize, listing);
			listing.boatsStateAfterBooking.sort(compare);

			//update the current listing.
			listing.customer_count = listing.customer_count + parseInt(bookingSize);
			listing.availability = listing.boatsStateAfterBooking[length-1].remainingSpace;
			listing.save(function(err) {
				//console.log("Listing saved:"+listing);
				res.sendStatus(204);
			});
		} else {
			console.log('Booking size: '+req.body.booking.size+' exceeds availability: '+listing.availability);
		}
	});
};




