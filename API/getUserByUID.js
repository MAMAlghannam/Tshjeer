import firebase from 'firebase/app';
import 'firebase/database'

/*
    Nothing to tell here, the book known from its name :)
*/

export default async function getUserByUID(uid){
    var snapshot = await firebase.database().ref('/users/'+uid).once('value');
    return snapshot.val();
}