import firebase from 'firebase/app';
import 'firebase/database'

/*
    Nothing to tell here, the book known from its name :)
*/

export default async function getWateredByUser(postID){
    var snapshot = await firebase.database().ref(`/posts/${postID}`).once('value')
    return snapshot.val()
}

exports.unsubscribePostsRef = () => {
    postsRef().off();
}
