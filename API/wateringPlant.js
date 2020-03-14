import firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/functions'

/*
    Biscally this function will receive the coords and the description for the question, 
    then it'll send them a cloud function called "addQuestion", 
    which on its behalf will insert it in the database.
*/

export default function wateringPlant(usersCoords, plantID, plantsCoords){
    var wateringInfo = {usersCoords: usersCoords, plantID: plantID, plantsCoords: plantsCoords};
    return firebase.functions().httpsCallable('waterPlant')(wateringInfo);
}