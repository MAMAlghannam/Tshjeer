import firebase from 'firebase/app';
import 'firebase/database'

export default function getUserByUID(uid, setAvatar, setUsername){
    firebase.database().ref('/users/'+uid).once('value', (snapshot)=> {
        setAvatar(snapshot.val().avatar)
        setUsername(snapshot.val().username)
    })
}