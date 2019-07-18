const firebase = require('firebase')
require('firebase/firestore')
export class Firebase{
    constructor(){

        this._config = {
            apiKey: "AIzaSyDBLf89VfbTA2Hc5kL9KDfMaur3NZJL-Z8",
            authDomain: "whatsapp-clone-26dd9.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-26dd9.firebaseio.com",
            projectId: "whatsapp-clone-26dd9",
            storageBucket: "",
            messagingSenderId: "677559179969",
            appId: "1:677559179969:web:206c9ca160bcfde1"
        }
        this.init()
    }
    
    init(){
        if(!this._initialized){
            firebase.initializeApp(this._config);

            firebase.firestore().settings({})

            this._initialized = true;
        }
    }

    static db(){
        return firebase.firestore()
    }

    static hd(){
        return firebase.storage()
    }
}