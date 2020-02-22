import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Header } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import addQuestion from '../API/addQuestion'

class NewQuestion extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            desc: "",
            coords: null,
            //some variables to enhance the user experience
            uploading: false, uploaded: false
        }
    }

    async componentDidMount(){
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

    addQuestion = () =>{
        this.setState({uploading: true})
        //this function in API folder
        addQuestion(this.state.coords, this.state.desc)
        .then((res)=> {
            this.setState({uploading: false, uploaded: true})
            alert(res.data);
        })
        .catch((err)=> {
            this.setState({uploading: false})
            alert(err.message); 
        })
        
    }

    render(){
        return(
        <View style={{flex: 1}}>
            {/* Since the NewQuestion screen doesn't in stack navigator, 
                however that means we have to put a header hard coded */}
            <Header
                containerStyle={{backgroundColor: 'white'}}
                rightComponent={{ icon: 'close', onPress: ()=> { this.props.navigation.navigate('Add') } }}
                centerComponent={ <Text style={{fontSize: 18,fontWeight: '500'}}>New Question</Text> }
            />
            {/* "KeyboardAwareScrollView" tag is downloaded separately as clear above, it moves above 
               the keyboard but we most set "extraScrollHeight" and "enableOnAndroid" properties */}
            <KeyboardAwareScrollView style={{flex: 1,}} enableOnAndroid={true} extraScrollHeight={50} >
                <View style={{flex: 8, padding: 10}}>
                    <Text style={{fontSize: 18}}>What do you want to ask others? </Text>
                    <TextInput
                        multiline style={styles.questionStyle}
                        onChangeText={text => this.setState({ desc: text })}
                        value={this.state.desc} maxLength={500}
                        placeholder={"Type here..."}
                    />
                </View>
            </KeyboardAwareScrollView>
            <TouchableOpacity 
            disabled={(this.state.uploading || this.state.uploaded) || this.state.coords == null ? true : false} 
            onPress={() => this.addQuestion()} 
            style={styles.askButton}
        >
        {
            this.state.uploading ? <ActivityIndicator size="small" color="white" /> 
            : this.state.coords == null 
            ? <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ActivityIndicator size="small" color="white" />
                <Text style={{fontSize: 18, color: 'white'}}> getting your location...</Text>
              </View> 
            : this.state.uploaded ? <Text style={{fontSize: 18, color: 'white'}}>uploaded successfully</Text> 
            : <Text style={{fontSize: 18, color: 'white'}}>Ask</Text>
        }
        </TouchableOpacity>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    questionStyle:{
        borderWidth: 1,
        padding: 8,
        fontSize: 16,
        backgroundColor: 'white'
    },
    askButton:{
        position: 'relative', 
        bottom: 0, 
        backgroundColor: "darkblue",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    }
})

export default NewQuestion;