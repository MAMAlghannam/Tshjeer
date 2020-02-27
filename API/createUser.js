import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'

/*
    Since the authentication for users and the database are separated services,
    this function creates a new user then creates an instance for it in
    the database that initially will contain the username and email
*/

function createUser(username, email, password){
    return new Promise((resolve, reject) => {
        var uid; //to share the uid with step 4
        const database = firebase.database();

        //1. check whether the username is exists or not
        checkUsername(username)
        .then(()=>{
            //2. create new user
            return firebase.auth().createUserWithEmailAndPassword(email, password)
        })
        .then(cred => { //3. the creation is done, now create an instance in users collection
        	uid = cred.user.uid;
            return database.ref('/users/'+cred.user.uid).set({
                username: username.trim(),
                email: email.trim(),
                avatar: "https://firebasestorage.googleapis.com/v0/b/tsmmaweb.appspot.com/o/avatars%2Fdefault3.png?alt=media&token=bcbf92ad-5385-4da5-bc9c-25742766bad0"
            })
        })
        .then(() => { //4. store the username in usernames collection with its uid
            return database.ref('/usernames/'+username).set(uid)
        })
        .catch((err)=>
            reject(err)
        )
    })
}

//this function will look into usernames collection to assure the username is unique
function checkUsername(username){ 
    return new Promise((resolve, reject) => {
        firebase.database().ref('/usernames/'+username).once('value')
        .then((snapshot)=> { 
            if(snapshot.exists()) 
                reject('username allready exists!');
            else 
                resolve();
        })
    })
}

export default createUser;