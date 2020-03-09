import firebase from 'firebase/app';
import 'firebase/database'

export default async function getUserByUID(uid){
    var snapshot = await firebase.database().ref('/users/'+uid).once('value');
    return snapshot.val();
}