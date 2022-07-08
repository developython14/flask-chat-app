const api_url = 'https://www.breakingbadapi.com/api/characters' ; 


async function getdata() {
    const response = await fetch(api_url);
    const data = await response.json();
    put(data);
}

function put(data){
    var sel = document.querySelector('.data')
    for (let element of data) {
        sel.innerHTML = sel.innerHTML+  `<div class="card" style="width: 18rem;">
        <img src="${element.img}" class="card-img-top" alt="image not appear">
        <div class="card-body">
          <h5 class="card-title">${element.name}</h5>
          <h5 class="card-title">${element.nickname}</h5>
        </div>
      </div>`
    }
}



async function changegrid() {
    var _filter = document.querySelector('#exampleInputEmail1');
    var sel = document.querySelector('.data');
    const response = await fetch(api_url);
    const data = await response.json();
    data = data.filter(checkAdult(_filter));
    sel.innerHTML = '';
    for (let element of data) {
        sel.innerHTML = sel.innerHTML+  `<div class="card" style="width: 18rem;">
        <img src="${element.img}" class="card-img-top" alt="image not appear">
        <div class="card-body">
          <h5 class="card-title">${element.name}</h5>
          <h5 class="card-title">${element.nickname}</h5>
        </div>
      </div>`
    }
}

function checkAdult(carch,par) {
    return carch.name >= par;
  }


getdata();