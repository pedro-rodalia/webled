var express = require('express');
var router = express.Router();
var Gpio = require('onoff').Gpio;

// Pin declaration and setting
var pin = 17;
var outputPin = new Gpio(17, 'out');

// Write functions
var turnOn = function(pin){
  pin.write(1, function(err){
    if (err) {throw err;}
  });
}

var turnOff = function(pin){
  pin.write(0, function(err){
    if (err) {throw err;}
  });
}

// pwm function
var pwm = function(f, dc, pin){
  var p = 1/f;
  turnOn(pin);
  sleep(p*dc/100);
  turnOff(pin);
  sleep(p*(1-dc/100));
}

// Read function

var state = function(pin){
  return pin.read(function(err){
    if (err) {throw err;}
  });
}

// ROUTES

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', pin: pin});
});

// Toggle output pin
router.get('/action/on', function(req, res, next) {
  turnOff(pin);
  turnOn(pin);
	res.sendStatus(200);
  console.log("Pin " + pin " state is: " + state(pin));
});

router.get('/action/off', function(req, res, next){
  turnOff(pin);
  res.sendStatus(200);
  console.log("Pin " + pin " state is: " + state(pin));
});

router.get('/action/timer/:time', function(req, res, next){
  turnOff(pin);
  var time = req.params.time;
  setTimeout(turnOn(pin), time);
  res.sendStatus(200);
  console.log("Pin " + pin " state is: " + state(pin));
});

router.get('/action/countdown/:time', function(req, res, next){
  turnOff(pin);
  var time = req.params.time;
  res.sendStatus(200);
  turnOn(pin);
  console.log("Pin " + pin " state is: " + state(pin));
  sleep(time);
  turnOff(pin);
  console.log("Pin " + pin " state is: " + state(pin));
});

router.get('/action/pwm/:freq/:dc', function(req, res, next){
  turnOff(pin);
  var freq = req.params.freq;
  var dc = req.params.dc;
  res.sendStatus(200);
  setInterval(pwm(freq, dc, pin));
});

module.exports = router;
