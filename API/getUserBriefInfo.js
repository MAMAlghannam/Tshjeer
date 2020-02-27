import firebase from 'firebase/app';
import 'firebase/database'

/*
    This function will read brief information about the user that's include user's avatar, username, number of trees and 
    number of watered plants form the database, then put the information in the received functions from the "DrawerNavigation" 
*/

export default function getUserBriefInfo(setAvatar, setUsername, setNTrees, setNWatered){
    const user = firebase.auth().currentUser || null;
    //when the user clicks logout in "DrawerNavigation" the value of "firebase.auth().currentUser" is null so, it causes an error
    if(user){  
        firebase.database().ref('/users/'+user.uid).once('value', (snapshot)=> {
            setAvatar(snapshot.val().avatar)
            setUsername(snapshot.val().username)
            setNTrees(snapshot.val().numberOfTrees || 0)
            setNWatered(snapshot.val().numberOfWatering || 0) 
        })
    }
}