import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import StackAddNavigation from "./StackAddNavigation";
import StackMapNavigation from "./StackMapNavigation";
import StackTimeLineNavigation from "./StackTimeLineNavigation";
import { createStackNavigator } from "react-navigation-stack";
import NewQuestion from "../Screens/NewQuestion";
import CameraStackNavigation from "./CameraStackNavigation";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

import MapIcon from "@expo/vector-icons/FontAwesome";
import PlusIcon from "@expo/vector-icons/MaterialCommunityIcons";
import TimeLineIcon from "@expo/vector-icons/MaterialIcons";

//Since we want the user be focused on uploading the post we put the screen on different stack to show it as modal.
// I hope that was clear :)

//This is the Tab navigator contains Map, Add and Timeline screens
const MainTab = createBottomTabNavigator(
  {
    Map: {
      screen: StackMapNavigation,
      navigationOptions: {
        tabBarLabel: " الخريطة ",
      },
    },
    Add: {
      screen: StackAddNavigation,
      navigationOptions: {
        tabBarLabel: "اضافة ",
      },
    },
    Timeline: {
      screen: StackTimeLineNavigation,
      navigationOptions: {
        tabBarLabel: "التايم لاين ",
      },
    },
  },
  {
    initialRouteName: "Add",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent;
        let iconName;
        if (routeName == "Map") {
          iconName = focused ? "map" : "map-o";
          IconComponent = MapIcon;
        } else if (routeName == "Add") {
          iconName = focused ? "plus-circle" : "plus-circle-outline";
          IconComponent = PlusIcon;
        } else {
          iconName = focused ? "people" : "people-outline";
          IconComponent = TimeLineIcon;
        }

        return (
          <IconComponent
            name={iconName}
            color={tintColor}
            style={{ marginTop: 7 }}
            size={27}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: "#8FBC8F",
      backgroundColor: "#8FBC8F",
    },
  }
);

const HomeTabNavigation = createStackNavigator(
  {
    Main: {
      screen: MainTab,
    },
    AddPost: {
      screen: CameraStackNavigation, //CameraScreen
    },
    AddQuestion: {
      screen: NewQuestion,
    },
  },
  {
    mode: "modal",
    headerMode: "none",
  }
);

export default HomeTabNavigation;
