import firebase from 'firebase/app';
import 'firebase/database'

/*
    This function will read all information about the user that's include user's avatar, username, number of trees and 
    number of watered plants form the database, then put the information in the received functions from the "DrawerNavigation".
    This difference is this function will listen for any changes in user's path then it will send it to the received function
*/

function ref(){
    return firebase.database().ref('/users');;
}

export default function getUserInfo(sendUserInfo){
    const user = firebase.auth().currentUser || null;
    //when the user clicks logout in "DrawerNavigation" the value of "firebase.auth().currentUser" is null so, it causes an error
    if(user){  
        ref().child(user.uid).on('value', (snapshot)=> {
            sendUserInfo({
                username: snapshot.val().username,
                avatar: snapshot.val().avatar,
                nTrees: snapshot.val().numberOfTrees || 0,
                questions: snapshot.val().questions || 0,
                nWatered: snapshot.val().numberOfWatering || 0
            })
        })
    }
}

exports.unsubscribeRef = () => {
    ref().off();
}