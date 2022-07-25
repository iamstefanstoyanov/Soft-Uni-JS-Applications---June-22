function attachEvents() {
  // add ev list to the buttons
  //create add comment func => get data from inputs
  // po req to the server
  //display comments = > fetch comments
  //display data
  document.querySelector("#refresh").addEventListener("click", displayComments);
  document.querySelector("#submit").addEventListener("click", addComment);
}
let url = "http://localhost:3030/jsonstore/messenger";
function displayComments() {
  fetch(url)
  .then(res => {
    if (res.ok == false) {
      throw new Error("Error");
    }
    return res.json();
  })
  .then(data => {
    let texArea = document.querySelector('#messages');
    let comments = [];
    Object.values(data).forEach(u => comments.push(`${u.author}: ${u.content}`));
    texArea.value = comments.join('\n');
  })
  .catch(err => alert(err.message));
}
function addComment() {
    let authorName = document.querySelector('[name="author"]');
    let content = document.querySelector('[name="content"]');
    if(!authorName.value || !content.value) {
        return
    }
    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author:authorName.value.trim(),
            content:content.value.trim()
        })
    })
    .then(res => {
        if (res.ok == false) {
          throw new Error("Error creating new record");
        }
        return res.json();
      })
      .catch(err =>alert(err))
      authorName.value=''
      content.value=''
      displayComments()
}
attachEvents();
