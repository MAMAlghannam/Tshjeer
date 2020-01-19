import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

export default class Add extends React.Component {
  render(){
  return (
    <View>
        <Text>Add</Text>
        <Button title="Post" onPress={()=>this.props.navigation.navigate('AddPost')}/>
        <Button title="Question" onPress={()=>alert('Question')}/>
    </View>
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
