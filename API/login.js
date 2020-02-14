import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'

function login(email, password){
    return firebase.auth().signInWithEmailAndPassword(email, password);
}

export default login;