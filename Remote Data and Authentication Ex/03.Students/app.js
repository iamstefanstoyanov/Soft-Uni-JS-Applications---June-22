let url = 'http://localhost:3030/jsonstore/collections/students';
let table = document.querySelector('#results tbody');
let form = document.querySelector('form');

window.addEventListener('load', loadStudents);
form.addEventListener('submit', addStudent);
async function addStudent(e) {
  e.preventDefault();
  let dataForm = new FormData(form);
  let info = [...dataForm.values()];
  let gradeNum = Number(info[3].trim());
  table.replaceChildren();
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: info[0],
        lastName: info[1],
        facultyNumber: info[2],
        grade: gradeNum
      })
    })
    if (response.ok == false) {
      throw new Error('Cant create new record');
    }
    loadStudents()
  } catch (error) {
    alert(error.message)
  }
}
async function loadStudents() {
  try {
    let response = await fetch(url);
    if (response.status != 200) {
      throw new Error('Cant fetch data');
    }
    let data = await response.json();
    Object.values(data).forEach((r) => {
      let student = createEl(
        'tr',
        createEl('td', r.firstName),
        createEl('td', r.lastName),
        createEl('td', r.facultyNumber),
        createEl('td', r.grade)
      );
      table.appendChild(student);
    });
  } catch (error) {
    alert(error.message);
  }
}
function createEl(type, ...content) {
  let el = document.createElement(type);
  content.forEach((c) => {
    if (typeof c === 'number' || typeof c == 'string') {
      c = document.createTextNode(c);
    }
    el.appendChild(c);
  });
  return el;
}
