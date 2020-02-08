import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,ScrollView 
} from "react-native";

import { Card, CardItem, Thumbnail, Body, Left, Right, Button ,Content,Item ,Input ,Container, Header} from 'native-base'
import { Ionicons, EvilIcons ,Feather,FontAwesome,MaterialIcons,AntDesign, Entypo} from '@expo/vector-icons';


export default class Profile extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Username",
    }
  };

  render(){
    const { navigation } = this.props;
    return (
      < Container>
    
      
      <ScrollView>
            <Card>
                <CardItem  style={{ justifyContent: 'center', alignItems: 'center',marginTop: 80}}>
                    
                        <Thumbnail style={{width: 80, height: 80}}source={require('../assets/me.png')} />
                        

                </CardItem>
                <CardItem>
                  <View style={{marginLeft:270 ,marginTop:-30}}>
                <Right><Text style={{color:"#3492ca"}}>
                          <Entypo name="add-user" size={15} color="#3492ca" />
                           Friends</Text></Right></View>
                </CardItem>
                <CardItem  >
                  <View style={{flex:1,justifyContent: "center",alignItems: "center" , marginTop:-30}}>
                
                            <Text  style={{ fontWeight: 'bold' ,fontSize:15}}>Abdullah </Text>
                     </View>
                        
                        
                </CardItem>
                <CardItem  >
                  <View style={{flex:1,justifyContent: "center",alignItems: "center" }}>
                  <Button transparent title="EditInfo" onPress={()=>this.props.navigation.navigate('EditInfo')}>
                            <Text  style={{ fontSize:15 , color:"#3492ca"}}>Edit </Text>
                              </Button>
                     </View>
                        
                        
                </CardItem>
                
                <CardItem style={{flex:1}} >
                  <View style={{marginLeft:50 }}>
                  
                            <Text  style={{ fontSize:15 , color:"#3492ca"}}>Points </Text>
                            
                     </View>
                        <Right>
                     <Text  style={{ fontSize:15 , color:"#3492ca"}}>Friends </Text></Right>
                </CardItem>
               
                <Button block warning  title="Plants" onPress={()=>this.props.navigation.navigate('Plants')}
                 style={{height:80 ,width:345 ,alignSelf:"center" ,marginTop:7,backgroundColor:"#83e345"}}>
            <View style={{ flex:1,justifyContent: 'space-between',alignItems: "center",flexDirection:'row'}}>
           <Left>
            <View style={{flex:1,justifyContent: "center",alignItems: "center"}} >  
            
              <Text style={{ fontSize:20 , color:"white"}} >  Plants </Text>
              </View></Left><Right>  
             <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>  
                
                    <MaterialIcons  name="keyboard-arrow-right" size={35} color="white"  /> 
                  </View></Right>  
              
              </View>
             
               </Button>
            <Button block warning title="Watering" onPress={()=>this.props.navigation.navigate('Watering')}
             style={{height:80 ,width:345 ,alignSelf:"center" ,marginTop:7,backgroundColor:"#00b8d4"}}>
            <View style={{ flex:1,justifyContent: 'space-between',alignItems: "center",flexDirection:'row'}}>
           <Left>
            <View style={{flex:1,justifyContent: "center",alignItems: "center"}} >  
            
              <Text style={{ fontSize:20 , color:"white"}} > Watering </Text>
              </View></Left><Right>  
             <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>  
                
                    <MaterialIcons  name="keyboard-arrow-right" size={35} color="white"  /> 
                  </View></Right>  
              
              </View>
             
               </Button>
            
            <Button block warning  title="Questions" onPress={()=>this.props.navigation.navigate('Questions')}
            style={{height:80 ,width:345 ,alignSelf:"center" ,marginTop:7,backgroundColor:"#ffbb33"}}>
            <View style={{ flex:1,justifyContent: 'space-between',alignItems: "center",flexDirection:'row'}}>
           <Left>
            <View style={{flex:1,justifyContent: "center",alignItems: "center"}} >  
            
              <Text style={{ fontSize:20 , color:"white"}} >  questions </Text>
              </View></Left><Right>  
             <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>  
                
                    <MaterialIcons  name="keyboard-arrow-right" size={35} color="white"  /> 
                  </View></Right>  
              
              </View>
              </Button>
            
            <Button block warning title="Points" onPress={()=>this.props.navigation.navigate('Points')}
             style={{height:80 ,width:345 ,alignSelf:"center" ,marginTop:7,backgroundColor:"#d50000"}}>
            <View style={{ flex:1,justifyContent: 'space-between',alignItems: "center",flexDirection:'row'}}>
           <Left>
            <View style={{flex:1,justifyContent: "center",alignItems: "center"}} >  
            
              <Text style={{ fontSize:20 , color:"white"}} >  Points </Text>
              </View></Left><Right>  
             <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>  
                
                    <MaterialIcons  name="keyboard-arrow-right" size={35} color="white"  /> 
                  </View></Right>  
              
              </View>
              </Button>
                <CardItem cardBody>
                   
                </CardItem>
            </Card>
            
            </ScrollView>
            </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
