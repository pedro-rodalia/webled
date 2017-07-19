var express = require('express');
var router = express.Router();
var Gpio = require('onoff').Gpio;

var pin = 17;
var outputPin = new Gpio(17, 'out');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', pin: pin});
});

// Toggle output pin
router.get('/toggle', function(req, res, next) {
	outputPin.write(0, function(err){if(err){throw err;}});
	res.sendStatus(200);
});

module.exports = router;
