import React from 'react';
import { StyleSheet, Button, View } from 'react-native';

export default class Login_SignUp extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <Button
                title="Login"
                onPress={() => this.props.navigation.navigate('Home')}
                />
                <Button title="Sign Up" onPress={() => alert('button pressed')} />
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
