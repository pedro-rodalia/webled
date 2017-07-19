function onReady() {
  var $btnToggle = $('#toggle');
  var $btnPWM = $('#pwm');
  var $btnTimer = $('#timer');



  $btnToggle.on('click', function(e){
    $.get('/toggle', function(data){
      console.log(data);
      $("#state").html('on');
    });
  });

  $btnPWM.on('click', function(e){
    $.get('/pwm', function(data){
      console.log(data);
      $("#state").html('on');
    });
  });

  $btnCountdown.on('click', function(e){
    $.get('/countdown', function(data){
      console.log(data);
      $("#state").html('on');
    });
  });
};

$(document).ready( onReady );
