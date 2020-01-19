import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import TabNavigation from './TabNavigation';

const StackTabNavigation = createStackNavigator({
    Home: TabNavigation
},{
    headerMode: 'none'
});

export default StackTabNavigation;