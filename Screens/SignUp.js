import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons ,Entypo} from "@expo/vector-icons";

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
return (    
  <View style={{ flex: 1 }}>
    <LinearGradient
      start={{ x: 2, y: 0 }}
      end={{ x: 0, y: 2 }}
      colors={["#f5fffc", "#71b280"]}
      style={{ flex: 1 }}
      
    >
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 3
          }}
        >

        
        </View>
          <View style={{marginTop:120}}>
        <View style={styles.inputContainer}>
          <Entypo
            style={styles.icon}
            name="user"
            size={30}
            color="#FFFFFF"
          />
          {/*username field*/}
          <TextInput
            placeholder="Username"
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
            color="#FFFFFF"
          />
          {/*email field*/}
          <TextInput
            ref={ref => {this.emailField = ref}}
            placeholder="Email"
            style={styles.input}
            multiline={false}
            value={this.state.email}
            onChangeText={(text)=>{this.setState({email: text})}}
            returnKeyType="next"
            onSubmitEditing={() => this.passwordField.focus()}
          />
          
        </View><View style={styles.inputContainer}>
          <Ionicons
            style={styles.icon}
            name="md-lock"
            size={30}
            color="#FFFFFF"
          />
          {/*password field*/}
          <TextInput
            ref={ref => {this.passwordField = ref}}
            placeholder="Password"
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
            color="#FFFFFF"
          />
          {/*confirm password field*/}
          <TextInput
            ref={ref => {this.confPasswordField = ref}}
            placeholder="Confirm Password"
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
        <View style={styles.bottom}>
          <View style={styles.signupContainer}>
            <Text style={{ color: "#FFFFFF" }}>or signup with, click f to login</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login_SignUp')} style={styles.signupButton}>
              <Ionicons name="logo-facebook" size={30} color="#71b280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.signupButton}>
              <Ionicons name="logo-google" size={30} color="#71b280" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  </View>
);
}
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: "center",
  flexDirection: "column",
  
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
  backgroundColor:'rgba(250, 250, 250,0.3)'
  
},
input: {
  flex: 1,
  color: "#FFFFFF",
  fontSize: 17
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