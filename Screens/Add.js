import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
} from "react-native";

export default class Add extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.buttonContainer]}>
          <ImageBackground
            style={{
              height: "100%",
              width: "100%",
              opacity: 0.9,
              overflow: "hidden",

              position: "absolute",
            }}
            source={require("../assets/8.jpg")}
          />
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => this.props.navigation.navigate("AddPost")}
          >
            <Text style={styles.text}>LET'S Plant</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <View
            style={{ borderWidth: 2, width: "100%", borderColor: "#8FBC8F" }}
          ></View>
        </View>

        <View style={[styles.buttonContainer]}>
          <ImageBackground
            style={{
              height: "100%",
              width: "100%",
              opacity: 0.7,

              overflow: "hidden",
              position: "absolute",
            }}
            source={require("../assets/quseionnew1.jpg")}
          />
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => this.props.navigation.navigate("AddQuestion")}
          >
            <Text style={styles.text2}>JUST ASK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    borderRadius: 15,
    padding: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#8FBC8F",
  },
  text: {
    marginTop: 150,
    fontSize: 42,
    color: "white",
    fontWeight: "bold",
  },
  text2: {
    marginTop: 150,
    fontSize: 42,
    color: "green",
    fontWeight: "bold",
  },
});
