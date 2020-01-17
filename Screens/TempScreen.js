import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

export default class TempScreen extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Text>Temp</Text>
        <Button title="logout" onPress={()=> this.props.navigation.navigate('Login_SignUp')} />
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
