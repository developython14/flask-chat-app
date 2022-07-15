


var socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('connect', function() {
    socket.emit( 'my event', {
      data: 'User Connected',
    })
    var form = $( 'form' ).on( 'submit', function( e ) {
      e.preventDefault()
      let message = $( 'input#exampleInputEmail1' ).val()
      let username = $( '.mus' ).text()
      let colch = $( '.col' ).text()
      socket.emit( 'my event', {
        color:colch,
        message : message,
        username : username
      })
      $( 'input#exampleInputEmail1' ).val( '' ).focus()
    })
  })



  socket.on( 'my response', function( msg ) {
      $( '.list-group' ).append( `<li class="list-group-item" style="background-color:${msg.color} ;">message from  ${ msg.username }  contenant  ${msg.message}</li>`)
  })