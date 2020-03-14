import firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/auth'
import 'firebase/functions'

/*
    
*/

export default function sendComment(postID, comment, showInComments){
    return new Promise( async (resolve, reject) =>{
        try{
            const user = firebase.auth().currentUser || null;
            if(user){
                var commentInfo = {userID: user.uid, comment: comment, timestamp: new Date().getTime()};
                firebase.database().ref('/comments/'+postID).push(commentInfo)
                .then(()=>{
                    resolve('sent sucessfully')
                    showInComments({userID: user.uid, comment: comment})
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