var mongoose = require('mongoose');

var boatSchema = mongoose.Schema({
    name: String,
    capacity: Number
});

module.exports = mongoose.model('Boat', boatSchema);