const username = document.querySelector('.username');
const usernameWrapper = document.querySelector('.usernameWrapper');
const header = document.querySelector('#header');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
let todos = JSON.parse(localStorage.getItem('todos')) || [];
const LOCAL_STORAGE_KEY = 'todos';

function checkUsername() {
    const checkName = window.localStorage.getItem('username');
    if (checkName) {
        usernameWrapper.style.display = 'none';
        header.innerHTML = `<h1> ${checkName}의 Todo List</h1><button type="button" onclick="resetUsername()">초기화</button>`;
    } else {
        usernameWrapper.style.display = 'flex';
        header.innerHTML = '';
    }
    paintTodo();
}

checkUsername();

function setUsername() {
    const name = username.value;
    window.localStorage.setItem('username', name);
    username.value = '';
    checkUsername();
}

function resetUsername() {
    window.localStorage.removeItem('username');
    console.log('username 초기화');
    checkUsername();
}

function submitAddTodo(event) {
    event.preventDefault();

    const contentInput = document.getElementById('content');
    const content = contentInput.value;

    if (content.trim()) {
        const newTodo = {
            text: content,
            id: Date.now(),
        };

        todos.push(newTodo);

        saveTodos();

        paintTodo();

        contentInput.value = '';
    }
}

function deleteTodo(event) {
    const li = event.target.parentElement;
    const id = parseInt(li.getAttribute('data-id'));

    todos = todos.filter((todo) => todo.id !== id);

    li.remove();

    saveTodos();
}

function saveTodos() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
}

function paintTodo() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.forEach((todo) => {
        paintTodoSingle(todo);
    });
}

function paintTodoSingle(todo) {
    const todoItem = document.createElement('li');
    todoItem.setAttribute('data-id', todo.id);

    const todoText = document.createElement('span');
    todoText.innerText = todo.text;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = '삭제';
    deleteButton.addEventListener('click', deleteTodo);

    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
}

const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
if (storedTodos !== null) {
    const parsedTodos = JSON.parse(storedTodos);
    todos = parsedTodos;
    paintTodo();
}

todoForm.addEventListener('submit', submitAddTodo);
