import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import StackTabNavigation from "./StackTabNavigation";
import TempScreen from "../Screens/TempScreen";
import Profile from "../Screens/Profile";
import Activities from "../Screens/Activities";
import DirectMessages from "../Screens/DirectMessages";
import About from "../Screens/About";

import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { Avatar } from 'react-native-elements';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

{/*We want to custom the drawer navigator so here is the component that the drawer navigator will render*/}
const customDrawerContentComponent = props => (
    <SafeAreaProvider>
    <ScrollView>
        <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}
        >
            <View style={styles.header}>
                {/*contains user's avatar and name*/}
                <View style={styles.userInfo}>
                    <Avatar size="medium" rounded title="MT" activeOpacity={0.7} />
                    <Text style={{marginLeft: 5, fontSize: 18}}>Username</Text>
                </View>
                {/*contains number of trees and watering*/}
                <View style={styles.efforts}>
                    <View>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', /*borderWidth: 1*/}}>
                        <MaterialCommunityIcons name={'tree'} size={30} color={'#009933'}/> 
                        <Text style={{fontSize: 15}}> Number of tree </Text>
                    </View>
                    <View style={{paddingLeft: 5,flex: 1, flexDirection: 'row', alignItems: 'center',/*borderWidth: 1*/}}>
                        <Ionicons name={'ios-water'} size={30} color={'deepskyblue'}/>
                        <Text style={{fontSize: 15}}>  Number of watering </Text>
                    </View>
                    </View>
                </View>
            </View>

            <View style={styles.options}> 
                <DrawerItems {...props} />
            </View>
        </SafeAreaView>
    </ScrollView>
    {/*Here is the footer that has logout button*/}
    <View style={styles.footer}>
        <TouchableOpacity 
        onPress={()=> props.navigation.navigate('Login_SignUp')}
        style={styles.logoutButton}>
            <Ionicons name={'md-log-out'} size={25} color={'red'}/>
            <Text style={{fontSize: 14, fontWeight: 'bold', padding: 5, color: 'red'}}>Logout</Text>
        </TouchableOpacity>
    </View>
    </SafeAreaProvider>
)

{/*This is the styleing for the component above ^*/}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    padding: 5,
    flex: 1,
    // borderWidth: 1,
    borderColor: 'red',
  },
  userInfo:{
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
    // borderWidth: 1,
    borderColor: 'purple'
  },
  efforts:{
    flex: 2,
    alignItems: 'flex-start',
    // borderWidth: 1,
    borderColor: 'pink',
    padding: 5,
    paddingLeft: 15
  },
  options:{
    padding: 1,
    flex: 8,
    // borderWidth: 1,
    borderColor: 'blue',
  },
  footer:{
    flex: 1,
    flexDirection: 'column-reverse',
    // borderWidth: 1,
    borderColor: 'green',
  },
  logoutButton:{
      padding: 15,
      flexDirection: 'row',
      alignItems: 'center'
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
    Temp:{
        screen: TempScreen,
        navigationOptions:{
            drawerLabel: "Temp",
            drawerIcon: ({tintColor}) => (
                <Ionicons name={'ios-remove'} color={tintColor} style={{marginTop: 7}} size={27} />
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
            drawerIcon: ({tintColor}) => (
                <Ionicons name={'md-flash'} color={tintColor} style={{marginTop: 7}} size={27} />
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