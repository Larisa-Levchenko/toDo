'use strict';

const headerInput = document.querySelector('.header-input'),
    todoControl = document.querySelector('.todo-control'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoDate = [];

const render = function () {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    let json = JSON.stringify(todoDate);
    localStorage.todo = json;

    todoDate.forEach(function (item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class = "text-todo" >' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';
        if (item.completed === false) {
            todoList.prepend(li);
        } else {
            todoCompleted.prepend(li);
        }

        const btnTodoCompleted = li.querySelector('.todo-complete');
        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoCompleted.addEventListener('click', function () {
            item.completed = !item.completed;

            render();
        });
        btnTodoRemove.addEventListener('click', function () {
            todoDate.splice(todoDate.indexOf(item), 1);
            render();
        });
    });

};

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
    if (headerInput.value !== '') {
        const newDate = {
            value: headerInput.value,
            completed: false
        };
        todoDate.push(newDate);
        headerInput.value = '';
        render();
    }

});
if(localStorage.todo!==undefined){
    todoDate = JSON.parse(localStorage.todo);
    render();
}

