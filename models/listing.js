var mongoose = require('mongoose');

var ListingSchema = mongoose.Schema({
		startTime: Date,
		duration: Number,
		customer_count: {type: Number, "default": 0},
		availability:  {type: Number, "default": 0},
		boats : {type: Array, "default": []},
		boatsStateAfterBooking : {type: Array}
	}
);

ListingSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

ListingSchema.virtual('start_time').get(function(){
    return this.startTime.getTime();
});

ListingSchema.set('toJSON', {virtuals: true});

module.exports =  mongoose.model('Listing', ListingSchema);