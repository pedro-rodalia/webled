var express = require('express');
var router = express.Router();
var Gpio = require('onoff').Gpio;

var pin = 17;
var led = new Gpio(pin, 'out');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', pin: pin });
});

router.get('/turnOn', function(req, res, next){
  led.write(1, function(err){
    if (err) {
      throw err;
    }
    res.send(200);
  });
});


router.get('/turnOff', function(req, res, next){
  led.write(0, function(err){
    if (err) {
      throw err;
    }
    res.send(200);
  });
});

module.exports = router;
