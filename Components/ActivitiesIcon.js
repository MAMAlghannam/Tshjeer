import React from 'react';
import { Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

//importing from API folder
import notifyUser, { unsubscribeRef } from '../API/notifyUser';

class ActivitiesIcon extends React.Component{

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
        console.log('activities will unMount')
        unsubscribeRef();
    }


    render(){
        return (
            <View>
            <Ionicons 
                name={'md-flash'} color={this.props.color} style={{marginTop: 7}} size={27} />
            {this.state.alert ? 
            <Badge
                status="warning"
                containerStyle={{ position: 'absolute', top: 5, right: 7 }}
            /> : null}
            
            </View>
        );
    }
}

export default ActivitiesIcon;