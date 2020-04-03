import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Profile from '../Screens/Profile';
import Plants from '../Screens/Plants';
import Watering from '../Screens/Watering';
import Questions from '../Screens/Questions';
import Points from '../Screens/Points';
import EditInfo from '../Screens/EditInfo';
import Icon from '@expo/vector-icons/Ionicons';
import CommentsScreen from '../Screens/CommentsScreen';

//suggested
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const ProfileAndEditInfo = createStackNavigator({
    Main:{
        screen: Profile,
        navigationOptions: ({navigation}) => {
            return {  
                headerTitleStyle:{ color: "white", fontSize: 20 },
                headerStyle:{
                    backgroundColor: '#8FBC8F',
                    borderBottomWidth: 1,
                    borderBottomColor: 'lightgrey',
                }
            }
        }
    },
    EditInfo:{
        screen: EditInfo
    }
},
{
    mode: 'modal',
    // headerMode: 'none',
    defaultNavigationOptions:({navigation})=>{
        return{
            headerLeft: () =>
            <Icon 
            color="white"
            style={{paddingLeft:10}} 
            name="md-menu" size={30}
            onPress={()=>navigation.openDrawer()}
            />,
        }
    }

})

const ProfileStackNavigation = createStackNavigator({
    Profile:{ 
        screen: ProfileAndEditInfo,
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
    Comments:{
        screen: CommentsScreen
    },
},
{
    headerMode: 'none',
    initialRouteName: "Profile",
    defaultNavigationOptions:({navigation})=>{
        return{
        headerLeft: () =>
            <Icon 
            color="red"
            style={{paddingLeft:10}} 
            name="md-menu" size={30}
            onPress={()=>navigation.openDrawer()}
            />,
        }
    }
})

export default ProfileStackNavigation;