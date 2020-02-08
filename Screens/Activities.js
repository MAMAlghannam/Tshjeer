
import React from 'react';
import { StyleSheet,
          Text,
          View,
          TouchableOpacity,
          SafeAreaView,
          FlatList 
        } from 'react-native';
import {ListItem,
      
        Avatar 
      } from 'react-native-elements'
      import { Card, CardItem, Thumbnail, Body, Left, Right, Button ,Content,Item ,Input ,Container, Header} from 'native-base'
      import { Ionicons, EvilIcons ,Feather,FontAwesome,MaterialIcons,AntDesign, Entypo} from '@expo/vector-icons';
const list = [
    {
      name: 'Mohammed',
      action:"Liked your post ",
      id:1
    },
    {
      name: 'Abdullah',
      action: 'Added you as a friend',
     id:2
    },
    {
      name: 'Fares',
      action : "Watered your plant",
      id:3
    },
    {
      name: 'Mohammed',
      action:"Liked your post ",
      id:4
    },
    {
      name: 'Abdullah',
      action: 'Added you as a friend',
     id:5
    },
    {
      name: 'Fares',
      action : "Watered your plant",
      id:6
    },
    {
      name: 'Mohammed',
      action:"Liked your post ",
      id:7
    },
    {
      name: 'Abdullah',
      action: 'Added you as a friend',
     id:8
    },
    {
      name: 'Fares',
      action : "Watered your plant",
      id:9
    },
    {
      name: 'Mohammed',
      action:"Liked your post ",
      id:10
    },
    {
      name: 'Abdullah',
      action: 'Added you as a friend',
     id:11
    },
    {
      name: 'Fares',
      action : "Watered your plant",
      id:12
    },
    {
      name: 'Mohammed',
      action:"Liked your post ",
      id:13
    },
    {
      name: 'Abdullah',
      action: 'Added you as a friend',
     id:14
    },
    {
      name: 'Fares',
      action : "Watered your plant",
      id:15
    },
    {
      name: 'Mohammed',
      action:"Liked your post ",
      id:16
    },
    {
      name: 'Abdullah',
      action: 'Added you as a friend',
     id:17
    },
    {
      name: 'Fares',
      action : "Watered your plant",
      id:18
    },
    {
      name: 'Mohammed',
      action:"Liked your post ",
      id:19
    },
    {
      name: 'Abdullah',
      action: 'Added you as a friend',
     id:20
    },
    {
      name: 'Fares',
      action : "Watered your plant",
      id:21
    },
    {
      name: 'Mohammed',
      action:"Liked your post ",
      id:22
    },
    {
      name: 'Abdullah',
      action: 'Added you as a friend',
     id:23
    },
    {
      name: 'Fares',
      action : "Watered your plant",
      id:24
    }
  ]
export default class Activities extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Username",
    }
  };

  
  render(){
    const { navigation } = this.props;
  return (
    <SafeAreaView style={styles.container}>

                <View >
                <Header stylez style={{backgroundColor:"white"}}> 
                        <Left>
                            <Button transparent title="EditInfo" onPress={()=>this.props.navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={30} color="black" />
                         
                              </Button>
                              
                              
                        </Left>
                        
                    
                        </Header> 
                      {
                       
                      
                        <FlatList
                        data={list}
                        renderItem={({item}) =>
                         
                          <View style={styles.listContainer}>
                            
                               <Thumbnail source={require('../assets/5.jpeg')} 
                                    onPress={() => alert("you have pressed avatar!")}
                                    activeOpacity={0.4}
                                    style={styles.avatar}
                                    
                                  />
                                <View style={styles.NameAndActionView}>

                                  <View style={styles.Button}>
                                    <TouchableOpacity
                                    onPress={() => alert("you have pressed username!")}
                                    ><Text style={{ fontWeight: "900" , color:"#43a047"}}> {item.name}</Text></TouchableOpacity>
                                  </View>

                                  <View style={styles.ActionStyle}>
                                    <Text >{item.action}</Text>
                                  </View>

                                </View>
                          </View>
                      }
                      keyExtractor={item => item.id.toString()}
                      />                  
                    }
                </View>
    </SafeAreaView>
  );
}}

const styles = StyleSheet.create({
  container: {
    paddingTop: Expo.Constants.statusBarHeight,
  },
  avatar:{
    flex:0.4
  },
  listContainer:{
    marginTop:5,
    padding: 3,
    borderBottomWidth:1,
    borderBottomColor:'white',
    flexDirection:'row',
    padding:5
},
  Button:{
    flex:2,
    alignItems:'flex-start',
 
  },
  ActionStyle:{
    alignItems: 'flex-end',
  },
  NameAndActionView:{
    flex:2,
    marginLeft:20,
    marginTop:20,
    flexDirection:'row'
  }
});

 
