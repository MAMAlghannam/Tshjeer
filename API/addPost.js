import firebase from 'firebase/app';
import 'firebase/storage'
import 'firebase/database'
import 'firebase/functions'
const uuidv4 = require('uuid/v4');

/*
    In this function it receives three parameters photo, coordinates and description for the post,
    first thing to do is to upload the photo to the storage cloud then get the URL for this photo,
    then send the URL of the photo and the rest parameters to a cloud function called "addPost",
    which on its behalf will insert it in the database.
*/

export default function addPost(photo, coords, desc){
    return new Promise( async (resolve, reject) =>{
        try{
            const storage = firebase.storage();
            const user = firebase.auth().currentUser;

            desc = desc.trim();

            /*1. get image as blob
            firebase SDK wouldn't accept base64 here !!, 
            so we have to convert it to blob by calling fetch()*/
            const blob = await fetch(photo.uri, 
                {method: 'GET',headers: {'Content-Type':'multipart/form-data'}}).then((res)=>{return res.blob()})
            //we faced an issue with ios, it upload the photo after changing its orientation -90 degrees !!,
            //so we set a metadata stores this information we may need it when reading the photo
            const metadata = {customMetadata: {orientation: photo.exif.Orientation || 0}}
            //2. upload the image then get the URL
            var uniqueNameForImage = uuidv4();
            const specifyPath = storage.ref().child('images/'+user.uid+'-'+uniqueNameForImage)
            const uploadingResult = await specifyPath.put(blob, metadata)
            const imageURL = await uploadingResult.ref.getDownloadURL()

            //3. send the whole info to the addPost function in cloud function 
            var postInfo = {imageBase64: imageURL, coords: coords, desc: desc};
            var addPostResult = await firebase.functions().httpsCallable('addPost')(postInfo);
            
            resolve(addPostResult);
        }
        catch(err){
            console.log(err)
            reject(err)
        }

    });
}