var socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('connect', function() {
    socket.emit( 'connection', {
      msg: 'User Connected',
      user_id:$( '.user_id' ).text(),
    })
    var form = $( '.msger-inputarea' ).on( 'submit', function( e ) {
      e.preventDefault()
      let message = $( 'input.msger-input' ).val()
      let user_id =  $( '.user_id' ).text()
      const currentDate = new Date();
      socket.emit( 'my event', {
        message : message,
        date : currentDate.toString(),
        user_id :user_id
      })
      $( 'input.msger-input' ).val( '' ).focus()
    })
    var inn = $( 'input.msger-input' ).on( 'focus', function( e ) {
      console.log('rah ykteb');
            })
  })



  socket.on( 'my response', function( msg ) {
        if (msg.user_id != $( '.user_id' ).text()){
      $( '.msger-chat' ).append( `<div class="msg left-msg">
      <div
       class="msg-img"
       style="background-image: url(https://th.bing.com/th/id/OIP.CFYwFDlR1XWX2udq_niNGgHaLH?pid=ImgDet&rs=1)"
      ></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">BOT</div>
          <div class="msg-info-time">${msg.date.slice(16,21)}</div>
        </div>

        <div class="msg-text">
        ${msg.message}
        </div>
      </div>
    </div>`);
    }
    else {     
      $( '.msger-chat' ).append(`<div class="msg right-msg">
      <div
       class="msg-img"
       style="background-image: url(https://th.bing.com/th/id/OIP.UGlKxiZQylR3CnJIXSbFIAHaLL?pid=ImgDet&rs=1)"
      ></div>
  
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">Sajad</div>
          <div class="msg-info-time">${msg.date.slice(16,21)}</div>
        </div>
  
        <div class="msg-text">
        ${msg.message}
        </div>
      </div>
    </div>`);}
 
  })


  socket.on( 'userconnect', function( msg ) {
    console.log(msg);
})


 
  