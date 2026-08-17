const addTodoButton = document.getElementById('add-todo');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

addTodoButton.addEventListener('click', addTodo);

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText !== '') {
    const listItem = document.createElement('li');
    listItem.textContent = todoText;
    todoList.appendChild(listItem);
    todoInput.value = '';
  }
}   