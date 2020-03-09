import firebase from 'firebase/app';
import 'firebase/database'

export default function getUsersPosts(userID, sendPosts){
    firebase.database().ref('/posts/').orderByChild('uid').equalTo(userID)
    .once('value', (snapshot)=>{
        // sendPosts(Object.keys(snapshot.val()))
        sendPosts(snapshot.val())
        // console.log(snapshot.val())
    })
}

exports.unsubscribePostsRef = () => {
    postsRef().off();
}
