import {createDrawerNavigator} from 'react-navigation-drawer';
import StackTabNavigation from "./StackTabNavigation";
import TempScreen from "../Screens/TempScreen";
import Profile from "../Screens/Profile";
import Activities from "../Screens/Activities";
import DirectMessages from "../Screens/DirectMessages";
import About from "../Screens/About";

const DrawerNavigation = createDrawerNavigator({
    Home:{
        screen: StackTabNavigation
    },
    Temp:{
        screen: TempScreen
    },
    Profile:{
        screen: Profile
    },
    Activities:{
        screen: Activities
    },
    DirectMessages:{
        screen: DirectMessages
    },
    About:{
        screen: About
    }
});

export default DrawerNavigation;