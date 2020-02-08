import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons ,Entypo} from "@expo/vector-icons";

export default function SignUp() {
  return (
    
    <View style={{ flex: 1 }}>
      <LinearGradient
        start={{ x: 2, y: 0 }}
        end={{ x: 0, y: 2 }}
        colors={["#f5fffc", "#71b280"]}
        style={{ flex: 1 }}
        
      >
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 3
            }}
          >

         
          </View>
           <View style={{marginTop:120}}>
          <View style={styles.inputContainer}>
            <Entypo
              style={styles.icon}
              name="user"
              size={30}
              color="#FFFFFF"
            />
            <TextInput
              placeholder="Username "
              style={styles.input}
              multiline={false}
            />
            
          </View>
          <View style={styles.inputContainer}>
            <Ionicons
              style={styles.icon}
              name="md-mail"
              size={30}
              color="#FFFFFF"
            />
            <TextInput
              placeholder="Email"
              style={styles.input}
              multiline={false}
            />
            
          </View><View style={styles.inputContainer}>
            <Ionicons
              style={styles.icon}
              name="md-lock"
              size={30}
              color="#FFFFFF"
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              multiline={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons
              style={styles.icon}
              name="md-lock"
              size={30}
              color="#FFFFFF"
            />
            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              multiline={false}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            </View>
            
          </View>
          <View style={styles.buttonContainer}>
          <TouchableOpacity  onPress={() => this.props.navigation.navigate('Home')} style={styles.button}>
              <Text style={{ color: "#71b280" }}>Sign up</Text>
              <Ionicons
                style={{ marginStart: 10 }}
                name="md-arrow-round-forward"
                size={30}
                color="#71b280"
              />
            </TouchableOpacity >
          </View>
          <View style={styles.bottom}>
            <View style={styles.signupContainer}>
              <Text style={{ color: "#FFFFFF" }}>or signup with</Text>
              <TouchableOpacity style={styles.signupButton}>
                <Ionicons name="logo-facebook" size={30} color="#71b280" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.signupButton}>
                <Ionicons name="logo-google" size={30} color="#71b280" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    
  },

  inputContainer: {
    margin: 10,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    flexDirection: "row",
    padding: 5,
    alignItems: "stretch",
    overflow: "hidden",
    borderRadius:50,
    backgroundColor:'rgba(250, 250, 250,0.3)'
    
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 17
  },
  icon: {
    marginEnd: 10
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  signupButton: {
    marginHorizontal: 5,
    backgroundColor: "#FFFFFF",
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  signupContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});