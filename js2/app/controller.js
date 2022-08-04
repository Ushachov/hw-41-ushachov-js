'use strict';

function controller(view, model, payload) {

    const formSelector = '#todoForm';
    const todosContainerSelector = '#todoItems';
    const form = document.querySelector(formSelector)
    const todosContainer = document.querySelector(todosContainerSelector)
    const searchInp = document.querySelector('#searchInp');


    model.init(formSelector);
    view.init(form, todosContainer);


    const fetchFormData = inputs => {
        let data = inputs;


        if(inputs instanceof NodeList){
            data = Array.from(inputs);
        }

        return data.reduce((acc,item) => {
            acc[item.name] = item.value;
            return acc;
        }, {})
    }

    const submitHandler = event => {
        event.preventDefault();
        event.stopPropagation();

        const inputs =  form.querySelectorAll('input');
        const data = model.setData(fetchFormData(inputs));

        if(!data.success) throw new Error('Все очень плохо');

        view.renderTodoItem(data.saveData);
        model.openSearch();
        model.numOfContact();
        view.clearForm();
    }

    const loadHandler = () => {
        const todoItem = model.getData();
        if(!todoItem) return;

        todoItem.forEach(item => view.renderTodoItem(item));

    }

    const deleteItemHandler = event => {
        event.stopPropagation();
        if(!event.target.classList.contains('btn-delete')) return;

        const todoId = +event.target.closest('[data-todo-id]').getAttribute('data-todo-id');

        model.deleteItem(todoId);
        view.deleteItem(todoId);

    }

    form.addEventListener('submit', submitHandler)
    window.addEventListener('DOMContentLoaded', loadHandler);
    todosContainer.addEventListener('click', deleteItemHandler);


    searchInp.addEventListener('input', (event) => {
        const value = event.target.value.trim();
        const bookItems = document.querySelectorAll('.taskWrapper');
        const searchRegExp = new RegExp(value, 'gi');

        view.searchItem(value,bookItems,searchRegExp);

    })

    return {}
}