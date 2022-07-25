function attachEvents() {
  document.querySelector("#btnLoad").addEventListener('click', load);
  document.querySelector("#btnCreate").addEventListener('click', create);
  document.querySelector("#phonebook").addEventListener('click', remove);
}
let phonebook = document.querySelector('#phonebook');
let url = 'http://localhost:3030/jsonstore/phonebook';
function load() {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      phonebook.replaceChildren();
      Object.values(data).forEach(p=>{
        let liEl = document.createElement('li');
        liEl.textContent =`${p.person}: ${p.phone}`;
        let buttonDel = document.createElement('button');
        buttonDel.textContent = 'delete'
        buttonDel.setAttribute('id', p._id);

        liEl.appendChild(buttonDel);
        phonebook.appendChild(liEl);
      })
    });
}
function create() {
    let name = document.querySelector('#person')
    let number = document.querySelector('#phone')
    if(!name.value || !number.value) {
        return
    }
    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            person:name.value.trim(),
            phone:number.value.trim()
        })
    })
    .then(res => res.json())
    .catch(err => alert(err.message));
    name.value = ''
    phone.value = ''
}
function remove(e) {
let currentId = e.target.id
if(e.target.textContent=='Delete'){
    fetch(`${url}/${currentId}`,{
        method: 'DELETE'
    })
    .then(res => {
        load()
        return res.json()
    })
    .catch(err => alert(err.message))
}
}
attachEvents();
