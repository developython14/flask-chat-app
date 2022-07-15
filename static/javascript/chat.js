


var socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('connect', function() {
    socket.emit( 'my event', {
      data: 'User Connected',
    })
    var form = $( 'form' ).on( 'submit', function( e ) {
      e.preventDefault()
      let user_name = $( 'input#exampleInputEmail1' ).val()
      let user_id = $( '.mus' ).val()
      socket.emit( 'my event', {
        user_name : user_name,
        userid : user_id
      })
      $( 'input#exampleInputEmail1' ).val( '' ).focus()
    })
  })



  socket.on( 'my response', function( msg ) {
    console.log( msg.user_name )
      $( '.list-group' ).append( `<li class="list-group-item" style="background-color: ;">message from  ${ msg['userid']  } ${msg.user_name}</li>`)
  })