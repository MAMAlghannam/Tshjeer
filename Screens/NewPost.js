import React from 'react';
import { Text, View, Image, Dimensions, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Permissions from 'expo-permissions';
// import RNFetchBlob from 'react-native-fetch-blob'
console.ignoredYellowBox = [
    'Setting a timer'
]
import addPost from '../API/addPost'

class NewPost extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            desc: "",
            coords: null,
            //A warning message shows up when set the uri to null or empty string so we put a temporary path
            photo: {uri: "../images/postImg.png"},
            //some variables to enhance the user experience
            uploading: false, uploaded: false
        }
    }

    async componentDidMount(){
        //Set the photo property with the photo that came from navigator.params
        this.setState({ photo: this.props.navigation.state.params.photo })

        const {status} = await Permissions.getAsync(Permissions.LOCATION)
        if(status != 'granted'){
            alert('Ensure to enable your GPS')
            this.props.navigation.navigate('Add')
        }
        navigator.geolocation.getCurrentPosition(
            (coords)=>{this.setState(coords)},//when it succeeded
            (error) => alert(error),//when something went wrong
            {enableHighAccuracy: true}//options 
        )
    }

    addPost = () =>{
        this.setState({uploading: true})
        //this function in API folder
        addPost(this.state.photo, this.state.coords, this.state.desc)
        .then((res)=> {
            this.setState({uploading: false, uploaded: true})
            alert(res.data+" "+this.state.uploaded);
        })
        .catch((err)=> {
            this.setState({uploading: false})
            alert(err.message); 
        })
        
    }

    render(){
        return(
        <View style={{flex: 1}}>
        {/* "KeyboardAwareScrollView" tag is downloaded separately as clear above, it moves above 
           the keyboard but we most set "extraScrollHeight" and "enableOnAndroid" properties */}
        <KeyboardAwareScrollView style={{flex: 1}} enableOnAndroid={true} extraScrollHeight={200} >
        <View style={{flex: 1}}>
            <Image 
                source={{uri: this.state.photo.uri}} 
                style={styles.imageStyle}
                resizeMode="contain"
            />
            <View style={{flex: 1, padding: 10}}>
                <Text style={{fontSize: 18}}>Description: </Text>
                <TextInput
                multiline
                style={styles.descStyle}
                onChangeText={text => this.setState({ desc: text})}
                value={this.state.desc}
                maxLength={500}
                placeholder={"Your description..."}
                />
            </View>
        </View>
        </KeyboardAwareScrollView>
        <TouchableOpacity 
            disabled={(this.state.uploading || this.state.uploaded) || this.state.coords == null ? true : false} 
            onPress={() => this.addPost()} 
            style={styles.shareButton}
        >
        {
            this.state.uploading ? <ActivityIndicator size="small" color="white" /> 
            : this.state.coords == null 
            ? <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ActivityIndicator size="small" color="white" />
                <Text style={{fontSize: 18, color: 'white'}}> getting your location...</Text>
            </View> 
            : this.state.uploaded ? <Text style={{fontSize: 18, color: 'white'}}>uploaded successfully</Text> 
            : <Text style={{fontSize: 18, color: 'white'}}>Share</Text>
        }
        </TouchableOpacity>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    imageStyle:{
        height: 400,
        width: Dimensions.get('window').width*0.9,
        marginLeft: Dimensions.get('window').width*0.05
    },
    descStyle:{
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        flex: 1,
        padding: 8,
        marginBottom: 10,
        fontSize: 16,
    },
    shareButton:{
        position: 'relative', 
        bottom: 0, 
        backgroundColor: "green",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    }
})

export default NewPost;