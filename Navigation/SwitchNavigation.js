import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Login_SignUp from "../Screens/Login_SignUp";
import DrawerNavigation from "./DrawerNavigation";
import SignUp from"../Screens/SignUp";
import CheckAuth from '../Screens/CheckAuth';

const SwitchNavigation = createSwitchNavigator({
    checkAuth: { screen: CheckAuth },
    Login_SignUp: { screen: Login_SignUp},
    Home: { screen: DrawerNavigation },
    SignUp: { screen: SignUp}
  },
  {
    initialRouteName: "checkAuth"
  }); 

const AppContainer = createAppContainer(SwitchNavigation);

export default AppContainer;