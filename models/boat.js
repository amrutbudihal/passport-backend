var mongoose = require('mongoose');

var BoatSchema = mongoose.Schema({
    name: String,
    capacity: Number
});

BoatSchema.virtual('id').get(function() {
	return this._id.toHexString();
})

BoatSchema.set('toJSON', {virtuals:true});

module.exports = mongoose.model('Boat', BoatSchema);