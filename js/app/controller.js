export default class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  init() {
    const formSelector = "#pBookForm";
    const bookContainerSelector = "#bookItems";
    const changeFormSelector = "#changeForm";
    const searchInputSelector = "#searchInp";

    this.form = document.querySelector(formSelector);
    this.bookContainer = document.querySelector(bookContainerSelector);
    this.changeForm = document.querySelector(changeFormSelector);
    this.searchInp = document.querySelector(searchInputSelector);

    this.model.init(formSelector);
    this.view.init(this.form, this.bookContainer);

    window.addEventListener("DOMContentLoaded", this.loadHandler);
    this.form.addEventListener("submit", this.submitHandler);
    this.bookContainer.addEventListener("click", this.deleteItemHandler);
    this.bookContainer.addEventListener("click", this.viewContactHandler);
    this.bookContainer.addEventListener("click", this.changeContactHandler);
    this.changeForm.addEventListener("submit", this.submitFormChanges);

    this.searchInp.addEventListener('input', (event) => {
      const value = event.target.value.trim();
      const bookItems = document.querySelectorAll('.contactWrapper');
      const searchRegExp = new RegExp(value, 'gi');

      this.view.searchItem(value,bookItems,searchRegExp);
    })

  }

  fetchFormData(inputs) {
    let data = inputs;

    if (inputs instanceof NodeList) {
      data = Array.from(inputs);
    }

    return data.reduce((acc, item) => {
      acc[item.name] = item.value;
      return acc;
    }, {});
  }

  submitHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const inputs = this.form.querySelectorAll("input");
    const data = this.model.setData(this.fetchFormData(inputs));

    if (!data.success) throw new Error("Все очень плохо");

    this.view.renderContactItem(data.saveData);
    this.model.openSearch();
    this.model.numOfContact();
    this.view.clearForm();
  };

  loadHandler = () => {
    const bookItem = this.model.getData();
    if (!bookItem) return;

    bookItem.forEach((item) => this.view.renderContactItem(item));
  };

  deleteItemHandler = (event) => {
    event.stopPropagation();
    if (!event.target.classList.contains("btn-delete")) return;

    const bookContactId = +event.target
        .closest("[data-todo-id]")
        .getAttribute("data-todo-id");

    this.model.deleteItem(bookContactId);
    this.view.deleteItem(bookContactId);
  };

  viewContactHandler = (event) => {
    event.stopPropagation();

    if (!event.target.classList.contains("btn-info")) return;

    const bookContactId = +event.target
        .closest("[data-todo-id]")
        .getAttribute("data-todo-id");

    this.model.viewContact(bookContactId);
    this.view.viewContact(bookContactId);
  };

  changeContactHandler = (event) => {
    event.stopPropagation();

    if (!event.target.classList.contains("btn-edit")) return;

    const id = event.target
        .closest("[data-todo-id]")
        .getAttribute("data-todo-id");

    const contact = this.model.getData().filter(item => item.id === +id)[0];

    const inputs = this.changeForm.querySelectorAll("input");

    inputs.forEach(input => {
      input.value = contact[input.name];
    });

    this.changeForm.setAttribute("id", id);

  };

  submitFormChanges = (event) => {
    // event.preventDefault();
    event.stopPropagation();

    const inputs = this.changeForm.querySelectorAll("input");
    const data = this.fetchFormData(inputs);

    data.id = +this.changeForm.getAttribute("id")

    this.model.setChangeTodo(data);
    this.deleteItemHandler();
    this.model.getData().forEach(item => this.view.renderContactItem(item))
  }


}
