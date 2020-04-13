import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,ImageBackground, ScrollView, Image, Platform
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons ,Entypo} from "@expo/vector-icons";
import { Container, /*Header,*/ Content, Card, CardItem, Text, Body,View ,Button, Icon, Fab,Left,Title,Right} from 'native-base';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'
import { Header } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//importing createUser function
import createUser from '../API/createUser';

export default class SignUp extends React.Component {
  

  constructor(props){
    super(props);
    this.state = {
      //user info
      username: "",
      email: "",
      password: "",
      confPassword: "",

      loading: false
    }
}

_validation = (username, email, password, confPassword) =>{
  if(username.trim() == ""){
    alert('Username field must be filled');
    return false;
  }
  else if(/\s/.test(username.trim())){
    alert('Username badly formatted, must no whitespace');
    return false;
  }
  else if(username.trim().indexOf('$') >= 0 || 
          username.trim().indexOf('.') >= 0 || 
          username.trim().indexOf('[') >= 0 || 
          username.trim().indexOf(']') >= 0 || 
          username.trim().indexOf('{') >= 0 || 
          username.trim().indexOf('}') >= 0 || 
          username.trim().indexOf('#') >= 0 || 
          username.trim().indexOf('/') >= 0 || 
          username.trim().indexOf('%') >= 0 || 
          username.trim().indexOf('\"') >= 0 || 
          username.trim().indexOf('\'') >= 0 ) {
    alert('Username badly formatted, $ ] [ # \' \" % not allowed');
    return false;
  }
  else if(password === "" || confPassword === ""){
    alert('Password fields must be filled');
    return false;
  }
  else if(password != confPassword){
    alert('Passwords didn\'t match');
    return false;
  }
 
  return true;
}

_signup = () =>{
  this.setState({loading: true})

  const { username, email, password, confPassword } = this.state;

  //we need validation procedure better than this :(
  if(this._validation(username, email, password, confPassword)){
    //creating user account, by calling a function in API folder 
    createUser(username, email, password)
    .then(() => {
      console.log('user account created')
    })
    .catch(err => { //if there is any error
      this.setState({loading: false})
      alert(err)
    })
  }
  else
    this.setState({loading: false})
}

render(){
  const { navigation } = this.props;
return (    

  

  <View style={{ flex: 1 }}>
    
   
    <ImageBackground source={ require('../assets/16.png')} style= {{
        flex: 1,
        width: '100%',
        height: '100%',
       
        opacity: 0.9
    }} >
    {/* <Header style={{opacity: 0.8}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Login_SignUp')}>
              <Icon style={{color:"green"}} name='arrow-back'  />
              <Text style={{color:"green"}}>Back</Text>
            </Button>
          </Left>
          <Body>
            <Text style={{fontSize:18, fontWeight: 'bold'}}>SignUp</Text>
          </Body>
          <Right>
            <Button transparent>
              <Text></Text>
            </Button>
          </Right>
        </Header> */}

        
      <Header
        containerStyle={{backgroundColor: 'white', opacity: 0.8}}
        leftComponent={{ icon: 'keyboard-arrow-left', size: 40, color: 'black', onPress: ()=> { this.props.navigation.navigate('Login_SignUp') } }}
        centerComponent={ <Text style={{color: 'black', fontSize: 20,fontWeight: '500'}}>Sign Up</Text> }
      />

      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop:60
          }}
        >

          {/* <Image style={{width:100,height:100,borderRadius:60,borderWidth:1,borderColor:"#FFF"}} source={require('../assets/550.png')} /> */}
        </View>
        
