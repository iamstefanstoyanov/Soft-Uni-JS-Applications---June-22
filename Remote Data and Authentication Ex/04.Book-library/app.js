//1.get all needed HTML Elements
//2. load button -> add event listener
//3. fetch all books from server and update HTML
//4. add an event on the form submit
//5. POST data for a new book to the server
//6. add event listener for update/delete
//7. implemenet update/delete
 
let loadBookButton  = document.querySelector('#loadBooks')
let url = 'http://localhost:3030/jsonstore/collections/books';
let tbodyElement = document.getElementsByTagName('tbody')[0];
let formElement = document.getElementsByTagName('form')[0];
 
loadBookButton.addEventListener('click', loadBooks)
 
 
formElement.addEventListener('submit', function (e) {
    e.preventDefault()
    //1. get data from form 
    //2. request with POST method, to add new book
})
 
 
async function loadBooks() {
    try {
        let response = await fetch(url);
 
        if(response.status != 200) {
            throw new Error('Problem loading data.')
        }
 
        let data = await response.json();
 
        let entries = Object.entries(data);
        tbodyElement.innerHTML = '';
 
        for (let [key, {author, title}] of entries) {
            let  trElement = document.createElement('tr')
            let titleTDElement = document.createElement('td')
            titleTDElement.textContent = title;
            let authorTDEelement = document.createElement('td');
            authorTDEelement.textContent = author;
 
            trElement.appendChild(titleTDElement)
            trElement.appendChild(authorTDEelement)
 
            let newTdElement = document.createElement('td');
            let editButton = document.createElement('button')
            let deleteButton = document.createElement('button')
            editButton.textContent = 'Edit';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', remove)
            editButton.addEventListener('click', edit)
            newTdElement.appendChild(editButton)
            newTdElement.appendChild(deleteButton)
 
            trElement.appendChild(newTdElement)
            tbodyElement.appendChild(trElement)
 
            function edit(e) {
                //TODO
                //HINT -> PUT REQUEST to server
            }
 
            function remove(e) {
                e.preventDefault()
                fetch(`${url}/${key}`, {
                    method: 'DELETE'
                })
 
                trElement.remove()
            }
        }
 
 
    } catch (error) {
 
    }
}