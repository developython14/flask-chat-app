


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





var socket = io();
socket.on('connect', function() {
    $('#fliterdata').bind('click', function() {
    let user_name = $( 'input#exampleInputEmail1' ).val()
    socket.emit('messagebox', user_name);
    $( 'input#exampleInputEmail1' ).val( '3awed kteb' ).focus()
    });

   
});


socket.on( 'my response', function( msg ) {
  console.log("user connected suuceffly");
  console.log( msg );

})


socket.on( 'message draw', function( msg ) {
  let frame = document.querySelector('.list-group');
  frame.innerHTML = frame.innerHTML + 'mustapha you are bigger';
  console.log( msg );
})
