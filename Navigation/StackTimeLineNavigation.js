import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import TimeLine from '../Screens/TimeLine';
import Icon from '@expo/vector-icons/Ionicons';
import Search from '../Screens/Search';
import SearchButton from '../Components/SearchButton';
import ListButton from '../Components/ListButton';
import Profile from '../Screens/Profile';
import Plants from '../Screens/Plants';
import Watering from '../Screens/Watering';
import Questions from '../Screens/Questions';
import CommentsScreen from '../Screens/CommentsScreen';

//Since we want search screen in modal so we have to make two separated 'createStackNavigator's for that purpos 

//This contains all possible screens to navigate unless Search screen
const MainStack = createStackNavigator({
    TimeLine:{
        screen: TimeLine,
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
                <SearchButton navigation={navigation}/>,
            }
        }
    },
    Comments:{
        screen: CommentsScreen
    }, 
    ProfileInTimeLine:{ 
        screen: Profile,
    },
    Plants: {
        screen: Plants
    },
    Watering: {
        screen: Watering
    },
    Questions: {
        screen: Questions
    }
},
{
    navigationOptions:{
        headerShown: false
    }
});

const StackTimeLineNavigation = createStackNavigator({
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
});

export default StackTimeLineNavigation;