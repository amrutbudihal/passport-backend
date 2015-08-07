var mongoose = require('mongoose');

var ListingSchema = mongoose.Schema({
	startTime: Date,
	duration: Number
}
);

ListingSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

ListingSchema.set('toJSON', {virtuals: true});

module.exports =  mongoose.model('Listing', ListingSchema);