import {Firebase} from '../util/Firebase'
import { Model } from './Model';

export class User extends Model{

    constructor(id){
        super()
        if(id){
            this.getById(id)
        }
    }

    get name(){return this._data.name;}
    set name(value){this._data.name = value}
    
    get email(){return this._data.email;}
    set email(value){this._data.email = value}
    
    get photo(){return this._data.photo;}
    set photo(value){this._data.photo = value}

    getById(id){
        return new Promise((resolve, reject)=>{
            User.findByEmail(id).onSnapshot(doc => {
                this.fromJSON(doc.data())
                resolve(doc)
            })
        })
    }

    save(){
        return User.findByEmail(this.email).set(this.toJSON())
    }

    addContact(contact){
        return User.getRef()
                .doc(this.email)
                .collection('contacts')
                .doc(btoa(contact.email))
                .set(contact.toJSON())
    }

    static getRef(){
        return Firebase.db().collection('/users')
    }

    static findByEmail(email){
        return User.getRef().doc(email)
    }
}