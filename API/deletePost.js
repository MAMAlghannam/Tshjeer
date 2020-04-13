import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

/*
  This API receives a postID that wil be deleted then decrements the numberOfTrees or  questions of the current user 
  depending on the type of this post
*/

export default function deletePost(postID) {
  const user = firebase.auth().currentUser || null;
  return firebase.database().ref("posts/" + postID).remove()
  .then((result)=>{
    firebase.database().ref("posts/" + postID+"/isQuestion")
    .once('value', (isQuestion)=>{
      if(isQuestion.val())
        firebase.database().ref('users/'+user.uid+"/questions")
        .transaction((currentData)=>{
          return currentData - 1;
        })
      else
        firebase.database().ref('users/'+user.uid+"/numberOfTrees")
        .transaction((currentData)=>{
          return currentData - 1;
        })
    })

    return true;
  });
}
