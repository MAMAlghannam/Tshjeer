import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import TimeLine from '../Screens/TimeLine';
import Icon from '@expo/vector-icons/Ionicons';

const StackTimeLineNavigation = createStackNavigator({
    TimeLine:{
        screen: TimeLine,
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

export default StackTimeLineNavigation;