import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Keyboard
} from "react-native";
import Expo from 'expo'
import { SearchBar, ListItem, FlatList } from "react-native-elements";
import search from "../API/searchUser";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchedUser: "",
      loading: false,
      userFound: []
    };
  }

  fillUserFound = searchedUserFound => {
    this.setState({ userFound: searchedUserFound });
  };

  searchedUserFunction = text => {
    // first we will change the state (searchedUser = what the user typed)
    if(text == ""){
      this.setState({ searchedUser: text ,userFound: [] });
      return ;
    }
    
    this.setState({ searchedUser: text });
    search(this.fillUserFound, text);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.barContainer}>
          <SearchBar
            containerStyle={styles.serachBar}
            placeholder="Type Here..."
            lightTheme={true}
            round
            onChangeText={text => this.searchedUserFunction(text)}
            value={this.state.searchedUser}
          />

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={{ color: "#86939e" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          <ScrollView onScroll={Keyboard.dismiss}>
            {this.state.userFound.map((user, index) => (
              <ListItem
                key={index}
                leftAvatar={{source: {uri: user.avatar}}}
                title={user.username}
                bottomDivider
                onPress={() => {
                  alert("pressed");
                }}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e8ee",
    paddingTop: Expo.Constants.statusBarHeight
  },
  barContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e8ee"
  },
  serachBar: {
    flex: 4
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#e1e8ee"
  },
  listContainer: {
    flex: 10
  }
});

export default App;
