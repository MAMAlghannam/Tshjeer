import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Search from '../Screens/Search';
import SearchButton from '../Components/SearchButton';
import Map from '../Screens/Map';
import Icon from '@expo/vector-icons/Ionicons';

//Since we want search screen in modal so we have to make two separated 'createStackNavigator's for that purpos 

//This contains all possible screens to navigate unless Search screen  
const MainStack = createStackNavigator({
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
                <SearchButton navigation={navigation}/>
            }
        }
    },
},
{
    navigationOptions:{
        headerShown: false
    }
});

const StackMapNavigation = createStackNavigator({
    Main:{
        screen: MainStack,
    },
    Search:{
        screen: Search
    }
},
{
    mode: 'modal',
    headerMode: 'none',
})

export default StackMapNavigation;