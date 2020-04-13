import firebase from 'firebase/app';
import 'firebase/database'

/*
    This API its job is looking for the plants that the user watered, by querying in the database, it receives the userID and a 
    function to pass the result
*/

export default function getWateredByUser(userID, sendPosts){
    var database = firebase.database()
    var posts = [], listOfpostID = [], listOftimestamps = [], listOfWateredKeys = [];
    database.ref(`/watering-users/${userID}`).once('value', wateredPlaces=>{
        if(wateredPlaces.exists()){
            listOfWateredKeys = Object.keys(wateredPlaces.val()); 
            Object.values(wateredPlaces.val()).map(place =>{
                database.ref(`/posts/${place.plantID}`).once('value', plant=>{
                    posts = posts.concat(plant.val())
                    listOftimestamps = listOftimestamps.concat(place.timestamp)
                    listOfpostID = listOfpostID.concat(place.plantID)
                })
            })
        }
        sendPosts(posts, listOftimestamps, listOfpostID, listOfWateredKeys)
    })
}

exports.unsubscribePostsRef = () => {
    postsRef().off();
}
