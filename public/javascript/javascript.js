function onReady() {
  var $btnToggle = $('#toggle');
  var $btnPWM = $('#pwm');
  var $btnTimer = $('#timer');
  var $btnCountdown = $('#countdown');
  $("#state").html('off');

  var state = 0;

  $btnToggle.on('click', function(e){
    if(!state){
      $.get('/action/on', function(data){
        console.log(data);
        $("#state").html('on');
        state = 1;
      });
    } else {
      $.get('/action/off', function(data){
        console.log(data);
        $("#state").html('off');
        state = 0;
      });
    }
  });

  $btnPWM.on('click', function(e){
    $.get('/action/pwm/0.5/50', function(data){
      console.log(data);
      $("#state").html('pwm');
    });
  });

  $btnCountdown.on('click', function(e){
    $.get('/action/countdown/5', function(data){
      console.log(data);
      $("#state").html('on');
    });
  });

  $btnTimer.on('click', function(e){
    $.get('/action/timer/5', function(data){
      console.log(data);
      $("#state").html('off');
    });
  });
};

$(document).ready( onReady );
