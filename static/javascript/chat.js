var socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('connect', function() {
    socket.emit('connection', {
        msg: 'User Connected',
        user_id: $('.user_id').text(),
    })
    var form = $('.msger-inputarea').on('submit', function(e) {
        e.preventDefault()
        let message = $('input.msger-input').val()
        let user_id = $('.user_id').text()
        let username = $('.username').text()
        const currentDate = new Date();
        socket.emit('my event', {
            message: message,
            date: currentDate.toString(),
            user_id: user_id,
            username: username,
        })
        $('input.msger-input').val('').focus()
        let items = document.querySelectorAll(".msg");
        last = items[items.length - 1];
        last.scrollIntoView();
        if (ref > 0) {
            document.getElementsByClassName('msg').item(ref - 1).focus();
        }
    })
    var inn = $('input.msger-input').on('focus', function(e) {})
})



socket.on('my response', function(msg) {
    if (msg.user_id != $('.user_id').text()) {
        $('.msger-chat').append(`<div class="msg left-msg">
      <div
       class="msg-img"
       style="background-image: url(https://th.bing.com/th/id/OIP.CFYwFDlR1XWX2udq_niNGgHaLH?pid=ImgDet&rs=1)"
      ></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${msg.username}</div>
          <div class="msg-info-time">${msg.date.slice(16,21)}</div>
        </div>

        <div class="msg-text">
        ${msg.message}
        </div>
      </div>
    </div>`);
    } else {
        $('.msger-chat').append(`<div class="msg right-msg">
      <div
       class="msg-img"
       style="background-image: url(https://th.bing.com/th/id/OIP.UGlKxiZQylR3CnJIXSbFIAHaLL?pid=ImgDet&rs=1)"
      ></div>
  
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${msg.username}</div>
          <div class="msg-info-time">${msg.date.slice(16,21)}</div>
        </div>
  
        <div class="msg-text">
        ${msg.message}
        </div>
      </div>
    </div>`);
    }

})


socket.on('userconnect', function(msg) {
    console.log(msg);
})




const api_list_amis = 'https://www.breakingbadapi.com/api/characters';

async function getdata() {
    const response = await fetch(api_list_amis);
    const data = await response.json();
    put(data);
}

function put(data) {
    var sel = document.querySelector('.list-group')
    for (let element of data) {
        sel.innerHTML = sel.innerHTML + `<li class="list-group-item  d-flex p-2  align-items-center "> <img src="https://th.bing.com/th/id/OIP.CFYwFDlR1XWX2udq_niNGgHaLH?pid=ImgDet&rs=1" alt="Avatar" class="avatar ms-2 me-4">
        <div class="col">
            <div class="row">hacker etcih</div>
            <div class="row online">
                Online</div>
        </div>
        </li>`
    }

}

getdata();




async function changegrid() {
    var sel = document.querySelector('.data');
    const response = await fetch(api_list_amis);
    var data = await response.json();
    data = data.filter(checkAdult);
    sel.innerHTML = '';
    for (let element of data) {
        sel.innerHTML = sel.innerHTML + `<li class="list-group-item  d-flex p-2  align-items-center "> <img src="https://th.bing.com/th/id/OIP.CFYwFDlR1XWX2udq_niNGgHaLH?pid=ImgDet&rs=1" alt="Avatar" class="avatar ms-2 me-4">
        <div class="col">
            <div class="row">algeria lageria  alge</div>
            <div class="row online">
                Online</div>
        </div>
        </li>`
    }
}

function checkAdult(car) {
    var _filter = document.querySelector('#exampleInputEmail1').value;
    return car.name.toUpperCase().includes(_filter.toUpperCase());
}