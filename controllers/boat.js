var Boat = require('../models/boat');

module.exports.postBoat = function(req, res) {
	var boat = new Boat();
	boat.name = req.body.boat.name;
	boat.capacity = req.body.boat.capacity;
	boat.save(function(err) {
	  if(err) 
	    res.send(err);
	  res.json(boat);
	})
}

module.exports.getBoats = function(req, res) {
	Boat.find(function(err, boats) {
	  if (err) 
	    return res.send(err);
	  res.json(boats);
	});
}