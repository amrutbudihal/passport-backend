var mongoose = require('mongoose');

var AssignmentSchema = mongoose.Schema({
	timeslotId: String,
	boatId: String
});

module.exports = mongoose.model('Assignment', AssignmentSchema);