var socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('connect', function() {
    socket.emit( 'my event', {
      data: 'User Connected',
    })
    var form = $( '.msger-inputarea' ).on( 'submit', function( e ) {
      e.preventDefault()
      let message = $( 'input.msger-input' ).val()
      socket.emit( 'my event', {
        color:'red',
        message : message,
        username : "username"
      })
      $( 'input.msger-input' ).val( '' ).focus()
    })
  })



  socket.on( 'my response', function( msg ) {
      $( '.msger-chat' ).append( `<div class="msg left-msg">
      <div
       class="msg-img"
       style="background-image: url(https://image.flaticon.com/icons/svg/327/327779.svg)"
      ></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">BOT</div>
          <div class="msg-info-time">12:45</div>
        </div>

        <div class="msg-text">
        ${msg.message}
        </div>
      </div>
    </div>`);
    $( '.msger-chat' ).append(`<div class="msg right-msg">
    <div
     class="msg-img"
     style="background-image: url(https://image.flaticon.com/icons/svg/145/145867.svg)"
    ></div>

    <div class="msg-bubble">
      <div class="msg-info">
        <div class="msg-info-name">Sajad</div>
        <div class="msg-info-time">12:46</div>
      </div>

      <div class="msg-text">
      ${msg.message}
      </div>
    </div>
  </div>`);
  })



 
  