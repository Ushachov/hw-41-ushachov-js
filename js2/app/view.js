'use strict';


function view() {

    const creatTodoItem = (data) =>{
        const wrapperElement = document.createElement('div');
        wrapperElement.classList.add('col-12');
        wrapperElement.setAttribute('data-todo-id', data.id);

        wrapperElement.innerHTML = `<div class="taskWrapper mb-2 mt-2 d-flex">
                <div class="col-8 ">
                    <div class="taskHeading search">${data.name}</div>
                    <div class="taskNumber">${data.phone}</div>
                    <div class="taskJob">${data.job}</div>   
       
                </div>
                <div class="col-4 d-flex justify-content-end">
                     <button class="btn p-0 m-0"><img  class = "btn-delete" src="../../images/btn-delete.png"></button>
                </div>
            </div>`;

        return wrapperElement;
    }

    return {
        form: null,
        todoContainer: null,

        renderTodoItem(data){
            const itemTemplate = creatTodoItem(data);
            this.todoContainer.append(itemTemplate);
        },

        deleteItem(id){
            document.querySelector(`[data-todo-id="${id}"]`).remove();
        },

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
                // console.log(innerContact);

                if (!isContainsSearchRequest) {
                    item.classList.add('hide');
                } else {
                    item.classList.remove('hide');
                }
            })
        },


        clearForm(){
            this.form.reset();
        },

        init(formElements, todoContainer){
            this.form = formElements;
            this.todoContainer = todoContainer;
        }

    }
}
