


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
    $('#exampleInputEmail1').bind('click', function() {
    let user_name = $( 'input#exampleInputEmail1' ).val()
    socket.emit('messagebox', user_name);
    $( 'input#exampleInputEmail1' ).val( '3awed kteb' ).focus()
    });

   
});


socket.on( 'my response', function( msg ) {
  console.log("raha twli response mustapha");
  console.log( msg );

})


socket.on( 'message draw', function( msg ) {
  console.log( msg );

})
