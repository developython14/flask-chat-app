


$(function() {
  $('a#calculate').bind('click', function() {
    $.getJSON( '/_add_numbers', {
      a: $('input[name="a"]').val(),
      b: $('input[name="b"]').val()
    }, function(data) {
      $("#result").text(data.result);
    });
    return false;
  });
});



$(function() {
  $('#fliterdata').bind('click', function() {
    $.getJSON( '/words', {
      a: $('input[name="mustapha"]').val(),
    }, function(data) {
      $(".newimg").attr("src", ".."+data.result);
    });
    return false;
  });
});

var socket = io();
socket.on('connect', function() {
    socket.emit('my event', {data: 'I\'m mustapha!'});
    socket.emit('messagebox', {data: 'I\'m mustapha!'});
});


socket.on( 'my response', function( msg ) {
  console.log("raha twli response mustapha");
  console.log( msg );

})