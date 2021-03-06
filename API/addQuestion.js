import firebase from 'firebase/app';
import 'firebase/storage'
import 'firebase/database'
import 'firebase/functions'

/*
    Biscally this function will receive the coords and the description for the question, 
    then it'll send them a cloud function called "addQuestion", 
    which on its behalf will insert it in the database.
*/

export default function addQuestion(coords, desc){
    desc = desc.trim();
    var questionInfo = {desc: desc, coords: coords};
    return firebase.functions().httpsCallable('addQuestion')(questionInfo);
}