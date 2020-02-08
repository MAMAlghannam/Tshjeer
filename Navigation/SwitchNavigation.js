import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Login_SignUp from "../Screens/Login_SignUp";
import DrawerNavigation from "./DrawerNavigation";
import SignUp from"../Screens/SignUp";

const SwitchNavigation = createSwitchNavigator({
    Login_SignUp: { screen: Login_SignUp},
    Home: { screen: DrawerNavigation },
    SignUp: { screen: SignUp}
  }); 

const AppContainer = createAppContainer(SwitchNavigation);

export default AppContainer;