import React from 'react';
import {View, Text, Button} from 'react-native';

class EditInfo extends React.Component{

    static navigationOptions = ({navigation}) => {
        return {      
            headerShown: false,

        }
    }

    render(){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>EditInfo</Text>
                <Button title="go back" onPress={()=>this.props.navigation.goBack()} />
            </View>
        )
    }
}

export default EditInfo;