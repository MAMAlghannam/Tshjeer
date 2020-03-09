import firebase from 'firebase/app';
import 'firebase/database'

/*
    
*/

export default function getComments(postID, sendComments){
    firebase.database().ref('/comments/'+postID).once('value', snapshot =>{
        if(snapshot.exists())
            sendComments(snapshot.val());
    }) 
}