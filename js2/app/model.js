'use strict';

function model() {

    return {
        dbName:null,
        currentId:null,
        setDBName(key){
            if(!key.trim()) throw new Error('Man it is not Possible, db key required');

            this.dbName = key;

        },


        getData(){
            return JSON.parse(localStorage.getItem(this.dbName));
        },

        setData(data){
            let response = null;
            const savedData = this.getData();
            const dataToSave = savedData ? savedData : [];

            data.id = this.currentId;

            dataToSave.push(data);


            try{
                localStorage.setItem(this.dbName, JSON.stringify(dataToSave));
                response = { success: true, saveData:data }
                this.currentId += 1;
            }catch (error) {
                response = {success: false, errors:error}
            }

            return response;
        },


        //Это нужно писать в model или в view если в view то как сделать чтобы работало?
        openSearch(){
            document.querySelector('#searchInp').removeAttribute('disabled');
        },

        numOfContact(){
            document.querySelector('.no-contacts').classList.add("hide");
        },
        //


        deleteItem(id){
            const data = this.getData();
            const updatedData = data.filter(item => item.id !== id);
            if(updatedData.length){
                localStorage.setItem(this.dbName, JSON.stringify(updatedData));

            }else{
                localStorage.removeItem(this.dbName);
                document.querySelector('#searchInp').setAttribute("disabled", "disabled");
                document.querySelector('.no-contacts').classList.remove("hide");
            }
        },



        init(dbkey){
            this.setDBName(dbkey);

            const savedData = this.getData();
            this.currentId = savedData ? savedData[savedData.length-1].id + 1 : 1;
        }

    }
}