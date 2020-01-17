import {createBottomTabNavigator} from 'react-navigation-tabs';
import Map from '../Screens/Map';
import TimeLine from '../Screens/TimeLine';

/* * * */
import StackAddNavigation from './StackAddNavigation';
import StackMapNavigation from './StackMapNavigation';
import StackTimeLineNavigation from './StackTimeLineNavigation';

const HomeTabNavigation = createBottomTabNavigator({
    StackMapNavigation,
    StackAddNavigation,
    StackTimeLineNavigation
},
{
    navigationOptions:{
        headerShown: false,
        headerTitle: "Tshjeer"
    }
});

export default HomeTabNavigation;