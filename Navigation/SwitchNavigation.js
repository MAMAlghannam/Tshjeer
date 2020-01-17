import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Login_SignUp from "../Screens/Login_SignUp";
import DrawerNavigation from "./DrawerNavigation";

const SwitchNavigation = createSwitchNavigator({
    Login_SignUp: { screen: Login_SignUp},
    Home: { screen: DrawerNavigation }
  }); 

const AppContainer = createAppContainer(SwitchNavigation);

export default AppContainer;