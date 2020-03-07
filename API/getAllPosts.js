import firebase from 'firebase/app';
import 'firebase/database'

function postsRef(){
    return firebase.database().ref('/posts');;
}

export default function getAllPosts(sendPosts){
    postsRef().on('value', (snapshot)=>{
        // sendPosts(Object.keys(snapshot.val()))
        sendPosts(snapshot.val())
    })
}

exports.unsubscribePostsRef = () => {
    postsRef().off();
}
