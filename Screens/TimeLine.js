import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Post from '../Components/Post'

export default class TimeLine extends React.Component {
  render(){
  return (
    <ScrollView>
      <Post />
      <Post />
      <Post />
    </ScrollView>
  );
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
