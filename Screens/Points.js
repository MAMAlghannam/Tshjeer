import React from 'react';
import {View, Text} from 'react-native';

class Points extends React.Component{

    static navigationOptions = ({navigation})=>{
        return{
        }
    }

    render(){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Points</Text>
            </View>
        )
    }
}

export default Points;