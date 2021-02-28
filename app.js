const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const trashButton = document.querySelector('.trash-btn');
const filterOption = document.querySelector('.filter-to-do')

document.addEventListener('DOMContentLoaded', getToDos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterToDo);

function addTodo(event){

    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo);
    //Add to local storage
    saveLocalTodos(todoInput.value)
    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    if (newTodo.innerText) todoList.appendChild(todoDiv);
    else window.alert("Please fill out a to-do item");
    todoInput.value="";
}

function deleteCheck(event) {
    const item = event.target;
    const todo = item.parentElement;

    if (item.classList[0] === 'trash-btn') {
        todo.classList.add('fall');
        removeLocalToDos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
        
    }

    if (item.classList[0] === 'complete-btn') {
        todo.classList.toggle('completed')
    }
}

function filterToDo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(event.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "not-completed":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;       
        }       
            
    })
}

function saveLocalTodos(todo) {
    let todos;
    if(!localStorage.getItem('todos')) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getToDos() {
    let todos;
    if(!localStorage.getItem('todos')) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo);
        //check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML='<i class="fa fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML='<i class="fa fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
    })
}

function removeLocalToDos(todo){
    let todos;
    if(!localStorage.getItem('todos')) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex,1))
}