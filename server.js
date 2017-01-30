//server.js

var express = require('express'),
	router = express.Router();
	bodyParser = require('body-parser'),
	app = express(),
	db = require('./scripts/model/PresenceSensor.js'),
	router = express.Router(),
	mongoose = require('mongoose'),
	mongoose.connect('mongodb://localhost:27017/presencesensor'),
//	MongoClient client = new MongoClient("localhost", 27017);
	presenceSensor = {};
	
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', function(req, res) {
  res.send('Hello World')
})


router.route('/sensor')
    //GET all sensor
    .get(function(req, res, next) {
    	mongoose.model('presencesensor').find({}, function (err, distances) {
    		if (err) {
    			return console.error(err);
    		} else {
    			for(var d in distances){
    				if(distances[d].distanceRead < distances[d].distanceStandard){
    					presenceSensor.presence = distances[d];
    				}else{
    					presenceSensor.distance = distances[d];
    				}
    			}
    			res.json(presenceSensor);
    		}
    	});
    })
    
    
    //POST a new blob
    .post(function(req, res) {
    	var date = new Date(),
    		distanceread = req.body.distanceRead,
    		distancestandard = req.body.distanceStandard;
    	console.log(distanceRead);

    	mongoose.model('presencesensor').create({
    		date: date,
    		distanceread: distanceread,
    		distancestandard: distancestandard

    	}, function (err, distance) {
    		if (err) {
    			res.send("There was a problem adding the information to the database.");
    		} else {
    			console.log('POST creating new distance: ' + distance);
    			res.json(distance);
    		}
    	})
    });



//DELETE a presença by ID
router.delete('/sensor/:id', function (req, res){
	mongoose.model('presencesensor').findById(req.body.id , function (err, distance) {
		if (err) {
			return console.error(err);
		} else {
			distance.remove(function (err, distance) {
				if (err) {
					return console.error(err);
				} else {
					console.log('DELETE removing ID: ' + distance._id);
					res.json({message : 'deleted', item : distance});
				}
			});
		}
	});
});


app.use('/presencesensor', router)

	
app.listen(3000, function() {
  console.log('listening on 3000')
})