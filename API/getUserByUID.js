import firebase from 'firebase/app';
import 'firebase/database'

export default function getUserByUID(uid, sendUserInfo){
        firebase.database().ref('/users/'+uid).on('value', (snapshot)=> {
            sendUserInfo(snapshot.val())
        })
}