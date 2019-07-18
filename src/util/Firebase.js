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
        if(!window._initializedFirebase){
            firebase.initializeApp(this._config);

            firebase.firestore().settings({})

            window._initializedFirebase = true;
        }
    }

    initAuth(){
        return new Promise((resolve, reject)=>{

            let provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
            firebase.auth().languageCode = 'pt';

            firebase.auth().signInWithPopup(provider)
            .then(result=>{
                let token = result.credential.accessToken;
                let user = result.user;
                resolve({user, token})
            })
            .catch(err=> reject(err))
        });
    }

    static db(){
        return firebase.firestore()
    }

    static hd(){
        return firebase.storage()
    }
}