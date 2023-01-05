const form = document.getElementById("form");
const listUl = document.getElementById("listUl");
const name = document.getElementById("name");
const searchInput = document.getElementById("searchInput");
const anounce = new SpeechSynthesisUtterance();

let todos = [];

getRecentTodos();

form.addEventListener("submit", addToDo);

searchInput.addEventListener("input", search);

// FETCHING RECENT TODOS

function getRecentTodos() {
  storageTodos = JSON.parse(localStorage.getItem("sentTodos"));

  if (!storageTodos) {
    storageTodos = ["Task 1", "Task 2"];
  }

  for (let i = 0; i < storageTodos.length; i++) {
    const element = storageTodos[i];

    if (element !== null) {
      const item = document.createElement("li");

      item.innerHTML = `<h3>${element}</h3>`;

      const btn = document.createElement("button");
      btn.className = `delete ${i}`;
      btn.appendChild(document.createTextNode("X"));
      item.appendChild(btn);

      listUl.appendChild(item);
      todos.push(element);
    }
  }

  // todos = todos.concat(storageTodos);
}

if (todos.length > 7) {
  anounce.text = "Seems like you have a lot of work to do";
  window.speechSynthesis.speak(anounce);
}

// ADD AND DISPLAY NEW TODOS

function addToDo(e) {
  e.preventDefault();

  const todoText = name.value;

  // array me item push
  todos.push(todoText);

  // sending array to local storage
  const arr = JSON.stringify(todos);

  localStorage.setItem("sentTodos", arr);

  anounce.text = `${todoText} added`;
  window.speechSynthesis.speak(anounce);
  displayToDo(todoText);
}

function displayToDo(todo) {
  const newItem = document.createElement("li");
  let storageTodos = JSON.parse(localStorage.getItem("sentTodos"));

  newItem.innerHTML = `<h3>${storageTodos[storageTodos.length - 1]}</h3>
  <button class="delete ${storageTodos.length - 1}">X</button>`;
  listUl.appendChild(newItem);

  document.getElementById("name").value = "";
  if (todos.length > 7) {
    anounce.text = "Seems like you have a lot of work to do";
    window.speechSynthesis.speak(anounce);
  }
}

// REMOVE A TODO

listUl.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    const li = e.target.parentElement;
    listUl.removeChild(li);

    let storageTodos1 = JSON.parse(localStorage.getItem("sentTodos"));

    todos = storageTodos1;

    for (let i = 0; i < storageTodos1.length; i++) {
      if (e.target.classList.contains(i)) {
        anounce.text = `${todos[i]} removed`;
        window.speechSynthesis.speak(anounce);
        delete todos[i];
      }
    }
    const arr1 = JSON.stringify(todos);
    localStorage.setItem("sentTodos", arr1);
  }
});

// SEARCH FUNCTION

function search(e) {
  const searchText = e.target.value.toLowerCase();

  const liTodos = listUl.getElementsByTagName("li");

  Array.from(liTodos).forEach(function (todo) {
    const todoName = todo.firstChild.textContent;

    if (todoName.toLowerCase().indexOf(searchText) != -1) {
      todo.style.display = "block";
    } else {
      todo.style.display = "none";
    }
  });
}
