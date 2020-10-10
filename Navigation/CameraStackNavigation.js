import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Camera from "../Screens/Camera";
import NewPost from "../Screens/NewPost";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const CameraStackNavigator = createStackNavigator(
  {
    Camera: {
      screen: Camera,
    },
    PictureTook: {
      screen: NewPost,
      navigationOptions: {
        headerTitle: "New Post",
      },
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerRight: () => (
          <MaterialIcons
            style={{ paddingRight: 10, paddingLeft: 10 }}
            name="close"
            size={30}
            onPress={() => navigation.navigate("Add")}
          />
        ),
      };
    },
  }
);

export default CameraStackNavigator;
