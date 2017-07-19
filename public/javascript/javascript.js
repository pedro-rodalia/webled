function onReady() {
  var $btnToggle = $('#toggle');
  var $btnOff = $('#off');
  $btnToggle.on('click', function(e){
    $.get('/toggle', function(data){
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
