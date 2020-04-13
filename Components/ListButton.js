import React from 'react';
import { Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

//importing from API folder
import notifyUser, { unsubscribeRef } from '../API/notifyUser';

class ListButton extends React.Component{

    state = {
        alert: false
    }

    setAlert = (status) =>{
        this.setState({alert: status})
    }

    componentDidMount(){
        notifyUser(this.setAlert)
    }

    componentWillUnmount(){
        unsubscribeRef();
    }

    render(){
        return (
            <View>
            <Ionicons 
                color="white"
                style={{paddingLeft:10, paddingRight:10}} 
                name="md-menu" size={30}
                onPress={()=>this.props.navigation.openDrawer()}
            />
            {this.state.alert ? 
            <Badge
                status="warning"
                containerStyle={{ position: 'absolute', top: 5, right: 25 }}
            /> : null}
            
            </View>
        );
    }
}

export default ListButton;