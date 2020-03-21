import firebase from 'firebase/app';
import 'firebase/database'

export default async function checkFollowing(userID){
    const user = firebase.auth().currentUser || null;
    const result = await firebase.database().ref('following/'+user.uid).child(userID).once('value')

    return result.exists();
}

exports.follow = (userID) =>{
    try{
        const user = firebase.auth().currentUser || null;
        firebase.database().ref('followers/'+userID).update({ [user.uid]: true })
        firebase.database().ref('following/'+user.uid).update({ [userID]: true })
        return true;
    }
    catch(err){
        console.log('checkFollowing - follow: ', err)
        return false;
    }
}

exports.unfollow = (userID) =>{
    try{
        const user = firebase.auth().currentUser || null;
        firebase.database().ref('followers/'+userID+'/'+user.uid).remove()
        firebase.database().ref('following/'+user.uid+'/'+userID).remove()
        return true;
    }
    catch(err){
        console.log('checkFollowing - unfollow: ', err)
        return false;
    }
}