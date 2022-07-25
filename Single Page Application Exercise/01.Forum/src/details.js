const section = document.getElementById("detailsView");
const postElement = {
  title: document.getElementById("details-title"),
  username: document.getElementById("details-username"),
  time: document.getElementById("details-time"),
  content: document.getElementById("details-content"),
};
const commentsList = document.getElementById("user-comment");
const form = section.querySelector("form");
form.addEventListener("submit", onSubmit);
section.remove();
export function showDetails(ev) {
  let target = ev.target;
  if (target.tagName == "H2") {
    target = target.parentElement;
  }
  if (target.tagName == "A") {
    ev.preventDefault();
    const postId = target.id;
    showPost(postId);
  }
}
async function showPost(postId) {
  document.getElementById("main").replaceChildren("Loading...");
  const [res, commentsRes] = await Promise.all([
    fetch(
      `http://localhost:3030/jsonstore/collections/myboard/posts/` + postId
    ),
    fetch("http://localhost:3030/jsonstore/collections/myboard/comments"),
  ]);
  const [posts, comments] = await Promise.all([res.json(), commentsRes.json()]);
  commentsList.replaceChildren(
    ...Object.values(comments)
      .filter(c=> c.postId == postId)
      .map(createCommentEl)
  );

  form.id = postId;
  postElement.title.textContent = posts.title;
  postElement.username.textContent = posts.username;
  postElement.time.textContent = posts.time;
  postElement.content.textContent = posts.content;
  document.getElementById("main").replaceChildren(section);
}
function createCommentEl(comment) {
    const el = document.createElement("div"); 
    el.className = 'topic-new-wrapper'
    el.innerHTML = `<div class="topic-name">
    <p><strong>${comment.username}</strong> commented on <time>${comment.dateCreated}</time></p>
    <div class="post-content">
        <p>${comment.content}</p>
    </div>
</div>`
return el
}
async function onSubmit(ev) {
  ev.preventDefault();
  const formData = new FormData();
  const username = formData.get("username").trim();
  const content = formData.get("content").trim();
  const postId = form.id;
  try {
    if (username == "" || content == "") {
      throw new Error("All fields are required");
    }
    const res = await fetch(
      "http://localhost:3030/jsonstore/collections/myboard/comments/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          content,
          postId,
          dateCreated: new Date(),
        }),
      }
    );
    if (res.ok != true) {
      const error = await res.json();
      throw new Error(error.message);
    }
    form.reset();
    showPost(postId);
  } catch (err) {
    alert(err.message);
  }
  form.reset();
}
