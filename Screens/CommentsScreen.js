import React from 'react';
import { View, StyleSheet, Text } from 'react-native'; 

class CommentsScreen extends React.Component{

    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: "Comments",
        }
    };

    render(){
        return(
        <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
            <Text>Comments</Text>
            <Text>postID: {this.props.navigation.state.params.postID}</Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    
})

export default CommentsScreen;