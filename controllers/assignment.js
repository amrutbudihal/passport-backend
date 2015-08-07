var Assignment = require('../models/assignment');

module.exports.postAssignment = function(req, res) {
	var assignment = new Assignment();
	assignment.timeslotId = req.body.assignment.timeslot_id;
	assignment.boatId = req.body.assignment.boat_id;
	assignment.save(function(err) {
	  if(err) 
	    res.send(err);
		res.json(assignment);
	});
};

module.exports.getAssignments = function(req, res) {
	Assignment.find(function(err, assignments) {
		if(err) 
			res.send(err);
		res.json(assignments);
	});
}