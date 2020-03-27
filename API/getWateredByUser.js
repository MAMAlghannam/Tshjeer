import firebase from 'firebase/app';
import 'firebase/database'

export default function getWateredByUser(userID, sendPosts){
    var database = firebase.database()
    var posts = [], listOfpostID = [], listOftimestamps = [];
    database.ref(`/watering-users/${userID}`).once('value', wateredPlaces=>{
        if(wateredPlaces.exists()){
            Object.values(wateredPlaces.val()).map(place =>{
                database.ref(`/posts/${place.plantID}`).once('value', plant=>{
                    posts = posts.concat(plant.val())
                    listOftimestamps = listOftimestamps.concat(place.timestamp)
                    listOfpostID = listOfpostID.concat(place.plantID)
                })
            })
        }
        sendPosts(posts, listOftimestamps, listOfpostID)
    })
}

exports.unsubscribePostsRef = () => {
    postsRef().off();
}
