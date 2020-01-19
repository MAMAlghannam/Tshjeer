import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import StackAddNavigation from './StackAddNavigation';
import StackMapNavigation from './StackMapNavigation';
import StackTimeLineNavigation from './StackTimeLineNavigation';
import { createStackNavigator } from 'react-navigation-stack';
import CameraScreen from '../Screens/Camera';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

//Since we want the user be focused on uploading the post we put the screen on different stack to show it as modal.
// I hope that was clear :)

//This is the Tab navigator contains Map, Add and Timeline screens
const MainTab = createBottomTabNavigator({
    Map: {
        screen: StackMapNavigation,
        navigationOptions:{
            tabBarLabel: " ",
            tabBarIcon: ({tintColor}) => (
                <SimpleLineIcons name={'map'} color={tintColor} style={{marginTop: 7}} size={27} />
            )
        }
    },
    Add: {
        screen: StackAddNavigation,
        navigationOptions:{
            tabBarLabel: " ",
            tabBarIcon: ({tintColor}) => (
                <SimpleLineIcons name={'plus'} color={tintColor} style={{marginTop: 7}} size={27} />
            )
        }
    },
    Timeline: {
        screen: StackTimeLineNavigation,
        navigationOptions:{
            tabBarLabel: " ",
            tabBarIcon: ({tintColor}) => (
                <SimpleLineIcons name={'people'} color={tintColor} style={{marginTop: 7}} size={27} />
            )
        }
    }
},
{
    tabBarOptions:{
        activeTintColor: 'green'
    }
}
);

const HomeTabNavigation = createStackNavigator({
    Main: {
        screen: MainTab
    },
    AddPost: {
        screen: CameraScreen
    }
},{
    mode: 'modal',
    headerMode: 'none'
});

export default HomeTabNavigation;