        <KeyboardAwareScrollView
        contentContainerStyle={{
          // flex: 1,
          // backgroundColor: 'white',
          // justifyContent: 'flex-end'
        }}
        enableOnAndroid={true}
        extraScrollHeight={Platform.OS == "android" ? -200 : 5}
        >
        <View style={styles.inputContainer}>
          <Entypo
            style={styles.icon}
            name="user"
            size={30}
            color="#71b280"
          />
          {/*username field*/}
          <TextInput
            placeholder="Username"
            placeholderTextColor="grey"
            value={this.state.username}
            onChangeText={(name)=>{this.setState({username: name})}}
            style={styles.input}
            multiline={false}
            returnKeyType="next"
            onSubmitEditing={() => this.emailField.focus()}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons
            style={styles.icon}
            name="md-mail"
            size={30}
            color="#71b280"
          />
          {/*email field*/}
          <TextInput
            ref={ref => {this.emailField = ref}}
            placeholder="Email"
            placeholderTextColor="grey"
            style={styles.input}
            multiline={false}
            value={this.state.email}
            onChangeText={(text)=>{this.setState({email: text})}}
            returnKeyType="next"
            onSubmitEditing={() => this.passwordField.focus()}
          />
          
        </View>
        <View style={styles.inputContainer}>
          <Ionicons
            style={styles.icon}
            name="md-lock"
            size={30}
            color="#71b280"
          />
          {/*password field*/}
          <TextInput
            ref={ref => {this.passwordField = ref}}
            placeholder="Password"
            placeholderTextColor="grey"
            style={styles.input}
            multiline={false}
            value={this.state.password}
            onChangeText={(pass)=>{this.setState({password: pass})}}
            returnKeyType="next"
            onSubmitEditing={() => this.confPasswordField.focus()}
            secureTextEntry={true}
            
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons
            style={styles.icon}
            name="md-lock"
            size={30}
            color="#71b280"
          />
          {/*confirm password field*/}
          <TextInput
            ref={ref => {this.confPasswordField = ref}}
            placeholder="Confirm Password"
            placeholderTextColor="grey"
            style={styles.input}
            multiline={false}
            value={this.state.confPassword}
            onChangeText={(confPass)=>{this.setState({confPassword: confPass})}}
            returnKeyType="done"
            secureTextEntry={true}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          </View>
          
        <View style={styles.buttonContainer}>
        <TouchableOpacity disabled={this.state.loading} onPress={this._signup} style={styles.button}>
        {
        this.state.loading ? <ActivityIndicator size="large" color="lightgreen" /> 
        : <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{ color: "#71b280" }}>Sign up</Text>
            <Ionicons style={{ marginStart: 10 }}
            name="md-arrow-round-forward"
            size={30} color="#71b280" />
          </View> 
        }
        </TouchableOpacity >
        </View>
        
        
        <View style={{marginTop: 20}}>
          <View style={styles.signupContainer}>
            <Text style={{ color: "#FFFFFF" }}>or signup with </Text>
            <TouchableOpacity  style={styles.signupButton}>
              <Ionicons name="logo-facebook" size={30} color="#71b280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.signupButton}>
              <Ionicons name="logo-google" size={30} color="#71b280" />
            </TouchableOpacity>
          </View>
        </View>
        </KeyboardAwareScrollView>
      </View>
    </ImageBackground>
   
  </View>
);
}
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  // justifyContent: "center",
  // flexDirection: "column",
  
},

inputContainer: {
  margin: 10,
  borderColor: "#FFFFFF",
  borderWidth: 1,
  flexDirection: "row",
  padding: 5,
  alignItems: "stretch",
  overflow: "hidden",
  borderRadius:50,
  backgroundColor: 'rgba(255, 255, 255, 0.8)'
},
input: {
  flex: 1,
  color: "black",
  fontSize: 18,
},
icon: {
  marginEnd: 10
},
buttonContainer: {
  marginTop: 10,
  flexDirection: "row",
  justifyContent: "space-around"
},
button: {
  flexDirection: "row",
  justifyContent: "space-around",
  backgroundColor: "#FFFFFF",
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 50,
  justifyContent: "center",
  alignItems: "center"
},
signupButton: {
  marginHorizontal: 5,
  backgroundColor: "#FFFFFF",
  width: 50,
  height: 50,
  borderRadius: 50,
  justifyContent: "center",
  alignItems: "center"
},
signupContainer: {
  marginTop: 30,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center"
}
});