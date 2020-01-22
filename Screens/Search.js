import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SearchBar, ListItem, FlatList } from 'react-native-elements';
  
  
const list = [
    {
      name: 'Mohammed',
    },
    {
      name: 'Abdullah',
     
    },
    {
      name: 'Fares',
    }
  ]

class Search extends React.Component{



    render(){
        return(
            <View style={styles.container}>
                <View style={styles.barContainer}>
                    <SearchBar
                        containerStyle={styles.serachBar}
                        placeholder="Type Here..."
                        lightTheme={true}
                        round 
                    />
                    <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={() => this.props.navigation.goBack()}
                     >
                      <Text style={{color:'#86939e'}}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.listContainer}>
                      {
                      list.map((l, i) => (
                        <ListItem
                          key={i}
                          leftAvatar={{ source: { uri: l.avatar_url } }}
                          title={l.name}
                          subtitle={l.subtitle}
                          bottomDivider
                        />
                      ))
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        borderWidth: 1,
        padding: 3,
        backgroundColor:'#e1e8ee',
        paddingTop: Expo.Constants.statusBarHeight,
    },
    barContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#e1e8ee'
    },
    serachBar:{
        flex: 4,

    },
    cancelButton:{
        flex: 1,
        backgroundColor:'#e1e8ee',
        
    },
    listContainer:{
        flex: 10,
        padding: 3
    }
})


           

export default Search;