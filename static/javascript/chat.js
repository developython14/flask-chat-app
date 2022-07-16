var socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('connect', function() {
    socket.emit( 'my event', {
      data: 'User Connected',
    })
    var form = $( '.msger-inputarea' ).on( 'submit', function( e ) {
      e.preventDefault()
      let message = $( 'input#exampleInputEmail1' ).val()
      socket.emit( 'my event', {
        color:'red',
        message : message,
        username : "username"
      })
      $( 'input.msger-input' ).val( '' ).focus()
    })
  })



  socket.on( 'my response', function( msg ) {
      $( '.msger-chat' ).append( `<li class="list-group-item" style="background-color:${msg.color} ;">message from  ${ msg.username }  contenant  ${msg.message}</li>`)
  })



 
  