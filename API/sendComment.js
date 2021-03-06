import firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/auth'
import 'firebase/functions'

/*
    This API just taking the comment from the current user and it requires postID, comment and a function called showInComments
    to append the comment when the sending succesded
*/

export default function sendComment(postID, comment, showInComments){
    return new Promise( async (resolve, reject) =>{
        try{
            const user = firebase.auth().currentUser || null;
            if(user){

                comment = comment.trim();

                var commentInfo = {userID: user.uid, comment: comment, timestamp: new Date().getTime()};
                firebase.database().ref('/comments/'+postID).push(commentInfo)
                .then(()=>{
                    resolve('sent sucessfully')
                    showInComments({userID: user.uid, comment: comment})
                    activityInfo = { type: "comment", postID: postID, content: comment }
                    firebase.functions().httpsCallable('addActivity')(activityInfo)
                })
            .catch((err)=> reject(err))
            }
            else
                reject('Not authenticated !');
        }
        catch(err){
            reject(err);
        }
    });
}