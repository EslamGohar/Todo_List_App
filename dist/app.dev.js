"use strict";

// Selector
var todoInput = document.querySelector(".todo-input");
var todoButton = document.querySelector(".todo-button");
var todoList = document.querySelector(".todo-list");
var filterOption = document.querySelector(".filter-todo"); // Event Listener

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo); // Functions

function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault(); // Create Todo DIV <div>

  var todoDiv = document.createElement("div");
  todoDiv.classList.add("todo"); // Create List Item <li>

  var newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo); // Add ToDo to LocalStorage

  saveLocalTodos(todoInput.value); // Create Mark Button

  var completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton); // Create Trash Button

  var trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton); // Append To List

  todoList.appendChild(todoDiv); // Clear Todo Input Value

  todoInput.value = "";
} // Delete and Check Item


function deleteCheck(e) {
  var item = e.target; // Delete To-DO item

  if (item.classList[0] === "trash-btn") {
    var _todo = item.parentElement; // Animation

    _todo.classList.add("fall");

    removeLocalTodos(_todo);

    _todo.addEventListener('transitionend', function () {
      _todo.remove();
    });
  } // Check Mark


  if (item.classList[0] === "complete-btn") {
    var _todo2 = item.parentElement;

    _todo2.classList.toggle("completed");
  }
} // Filter To-Do <Select Options>


function filterTodo(e) {
  var todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }

        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }

        break;
    }
  });
} // Save Local Todos in Local Storage on Browser


function saveLocalTodos(todo) {
  // Check --- Do I already have thing in there?
  var todos;

  if (localStorage.getItem('todos') === null) {
    todo = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  var todos;

  if (localStorage.getItem('todos') === null) {
    todo = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function (todo) {
    // Create Todo DIV <div>
    var todoDiv = document.createElement("div");
    todoDiv.classList.add("todo"); // Create LI <li>

    var newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo); // Create Mark Button

    var completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton); // Create Trash Button

    var trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton); // Append To List

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  // Check --- Do I already have thing in there?
  var todos;

  if (localStorage.getItem('todos') === null) {
    todo = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  var todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}