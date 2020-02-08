import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions,ImageBackground } from 'react-native';

export default class Add extends React.Component {
  render(){
  return (
  <View style={styles.container}>
    <View style={[styles.buttonContainer]}>
    <ImageBackground   style={{marginTop:4 , marginLeft:5,height: 130, width: 250, position: 'absolute', resizeMode: 'cover' }}
    source={require('../assets/8.jpg')}
    
        />
    <TouchableOpacity 
      style={styles.button} 
      onPress={()=>this.props.navigation.navigate('AddPost')}
    >
      <Text style={styles.text}>Post</Text>
    </TouchableOpacity>
    </View>

    <View style={[styles.buttonContainer]}>
    <ImageBackground   style={{marginTop:4 , marginLeft:5,height: 130, width: 250, position: 'absolute', resizeMode: 'cover' }}
    source={require('../assets/9.jpg')}
    
        />
    <TouchableOpacity 
      style={styles.button} 
      onPress={()=>this.props.navigation.navigate('AddQuestion')}
    >
      <Text style={styles.text}>Question</Text>
    </TouchableOpacity>
    </View>
  </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer:{
    width: Dimensions.get('window').width*0.7,
    margin: Dimensions.get('window').width*0.15,
    padding: 3,
    borderRadius: 4
  },  
  button:{
    borderRadius: 4,
    padding: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'white'
  },
  text:{
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold' ,fontSize:25
  }
});
