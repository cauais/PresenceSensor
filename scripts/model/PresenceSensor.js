//PresenceSensor.js

var mongoose = require('mongoose');  

var PresenceSensor = new mongoose.Schema({
	date: {type: Date, default: Date.now},
	distanceRead: Number,
	distanceStandard: Number,
});

mongoose.model('presencesensor', PresenceSensor);