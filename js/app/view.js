'use strict';

function view() {

    const creatTodoItem = (data) =>{
        const wrapperElement = document.createElement('div');
        wrapperElement.classList.add('col-4');

        wrapperElement.innerHTML = `<div class="taskWrapper">
                <div class="taskHeading">${data.title}</div>
                <div class="taskDescription">${data.description}</div>
            </div>`;

        return wrapperElement
    }

    return {
        form: null,
        todoContainer: null,

        renderTodoItem(data){
            const itemTemplate = creatTodoItem(data);
            this.todoContainer.append(itemTemplate);
        },

        init(formElements, todoContainer){
            this.form = formElements;
            this.todoContainer = todoContainer;
        }

    }
}