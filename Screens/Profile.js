import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

//suggested
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default class Profile extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Username",
    }
  };

  render(){
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
        <Button title="Plants" onPress={()=>this.props.navigation.navigate('Plants')}/>
        <Button title="Watering" onPress={()=>this.props.navigation.navigate('Watering')}/>
        <Button title="Questions" onPress={()=>this.props.navigation.navigate('Questions')}/>
        <Button title="Points" onPress={()=>this.props.navigation.navigate('Points')}/>
        <Button title="EditInfo" onPress={()=>this.props.navigation.navigate('EditInfo')}/>
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
});
