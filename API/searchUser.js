import firebase from "firebase/app";
import "firebase/database";

export default function search(fillUserFound, user) {
  firebase
    .database()
    .ref("/users")
    .orderByChild("username")
    .startAt(user)
    .endAt(user + "\uf8ff")
    .on("value", snapshot => {
      if (snapshot.exists()) {
        fillUserFound(Object.values(snapshot.val()));
      } else {
        alert("nothing found");
      }
    });
}
