

export class Controller{

    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init(){
        const formSelector = '#todoForm';
        const todosContainerSelector = '#todoItems';
        this.form = document.querySelector(formSelector);
        const todosContainer = document.querySelector(todosContainerSelector);
        const searchInp = document.querySelector('#searchInp');

        this.model.init(formSelector);
        this.view.init(this.form, todosContainer);

        this.form.addEventListener('submit', this.submitHandler)
        window.addEventListener('DOMContentLoaded', this.loadHandler);
        todosContainer.addEventListener('click', this.deleteItemHandler);


        searchInp.addEventListener('input', (event) => {
            const value = event.target.value.trim();
            const bookItems = document.querySelectorAll('.taskWrapper');
            const searchRegExp = new RegExp(value, 'gi');

            this.view.searchItem(value,bookItems,searchRegExp);

        })
    }


    fetchFormData(inputs){
        let data = inputs;


        if(inputs instanceof NodeList){
            data = Array.from(inputs);
        }

        return data.reduce((acc,item) => {
            acc[item.name] = item.value;
            return acc;
        }, {})
    }

    submitHandler = event => {
        event.preventDefault();
        event.stopPropagation();

        const inputs = this.form.querySelectorAll('input');
        const data = this.model.setData(this.fetchFormData(inputs));

        if(!data.success) throw new Error('Все очень плохо');

        this.view.renderTodoItem(data.saveData);
        this.model.openSearch();
        this.model.numOfContact();
        this.view.clearForm();
    }

    loadHandler = () => {
        const todoItem = this.model.getData();
        if(!todoItem) return;

        todoItem.forEach(item => this.view.renderTodoItem(item));

    }

    deleteItemHandler = event => {
        event.stopPropagation();
        if(!event.target.classList.contains('btn-delete')) return;

        const todoId = +event.target.closest('[data-todo-id]').getAttribute('data-todo-id');

        this.model.deleteItem(todoId);
        this.view.deleteItem(todoId);

    }


}