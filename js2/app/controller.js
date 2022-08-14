

export class Controller{

    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init(){
        const formSelector = '#pBookForm';
        const bookContainerSelector = '#bookItems';
        this.form = document.querySelector(formSelector);
        const bookContainer = document.querySelector(bookContainerSelector);
        const searchInp = document.querySelector('#searchInp');

        this.model.init(formSelector);
        this.view.init(this.form, bookContainer);

        this.form.addEventListener('submit', this.submitHandler)

        window.addEventListener('DOMContentLoaded', this.loadHandler);

        bookContainer.addEventListener('click', this.deleteItemHandler);

        bookContainer.addEventListener('click', this.seeContactInfo);

        bookContainer.addEventListener('click', this.editContact);

        searchInp.addEventListener('input', (event) => {
            const value = event.target.value.trim();
            const bookItems = document.querySelectorAll('.contactWrapper');
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

        this.view.renderContactItem(data.saveData);
        this.model.openSearch();
        this.model.numOfContact();
        this.view.clearForm();
    }

    loadHandler = () => {
        const bookItem = this.model.getData();
        if(!bookItem) return;

        bookItem.forEach(item => this.view.renderContactItem(item));

    }

    deleteItemHandler = event => {
        // console.log(event.target)
        event.stopPropagation();
        if(!event.target.classList.contains('btn-delete')) return;

        const bookContactId = +event.target.closest('[data-todo-id]').getAttribute('data-todo-id');

        this.model.deleteItem(bookContactId);
        this.view.deleteItem(bookContactId);

    }

    seeContactInfo = event =>{
        event.stopPropagation();

        if(!event.target.classList.contains('btn-info')) return;

        const bookContactInfo = +event.target.closest('[data-todo-id]').getAttribute('data-todo-id');

        this.model.seeContact(bookContactInfo);
        this.view.seeContact(bookContactInfo);
    }



    editContact = event => {
        event.stopPropagation();

        if(!event.target.classList.contains('btn-edit')) return;

        const bookContactInfo = +event.target.closest('[data-todo-id]').getAttribute('data-todo-id');

    }


}