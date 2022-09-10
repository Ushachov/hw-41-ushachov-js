export default class Model {
  constructor() {
    this.dbName = null;
    this.currentId = null;
  }

  setDBName(key) {
    if (!key.trim()) throw new Error("Man it is not Possible, db key required");

    this.dbName = key;
  }

  getData() {
    return JSON.parse(localStorage.getItem(this.dbName));
  }

  setData(data) {
    let response = null;
    const savedData = this.getData();
    const dataToSave = savedData ? savedData : [];

    data.id = this.currentId;


    dataToSave.push(data);

    try {
      localStorage.setItem(this.dbName, JSON.stringify(dataToSave));
      response = { success: true, saveData: data };
      this.currentId += 1;
    } catch (error) {
      response = { success: false, errors: error };
    }

    return response;
  }

  openSearch() {
    document.querySelector("#searchInp").removeAttribute("disabled");
  }

  numOfContact() {
    document.querySelector(".no-contacts").classList.add("hide");
  }

  deleteItem(id) {
    const data = this.getData();
    const updatedData = data.filter((item) => item.id !== id);

    if (updatedData.length) {
      localStorage.setItem(this.dbName, JSON.stringify(updatedData));
    } else {
      localStorage.removeItem(this.dbName);
      document.querySelector("#searchInp").setAttribute("disabled", "disabled");
      document.querySelector(".no-contacts").classList.remove("hide");
    }
  }

  viewContact(id) {
    const data = this.getData();
    const callContact = document.querySelector(".callContact_info");
    const nameContact = document.querySelector(".name_info");
    const phoneContact = document.querySelector(".phone_info");
    const jobContact = document.querySelector(".job_info");

    for (let item of data) {
      if (item.id === id) {
        callContact.href = `tel:${item.phone}`;
        nameContact.innerText = `${item.name}`;
        phoneContact.innerText = `${item.phone}`;
        jobContact.innerText = `${item.job}`;
      }
    }
  }

  setChangeTodo(contact){
    const newData = this.getData().filter(item => item.id !== +contact.id);
    newData.push(contact);
    localStorage.setItem(this.dbName,JSON.stringify(newData));
  }

  init(dbkey) {
    this.setDBName(dbkey);

    const savedData = this.getData();
    this.currentId = savedData ? savedData[savedData.length - 1].id + 1 : 1;

    if (!savedData) {
      document.querySelector(".no-contacts").classList.remove("hide");
    } else {
      document.querySelector(".no-contacts").classList.add("hide");
      this.openSearch();
    }
  }
}
