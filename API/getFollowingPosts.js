import firebase from 'firebase/app';
import 'firebase/database'

/*
    This API looks for whom the curren user is follwoing then bring their posts from the database 
*/

export default function getAllPosts(sendPosts){
    const user = firebase.auth().currentUser;
    const rootRef = firebase.database().ref(); 
    var posts = [];
    //1. search for whom the user is following
    rootRef.child('following/'+user.uid).once('value', (snapshot)=>{
        if(snapshot.exists()){
            Object.keys(snapshot.val()).map((key)=>{
                //2. search for each one's posts
                rootRef.child('posts').orderByChild('uid').equalTo(key).once('value', (snapshot)=>{
                    //3. push them inside the "posts" array
                    posts = posts.concat(snapshot.val())
                })
            })
        }
        sendPosts(posts)
    })
}
