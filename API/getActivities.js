import firebase from 'firebase/app';
import 'firebase/database'

export default function getActivities(sendActivities){
    const user = firebase.auth().currentUser;
    const activities = firebase.database().ref('activities');
    
    activities.child(user.uid).orderByChild('timestamp').once('value', (snapshot)=>{
        if(snapshot.exists()){
            sendActivities(snapshot.val())
        }
        else
            sendActivities([])
    })
}
