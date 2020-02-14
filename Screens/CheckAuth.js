import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import firebase from "firebase/app";
import 'firebase/auth';

export default class CheckAuth extends React.Component{

  constructor(props){
    super(props);

  }

  componentDidMount(){    
    firebase.auth().onAuthStateChanged((user) => {
      console.log('checking... -> CheckAuth.js');
      this.props.navigation.navigate(user ? 'Home' : 'Login_SignUp');
    });
  }

  render(){
    return(
      <View style={styles.container}>
          <ActivityIndicator size="large" color="lightgreen" />
          <Text>Loading...</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
