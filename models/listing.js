var mongoose = require('mongoose');

var listingSchema = mongoose.Schema({
	startTime: Date,
	duration: Number
}
);

module.exports =  mongoose.model('Listing', listingSchema);