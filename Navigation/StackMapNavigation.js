import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Map from '../Screens/Map';
import Icon from '@expo/vector-icons/Ionicons';

const StackMapNavigation = createStackNavigator({
    Map:{
        screen: Map,
        navigationOptions:({navigation})=>{
            return{
            headerTitle: "Tshjeer",
            headerLeft: () =>
                <Icon 
                style={{paddingLeft:10}} 
                name="md-menu" size={30}
                onPress={()=>navigation.openDrawer()}
                />,
            headerRight: () =>
                <Icon 
                style={{paddingRight:10}} 
                name="md-search" size={30}
                onPress={()=> alert("search modal supposed to show up!")}
                />
            }
        }
    }
})

export default StackMapNavigation;