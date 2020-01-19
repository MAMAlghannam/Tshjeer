import React from 'react';
import {View, Text, Button} from 'react-native';

class Search extends React.Component {
    render() {
      return (
        <View style={{ backgroundColor: 'deepskyblue', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30,textAlign: 'center' }}>Search modal!</Text>
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Dismiss"
          />
        </View>
      );
    }
}

export default Search;