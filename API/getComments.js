import firebase from 'firebase/app';
import 'firebase/database'

/*
    This API receives postID then looks for its comment(s) then pass them to the passed funcion "sendComments" 
*/

export default function getComments(postID, sendComments){
    firebase.database().ref('/comments/'+postID).once('value', snapshot =>{
        if(snapshot.exists())
            sendComments(snapshot.val());
    }) 
}