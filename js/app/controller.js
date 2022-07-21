'use strict';

function controller(view, model, payload) {

    const formSelector = '#todoForm';
    const todosContainerSelector = '#todoItems';
    const form = document.querySelector(formSelector)
    const todosContainer = document.querySelector(todosContainerSelector)
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

        const inputs =  form.querySelectorAll('input, textarea');
        const data = model.setData(fetchFormData(inputs));

        if(!data.success) throw new Error('Все очень плохо');

        view.renderTodoItem(data.saveData);
    }

    form.addEventListener('submit', submitHandler)

    return {
    }
}