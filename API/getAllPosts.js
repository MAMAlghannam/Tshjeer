import firebase from 'firebase/app';
import 'firebase/database'

function postsRef(){
    return firebase.database().ref('/posts');;
}

export default function getAllPosts(sendPosts){
    postsRef().on('value', (snapshot)=>{
        sendPosts(Object.values(snapshot.val()))
    })
}

exports.unsubscribePostsRef = () => {
    postsRef().off();
}
