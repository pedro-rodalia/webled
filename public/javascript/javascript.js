function OnReady() {
  var $btnOn = $('#on');
  var $btnOff = $('#off');
  $btnOn.on('click', function(e){
    $.get('/turnOn', function(data){
      console.log(data);
      $("#state").html('on');
    });
  });
  $btnOff.on('click', function(e){
    $.get('/turnOff', function(data){
      console.log(data);
      $("#state").html('off');
    });
  });
};

$(document).ready( onReady );
