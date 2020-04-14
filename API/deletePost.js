import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

/*
  This API receives a postID that wil be deleted then decrements the numberOfTrees or  questions of the current user 
  depending on the type of this post
*/

export default function deletePost(postID) {
  return new Promise((resolve, reject)=>{
    const user = firebase.auth().currentUser || null;

    const postRef = firebase.database().ref("posts/" + postID);
    postRef.child('isQuestion').once('value', isQuestion =>{

      postRef.remove();
      
      if(isQuestion){
        firebase.database().ref('users/'+user.uid+"/questions")
        .transaction((currentData)=>{
          return currentData - 1;
        })
      }
      else{
        firebase.database().ref('users/'+user.uid+"/numberOfTrees")
        .transaction((currentData)=>{
          return currentData - 1;
        })
      }

      resolve();

    })
  })
}
