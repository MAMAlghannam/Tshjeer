import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Search from '../Screens/Search'; 
import CommentsScreen from '../Screens/CommentsScreen';
import SearchButton from '../Components/SearchButton';
import Map from '../Screens/Map';
import Icon from '@expo/vector-icons/Ionicons';
import PostContainerInMap from '../Screens/PostContainerInMap';
import Profile from '../Screens/Profile';
import Plants from '../Screens/Plants';
import Watering from '../Screens/Watering';
import Questions from '../Screens/Questions';
import Points from '../Screens/Points';
//Since we want search screen in modal so we have to make two separated 'createStackNavigator's for that purpos 

//This contains all possible screens to navigate unless Search screen  
const MainStack = createStackNavigator({
    Map:{
        screen: Map,
        navigationOptions:({navigation})=>{
            return{
            headerTitle: "Tshjeer",
            headerTitleStyle:{ color: "white", fontSize: 20 },
            headerStyle:{
                backgroundColor: '#008B45',
                borderBottomWidth: 1,
                borderBottomColor: 'lightgrey',
            },
            headerLeft: () =>
                <Icon 
                color="white"
                style={{paddingLeft:10, paddingLeft:10}} 
                name="md-menu" size={30}
                onPress={()=>navigation.openDrawer()}
                />,
            headerRight: () =>
                <SearchButton navigation={navigation}/>
            }
        }
    },
    PostContainerInMap: {
        screen: PostContainerInMap
    },
    Comments:{
        screen: CommentsScreen
    }, 
    ProfileInMap:{ 
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
    },
    Points: {
        screen: Points
    },
},
{
    navigationOptions:{
        headerShown: true
    },
    initialRouteName: "Map"
});

const StackMapNavigation = createStackNavigator({
    Main:{
        screen: MainStack,
    },
    Search:{
        screen: Search
    },
},
{
    mode: 'modal',
    headerMode: 'none',
})

export default StackMapNavigation;