var express = require('express');
var router = express.Router();
var Gpio = require('onoff').Gpio;

var outputPin = new Gpio(17, 'out');

// turn on and off the led
router.get('/toggle', function(req, res, next){
  if (led.read()){
    led.write(0, function(err){
      if (err) {
        throw err;
      }
      res.sendStatus(200);
    });
  } else {
    led.write(1, function(err){
      if (err) {
        throw err;
      }
      res.sendStatus(200);
    });
  }
});

// turn on the led for 'time' seconds
router.get('/turnOn/:time', function(req, res, next){
  var time = req.params.time;
  led.write(0, function(err){
    if(err){throw err;}
    res.sendStatus(200);
  });
  setTimeout(function(){
    led.write(0, function(err){
      if(err){throw err;}
      res.sendStatus(200);
    });
  }, time);
});

// turn on and of the led with freq and duty cycle
router.get('/turnOn/:freq/:dc', function(req, res, next){
  var freq    = req.params.freq;
  var period  = 1/freq;
  var dc      = req.params.dc;
  var iv = setInterval(function(){
    led.write(1, function(err){
      if(err){throw err;}
    });
    sleep(period*(dc/100));
    led.write(0, function(err){
      if(err){throw err;}
    });
    sleep(period*((100-dc)/100));
  }, period );
});


router.get('/turnOn/:timeTo', function(req, res, next){
  // Waiting for moment.js
});

module.exports = router;
