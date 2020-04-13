import firebase from 'firebase/app';
import 'firebase/database'

/*
    This API listens for the currenr user's entry in "notify-user" collection, which its job send the value of this entry
*/

function ref(){
    const user = firebase.auth().currentUser || null;
    return firebase.database().ref('/notify-user/'+user.uid);
}

export default function notifyUser(sendNotification){
    const user = firebase.auth().currentUser || null;
    if(user){  
        ref().on('value', (snapshot)=> {
            sendNotification(snapshot.val() || false)
        })
    }
}

exports.unsubscribeRef = () => {
    const user = firebase.auth().currentUser || null
    if(user)
        ref().off();
}

exports.seen = () => {
    const user = firebase.auth().currentUser || null
    if(user)
        ref().set(false);
}