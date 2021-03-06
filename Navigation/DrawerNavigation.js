import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import StackTabNavigation from "./StackTabNavigation";
import TempScreen from "../Screens/TempScreen";
import Profile from "./ProfileStackNavigation";
import Activities from "../Screens/Activities";
import DirectMessages from "../Screens/DirectMessages";
import About from "../Screens/About";
import ActivitiesIcon from '../Components/ActivitiesIcon';

import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { Avatar } from 'react-native-elements';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

// firebase/auth
import firebase from 'firebase/app';
import 'firebase/auth'

//importing from API
import { seen } from '../API/notifyUser';

import getUserBriefInfo from '../API/getUserBriefInfo';

{/*We want to custom the drawer navigator so here is the component that the drawer navigator will render*/}
const customDrawerContentComponent = props => {
    // when logout button pressed
    const [loggingOut, setLoggingOut] = useState(false);
    const [avatar, setAvatar] = useState("../images/avatarImg.png");
    const [username, setUsername] = useState("");
    const [nTrees, setNTrees] = useState(0);
    const [nWatered, setNWatered] = useState(0);
    
    useEffect(()=>{ 
        getUserBriefInfo(setAvatar, setUsername, setNTrees, setNWatered) 
    });

    return (
    <SafeAreaProvider>
        
    <ScrollView  style={{ backgroundColor:"#8FBC8F"}}>
        <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.header}>
                {/*contains user's avatar and name*/}
                <View style={styles.userInfo}>
                    <Avatar size="medium" source={{uri: avatar, cache: 'force-cache'}} rounded title="username" activeOpacity={0.7} />
                    <Text style={{marginLeft: 5, fontSize: 18,color:"white"}}>{username}</Text>
                </View>
                {/*contains number of trees and watering*/}
                <View style={styles.efforts}>
                    <View style={{padding: 5, flexDirection: 'row', alignItems: 'center', }}>
                        <MaterialCommunityIcons name={'tree'} size={30} color={'#009933'}/> 
                        <Text style={{fontSize: 15}}> {nTrees} </Text>
                    </View>
                    <Text>{"   "}</Text>
                    <View style={{padding: 5,flexDirection: 'row', alignItems: 'center', }}>
                        <Ionicons name={'ios-water'} size={30} color={'deepskyblue'}/>
                        <Text style={{fontSize: 15}}>  {nWatered} </Text>
                    </View>
                </View>
            </View>

            <View style={styles.options}> 
                <DrawerItems 
                    {...props}
                    onItemPress={({route, focused}) =>{
                        if(route.key == "Activities")
                            seen();
                        props.onItemPress({route, focused})
                    }} 
                />
            </View>
        </SafeAreaView>
    
    {/*Here is the footer that has logout button*/}
    <View style={styles.footer}>
        <TouchableOpacity disabled={loggingOut}
        onPress={()=> {setLoggingOut(true); firebase.auth().signOut()}}
        style={styles.logoutButton}>
        {//when "loggingOut" is true ActivityIndicator will appear, otherwise ... 
        loggingOut ? 
            <View style={{flexDirection: 'row'}}>
                <ActivityIndicator size="small" color="red" />
                <Text style={styles.logoutLabel}>Loggin out...</Text>
            </View> 
        :   <View style={{flexDirection: 'row'}}>
                <Ionicons name={'md-log-out'} size={25} color={'red'}/>
                <Text style={styles.logoutLabel}>Logout</Text>
            </View>
        }   
        </TouchableOpacity>
    </View></ScrollView>
    </SafeAreaProvider>
    )
    }
{/*This is the styling for the component above ^*/}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    padding: 5,
    flex: 1,
  },
  userInfo:{
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  efforts:{
    flex: 2,
    flexDirection: 'row',
    padding: 5
  },
  options:{
    padding: 1,
    flex: 8,
    color:'#FFFF',
  },
  footer:{
    flex: 1,
    flexDirection: 'column-reverse',
  },
  logoutButton:{
      padding: 15,
      flexDirection: 'row',
      alignItems: 'center'
  },
  logoutLabel:{
    fontSize: 14, 
    fontWeight: 'bold', 
    padding: 5, 
    color: 'red'
  }
});

const DrawerNavigation = createDrawerNavigator({
    Home:{
        screen: StackTabNavigation,
        navigationOptions:{
            drawerLabel: "Home",
            drawerIcon: ({tintColor}) => (
                <Ionicons name={'md-home'} color={tintColor} style={{marginTop: 7}} size={27} />
            )
        }
    },
    
    Profile:{
        screen: Profile,
        navigationOptions:{
            drawerLabel: "Profile",
            drawerIcon: ({tintColor}) => (
                <Ionicons name={'ios-contact'} color={tintColor} style={{marginTop: 7}} size={27} />
            )
        }
    },
    Activities:{
        screen: Activities,
        navigationOptions:{
            drawerLabel: "Activities",
            drawerIcon: ({tintColor, navigation}) => (
                <ActivitiesIcon navigation={navigation} color={tintColor} />
            )
        }
    },
    DirectMessages:{
        screen: DirectMessages,
        navigationOptions:{
            drawerLabel: "Direct Messages",
            drawerIcon: ({tintColor}) => (
                <Ionicons name={'ios-mail'} color={tintColor} style={{marginTop: 7}} size={27} />
            )
        }
    },
    About:{
        screen: About,
        navigationOptions:{
            drawerLabel: "About",
            drawerIcon: ({tintColor}) => (
                <Ionicons name={'ios-information-circle-outline'} color={tintColor} style={{marginTop: 7}} size={27} />
            )
        }
    }
},
{   
    contentComponent: customDrawerContentComponent,
    contentOptions:{
        activeTintColor: 'green'
    }
});

export default DrawerNavigation;