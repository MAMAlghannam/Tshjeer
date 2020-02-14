import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './Navigation/SwitchNavigation';

import * as firebase from 'firebase/app';

//initialize firebase
var firebaseConfig = {
  apiKey: "AIzaSyDky9LMDBZ01M2y6TFwHpgInh7WrVRB7w4",
  authDomain: "tsmmaweb.firebaseapp.com",
  databaseURL: "https://tsmmaweb.firebaseio.com",
  projectId: "tsmmaweb",
  storageBucket: "tsmmaweb.appspot.com",
  messagingSenderId: "765128376944",
  appId: "1:765128376944:web:3537447e7bd5b03c842ab5",
  measurementId: "G-DZB22E3BT2"
};

firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <AppContainer />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
