


var socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('connect', function() {
    socket.emit( 'my event', {
      data: 'User Connected',
    })
    var form = $( 'form' ).on( 'submit', function( e ) {
      e.preventDefault()
      let user_name = $( 'input#exampleInputEmail1' ).val()
      socket.emit( 'my event', {
        user_name : user_name,
      })
      $( 'input#exampleInputEmail1' ).val( '' ).focus()
    })
  })



  socket.on( 'my response', function( msg ) {
    console.log( msg )
      $( '.list-group' ).append(  '<li class="list-group-item" style="background-color: red;">message from mustapha ({msg})</li>')
  })