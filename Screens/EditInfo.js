import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard 
} from "react-native";
import Expo from 'expo'
import { Icon, Thumbnail, Button } from "native-base";

//importing from API folder
import changeBio from "../API/changeBio";
import getUserByUID from '../API/getUserByUID';

class EditInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      avatar: "'../images/avatarImg.png'",
      bio: ""
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false
    };
  }

  takeBioFromUser = text => {
    this.setState({ bio: text });
  }

  sendBioToDatabase = () => {
    console.log("bio before sending it to the database" + this.state.bio);
    changeBio(this.state.bio);
  }

  async componentDidMount(){

    const { uid } = this.props.navigation.state.params;

    var { avatar, username, bio, email } = await getUserByUID(uid)
    this.setState({avatar, username, bio, email})
  }

  render() {

    const { username, avatar, bio, email } = this.state;

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback 
          style={{flex: 1}}
          onPress={Keyboard.dismiss}
        >
        <View style={styles.UserInfoAndAvatar}>
          <View style={styles.avatar}>
            <Thumbnail
              style={{
                width: 180,
                height: 180,
                alignContent: "center",
                backgroundColor: "black"
              }}
              source={{ uri: avatar }}
            />
          </View>
          <View style={styles.UserInfo}>
            <TextInput
              style={styles.UserInfoTextInput}
              placeholder={bio}
              value={bio}
              multiline
              onChangeText={this.takeBioFromUser}
            />

            <TextInput style={styles.UserInfoTextInput} editable={false}>
              {username}
            </TextInput>
            <TextInput style={styles.UserInfoTextInput} editable={false}>
              {email}
            </TextInput>
          </View>
        </View>
          </TouchableWithoutFeedback>
        <View style={styles.BackAndSaveButtons}>
          <View style={{ flex: 1 }}>
            <Button
              warning
              iconLeft
              title="Cancel"
              onPress={() => this.props.navigation.goBack()}
              style={{ alignContent: "center", padding: 5, justifyContent: 'center'}}
            >
              {/* <Icon name="arrow-back" /> */}
              <Text style={{color: 'white'}}> Cancel </Text>
            </Button>
          </View>
          <View style={{ flex: 1 }}>
            <Button
              success
              title="Save"
              onPress={() => this.sendBioToDatabase()}
              style={{alignContent: "center", padding: 5, justifyContent: 'center'}}
            >
              <Text style={{color: 'white'}}> Save </Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    paddingTop: Expo.Constants.statusBarHeight,
    backgroundColor: "#e1e8ee"
  },
  backButton: {
    backgroundColor: "#e1e8ee",
    padding: 20,
    alignSelf: "stretch",
    alignItems: "center"
  },

  BackAndSaveButtons: {
    flexDirection: "row"
  },
  UserInfoAndAvatar: {
    flex: 1
    // alignContent: "flex-start",
  },
  avatar: {
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row-reverse",
    marginTop: 40
  },
  UserInfo: {
    marginTop: 40,
    alignContent: "center",
    flex: 2,
    padding: 10
  },
  UserInfoTextInput: {
    borderBottomColor: "green",
    borderBottomWidth: 0.5,
    fontSize: 18,
    padding: 10
  }
});

export default EditInfo;
