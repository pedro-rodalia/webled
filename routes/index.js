var express = require('express');
var router = express.Router();
var Gpio = require('onoff').Gpio;

// Pin declaration and setting
var pin = 17;
var outputPin = new Gpio(17, 'out');
var intervalSet = 0;

// Write functions
var turnOn = function(){
  outputPin.write(1, function(err){
    if (err) {throw err;}
  });
}

var turnOff = function(){
  outputPin.write(0, function(err){
    if (err) {throw err;}
  });
}

// pwm function
var pwm = function(f, dc){
  var p = 1/f;
  turnOn();
  setTimeout(function(){turnOff();}, p*dc*10);
}

// countdown function
var countdown = function(time){
  turnOn();
  setTimeout(function(){turnOff();}, time*1000);
}

// Read function

var state = function(){
  return outputPin.read(function(err){
    if (err) {throw err;}
  });
}

// ROUTES

router.use(function(req, res, next){
  if(intervalSet){
    clearInterval(si_id);
    intervalSet = 0;
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', pin: pin});
});

// Toggle output pin
router.get('/action/on', function(req, res, next) {
  turnOff();
  turnOn();
	res.sendStatus(200);
  console.log("Pin " + pin + " state is: " + state());
});

router.get('/action/off', function(req, res, next){
  turnOff();
  res.sendStatus(200);
  console.log("Pin " + pin + " state is: " + state());
});

// Countdown (turn of after t sec)
router.get('/action/countdown/:time', function(req, res, next){
  var time = req.params.time;
  countdown(time);
  res.sendStatus(200);
});

// pwm
router.get('/action/pwm/:freq/:dc', function(req, res, next){
  var freq = req.params.freq;
  var dc = req.params.dc;
  var si_id =setInterval(function(){pwm(freq, dc);}, (1/freq)*1000);
  intervalSet = 1;
  res.sendStatus(200);
});

router.get('/action/timer/:time', function(req, res, next){
  var time = req.params.time;
  turnOn();
  setTimeout(function(){turnOff();}, time);
});

module.exports = router;
