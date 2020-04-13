import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Add from '../Screens/Add';
import TempScreen from '../Screens/TempScreen'
import Icon from '@expo/vector-icons/Ionicons';
import Search from '../Screens/Search';
import SearchButton from '../Components/SearchButton';
import ListButton from '../Components/ListButton';
import CameraScreen from '../Screens/Camera';

//Since we want search screen in modal so we have to make two separated 'createStackNavigator's for that purpos 

//This contains all possible screens to navigate unless Search screen
const MainStack = createStackNavigator({
    Add:{
        screen: Add,
        navigationOptions:({navigation})=>{
            return{
            headerTitle: "Tshjeer",
            headerTitleStyle:{ color: "white", fontSize: 20 },
            headerStyle:{
                backgroundColor: '#8FBC8F',
                borderBottomWidth: 1,
                borderBottomColor: 'lightgrey',
            },
            headerLeft: () =>
                <ListButton navigation={navigation} />,
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