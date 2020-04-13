import firebase from 'firebase/app';
import 'firebase/database'

/*
    This API looks for just the first comments of the passed postID from the database
*/

export default async function getUserByUID(postID){
    var snapshot = await firebase.database().ref('/comments/'+postID).limitToFirst(2).once('value');
    if(snapshot.exists())
        return Object.values(snapshot.val());
    else
        return [];
}