import React from 'react';
import { Text, View, Image, Dimensions, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class NewPost extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            desc: "",
            //A warning shows up when set the uri to null or empty string so we put a temporary path
            uri: "../images/postImg.png"
        }
    }

    componentDidMount(){
        //Set the uri property with the uri that came from navigator.params
        this.setState({ uri: this.props.navigation.state.params.uri })
    }

    render(){
        return(
        <View style={{flex: 1}}>
        {/* "KeyboardAwareScrollView" tag is downloaded separately as clear above, it moves above 
           the keyboard but we most set "extraScrollHeight" and "enableOnAndroid" properties */}
        <KeyboardAwareScrollView style={{flex: 1}} enableOnAndroid={true} extraScrollHeight={200} >
        <View style={{flex: 1}}>
            <Image 
                source={{uri: this.state.uri}} 
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
        <TouchableOpacity style={styles.shareButton}>
            <Text style={{fontSize: 18, color: 'white'}}>Share</Text>
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