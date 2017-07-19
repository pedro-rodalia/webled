var express = require('express');
var router = express.Router();
var Gpio = require('onoff').Gpio;
var moment = require('moment');

var now = moment();
var pin = 17;
var outputPin = new Gpio(pin, 'out');

// middleware that sets the pin to '0' before any button is pressed
router.use(function resetOutputPin(req, res, next){
    outputPin.write(0);
});

// Toggle funcion 
router.get('/toggle', function(req, res, next){
    var state = outputPin.read();
    switch (state) {
      case 0:
        outputPin.write(1);
        console.log("Output pin value = " + outputPin.read());
        break;
      case 1:
        outputPin.write(0);
        console.log("Output pin value = " + outputPin.read());
      default:
        outputPin.write(0);
    }
});
