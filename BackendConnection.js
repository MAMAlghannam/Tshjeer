import * as firebase from 'firebase/app';

export default class BackendConnection{
    constructor(){
        //connection information
        this.firebaseConfig = {
            apiKey: "AIzaSyDky9LMDBZ01M2y6TFwHpgInh7WrVRB7w4",
            authDomain: "tsmmaweb.firebaseapp.com",
            databaseURL: "https://tsmmaweb.firebaseio.com",
            projectId: "tsmmaweb",
            storageBucket: "tsmmaweb.appspot.com",
            messagingSenderId: "765128376944",
            appId: "1:765128376944:web:3537447e7bd5b03c842ab5",
            measurementId: "G-DZB22E3BT2"
        }
      

        if (!firebase.default.apps.length) {
            firebase.default.initializeApp(this.firebaseConfig);
        }
    }
}