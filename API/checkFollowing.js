import firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/functions'

/*
    This API has three functions:
    1. check if the current user is following the passed userID in the function "checkFollowing"
    2. Follow the passed userID in the function "follow"
    3. Unfollow the passed userID in the function "unfollow"
*/

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
        firebase.functions().httpsCallable('addActivity')({type: "followed", followedID: userID})
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