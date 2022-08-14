export class View{

    constructor() {
        this.form = null;
        this.todoContainer = null;
    }

    creatContactItem(data){
        const wrapperElement = document.createElement('div');
        wrapperElement.classList.add('col-12');
        wrapperElement.setAttribute('data-todo-id', data.id);

        wrapperElement.innerHTML = `
            <div class="contactWrapper mb-2 mt-2 d-flex btn-primary">
            <div class="col-8">
                <div class="photoContact d-none">${data.ava}</div>
                <div class="contactHeading search">${data.name}</div>
                <div class="contactNumber">${data.phone}</div>
                <div class="contactJob">${data.job}</div>   
            </div>
            <div class="col-4 d-flex justify-content-end">
                 <button class="btn-int p-0" data-bs-toggle="modal" data-bs-target="#exampleModal-2"><img  class = "btn-edit" src="../../images/btn-edit.png"></button>
                 <button class="btn-int p-0" data-bs-toggle="modal" data-bs-target="#exampleModal-1"><img  class = "btn-info" src="../../images/btn-info.png"></button>
                 <button class="btn-int p-0"><img  class = "btn-delete" src="../../images/btn-delete.png"></button>
            </div>
        </div>
        `;

        return wrapperElement;
    }

    renderContactItem(data){
        const itemTemplate = this.creatContactItem(data);
        this.todoContainer.append(itemTemplate);
    }

    deleteItem(id){
        document.querySelector(`[data-todo-id="${id}"]`).remove();
    }

    searchItem(value,bookItems,searchRegExp){
        if (value === '') {
            bookItems.forEach((item) => {
                item.classList.remove('hide');
            })
            return;
        }

        bookItems.forEach((item) =>     {
            const innerContact = item.querySelector('.search');
            const itemText = innerContact.textContent;
            const isContainsSearchRequest = searchRegExp.test(itemText);

            if (!isContainsSearchRequest) {
                item.classList.add('hide');
            } else {
                item.classList.remove('hide');
            }
        })
    }

    clearForm(){
        this.form.reset();
    }

    init(formElements, bookContainer){
        this.form = formElements;
        this.todoContainer = bookContainer;

    }



}
