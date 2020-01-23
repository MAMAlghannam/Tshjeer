import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
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
    },
    {
      name: 'Fares',
    },
    {
      name: 'Fares',
    },
    {
      name: 'Fares',
    },
    {
      name: 'Fares',
    },
    {
      name: 'Fares',
    },
    {
      name: 'Fares',
    },
    {
      name: 'Fares',
    },
    {
      name: 'Fares',
    },
    {
      name: 'Fares',
    },
    {
      name: 'Fares',
    },
    {
      name: 'Fares',
    },
    {
      name: 'Fares',
    },
    {
      name: 'Fares',
    },
    {
      name: 'Fares',
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
                <ScrollView style={{}}>
                      {
                      list.map((l, i) => (
                        <ListItem
                          key={i}
                          leftAvatar={{ source: { uri: l.avatar_url } }}
                          title={l.name}
                          subtitle={l.subtitle}
                          bottomDivider
                          onPress={()=>{}}
                        />
                      ))
                    }
                </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
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
    }
})


           

export default Search;