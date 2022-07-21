'use strict';

function model() {

    return {
        dbName:null,
        setDBName(key){
            if(!key.trim()) throw new Error('Man it is not Possible, db key required');

            this.dbName = key;

        },

        setData(data){
            let response = null;

            try{
                localStorage.setItem(this.dbName, JSON.stringify(data));
                response = {
                    success: true,
                    saveData:data
                }
            }catch (error) {
                response = {
                    success: false,
                    errors:error
                }
            }

            return response;
        },

        init(dbkey){
            this.setDBName(dbkey);
        }

    }
}