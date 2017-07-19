var express = require('express');
var router = express.Router();

// Toggle output pin
router.get('/', function(req, res, next) {
	var status = outputPin.read();
	if(status = 0){
		outputPin.write(1);
	} else {
		outputPin.write(0);
	}
});

module.exports = router;
