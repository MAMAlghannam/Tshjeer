import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Add from '../Screens/Add';
import TempScreen from '../Screens/TempScreen'
import Icon from '@expo/vector-icons/Ionicons';
import Search from '../Screens/Search';
import SearchButton from '../Components/SearchButton';
import CameraScreen from '../Screens/Camera';

//Since we want search screen in modal so we have to make two separated 'createStackNavigator's for that purpos 

//This contains all possible screens to navigate unless Search screen
const MainStack = createStackNavigator({
    Add:{
        screen: Add,
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
                <SearchButton navigation={navigation}/>
            }
        }
    },
},
{
    navigationOptions:{
        headerShown: false
    }
})

const StackAddNavigation = createStackNavigator({
    Main:{
        screen: MainStack
    },
    Search:{
        screen: Search
    }
},
{
    mode: 'modal',
    headerMode: 'none'
})

export default StackAddNavigation;