import firebase from 'firebase/app';
import 'firebase/database'

/*
    This API looks the posts of the passed userID in the database then send the result to the passed function "sendPosts"
*/

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
