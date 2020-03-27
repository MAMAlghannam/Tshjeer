import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

export default function changeBio(text) {
  const user = firebase.auth().currentUser || null;
  firebase.database().ref("users/" + user.uid).update({ bio: text });
}
