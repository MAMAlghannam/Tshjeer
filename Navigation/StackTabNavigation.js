import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import TabNavigation from './TabNavigation';
import Icon from '@expo/vector-icons/Ionicons';

const StackTabNavigation = createStackNavigator({
    Home: TabNavigation
},
{   //not used it's in StackAddNavigation, ....
    defaultNavigationOptions:({navigation})=>{
        return{
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
});

export default StackTabNavigation;