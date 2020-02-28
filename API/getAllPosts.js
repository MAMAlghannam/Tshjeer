import firebase from 'firebase/app';
import 'firebase/database'

export default function getAllPosts(sendPosts){
    firebase.database().ref('/posts').on('value', (snapshot)=>{
        sendPosts(Object.values(snapshot.val()))
    })
} 