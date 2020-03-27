import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,ScrollView 
} from "react-native";
import { Card, CardItem, Thumbnail, Body, Left, Right, Button ,Content,Item ,Input ,Container, Header} from 'native-base'
import { Ionicons, EvilIcons ,Feather,FontAwesome,MaterialIcons,AntDesign, Entypo} from '@expo/vector-icons';
import FollowFunctionality from '../Components/FollowFunctionality'
//importing getUserInfo function
import getUserInfo, {unsubscribeRef} from '../API/getUserInfo';
import getUserByUID from '../API/getUserByUID';

//importing auth from firebase
import firebase from 'firebase/app';
import 'firebase/auth'

/*
  This component after first rendering it won't re-render again, so it needs to be refreshed,
  so we need to listen for any changes
*/

export default class Profile extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Profile",
      headerTitleStyle:{ color: "#008B45", fontSize: 20 },
      headerStyle:{
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: 'lightgrey',
      },
    }
  };

  constructor(props){
    super(props)
    this.state={
      username: "",
      avatar: "../images/postImg.png",
      bio: "",
      nTrees: 0,
      questions: 0,
      nWatered: 0
    }
  }

  setProfileInfo = (userInfo) =>{
    this.setState({
      username: userInfo.username,
      avatar: userInfo.avatar,
      bio: userInfo.bio,
      nTrees: userInfo.nTrees,
      questions: userInfo.questions,
      nWatered: userInfo.nWatered
    })
  }

  async componentDidMount(){
    // console.log( this.props.navigation)
    var { params } = this.props.navigation.state;
    if(params){
      try{
        var { avatar, username, numberOfTrees, questions, nWatered} = await getUserByUID(params.userID)
        this.setState({ 
          username, 
          avatar,
          nTrees: numberOfTrees || 0, 
          questions: questions || 0, 
          nWatered: nWatered || 0 
        })
      }catch(err){
        console.log(params.userID)
        console.log(err)
      }
    }
    else
      getUserInfo(this.setProfileInfo);
  }

  componentWillUnmount(){
    unsubscribeRef();
  }
  
  render(){
    const user = firebase.auth().currentUser;
    var { params } = this.props.navigation.state;
    var uidForNavigating = "";

    if(params){
      uidForNavigating = params.userID;
    }
    else{
      uidForNavigating = user.uid;
    }
    return (
      <Container>
        <ScrollView>
          <Card>
            <CardItem  style={{ justifyContent: 'center', alignItems: 'center',marginTop: 25}}>
              <Thumbnail style={{width: 80, height: 80}} source={{uri: this.state.avatar}} />
            </CardItem>
            <CardItem>
              <View style={{flex:1, justifyContent: "center", alignItems: "center", marginTop:-10}}>
                <Text style={{ fontWeight: 'bold', fontSize:15}}>{this.state.username}</Text>
              </View>      
            </CardItem>
            <CardItem>
              <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
                <Text style={{fontSize:15, color:"grey"}}>{this.state.bio}</Text>
              </View>      
            </CardItem>
            <CardItem style={{flex:1}} >
              <View style={{marginLeft:50 }}>
              { /* 
                  if the owner of this profile viewing this component "Edit" button will appear,
                  otherwise "Follow" button will appear 
                */
                params ? 
                  params.userID == user.uid ? 
                  <Button transparent title="EditInfo" onPress={()=>this.props.navigation.navigate('EditInfo')}>
                    <Text  style={{ fontSize:15 , color:"#3492ca"}}>Edit </Text>
                  </Button>
                  :
                  <FollowFunctionality userID={params.userID} />
                : 
                <Button transparent title="EditInfo" onPress={()=>this.props.navigation.navigate('EditInfo')}>
                  <Text  style={{ fontSize:15 , color:"#3492ca"}}>Edit </Text>
                </Button> 
              }
              </View>
              <Right>
                <Text  style={{ fontSize:15 , color:"#3492ca"}}>Friends</Text>
              </Right>
            </CardItem>
            
            <Button //plants button
              block 
              warning  
              title="Plants" 
              onPress={()=>this.props.navigation.navigate('Plants', {userID: uidForNavigating})}
              style={{height:80 ,width:345 ,alignSelf:"center" ,marginTop:7,backgroundColor:"#83e345"}}
            >
              <View style={{ flex:1,justifyContent: 'space-between',alignItems: "center",flexDirection:'row'}}>
                <Left>
                  <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
                    <Text style={{fontSize:20, color:"white"}}> Plants{" "+this.state.nTrees}</Text>
                  </View>
                </Left>
                <Right>
                  <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
                    <MaterialIcons name="keyboard-arrow-right" size={35} color="white"/> 
                  </View>
                </Right>  
              </View>
            </Button>

            <Button //watering button
              block 
              warning  
              title="Watering" 
              onPress={()=>this.props.navigation.navigate('Watering', {userID: uidForNavigating})}
              style={{height:80 ,width:345 ,alignSelf:"center" ,marginTop:7,backgroundColor:"#00b8d4"}}
            >
              <View style={{ flex:1,justifyContent: 'space-between',alignItems: "center",flexDirection:'row'}}>
                <Left>
                  <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
                    <Text style={{fontSize:20, color:"white"}}> Watered{" "+this.state.nWatered}</Text>
                  </View>
                </Left>
                <Right>  
                  <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
                    <MaterialIcons name="keyboard-arrow-right" size={35} color="white"/> 
                  </View>
                </Right>  
              </View>
            </Button>

            <Button //questions button
              block 
              warning  
              title="Questions" 
              onPress={()=>this.props.navigation.navigate('Questions', {userID: uidForNavigating})}
              style={{height:80, width:345, alignSelf:"center", marginTop:7, backgroundColor:"#ffbb33"}}
            >
              <View style={{ flex:1,justifyContent: 'space-between',alignItems: "center",flexDirection:'row'}}>
                <Left>
                  <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
                    <Text style={{fontSize:20, color:"white"}}> Questions{" "+this.state.questions}</Text>
                  </View>
                </Left>
                <Right>  
                  <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
                    <MaterialIcons name="keyboard-arrow-right" size={35} color="white"/> 
                  </View>
                </Right>  
              </View>
            </Button>
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
