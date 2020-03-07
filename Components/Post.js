import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,ScrollView
} from "react-native";
import { Card, CardItem, Thumbnail, Body, Left, Right, Button ,Content,Item ,Input} from 'native-base'
import { Ionicons, EvilIcons ,Feather,FontAwesome} from '@expo/vector-icons';
import moment from 'moment';

//importing getUserByUID
import getUserByUID from '../API/getUserByUID';

class Post extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            avatar: "'../images/avatarImg.png'",
            username: ""
        }
    }
    
    componentDidMount(){
        getUserByUID(this.props.userID, this.setAvatar, this.setUseranme);
    }

    setAvatar = (avatar) =>{
        this.setState({avatar})
    }

    setUseranme = (username) =>{
        this.setState({username})
    }

    render() {

        const {userID, postID, imageUri, isQuestion, desc, since, lastTimeWatered} = this.props;

        return (
          <ScrollView>
            <Card>
                {/*user info*/}
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: this.state.avatar}} />
                        <Body>
                            <Text>{this.state.username}</Text>
                            <Text note>{moment(new Date(since)).fromNow()}</Text>
                        </Body>
                    </Left>
                </CardItem>
                {/*image and description*/}
                <CardItem cardBody>
                {
                    isQuestion ? null
                    : <Image source={{uri: imageUri}} resizeMode="contain" style={{ height: 300, width: null, flex: 1 }} />
                }
                </CardItem>
                <View><Text>{desc}</Text></View>
                {/*buttons*/}
                <CardItem style={{ height: 45 }}>
                    <Left>
                        {
                            isQuestion ? null 
                            : <Button transparent>
                            <Ionicons name="ios-water" size={30} color="#b3e5fc" />
                            </Button>    
                        }
                        <Button transparent>
                          <FontAwesome 
                            name="comment-o" 
                            size={26} 
                            color="#616161"
                            onPress={()=>{
                                this.props.navigation('Comments', {postID: postID})
                            }}
                          />
                        </Button>
                    </Left>
                    <Right>
                        {isQuestion ? null : <Text>{moment(new Date(lastTimeWatered)).fromNow()}</Text>}
                    </Right>
                </CardItem>
                {/*comments area*/}
                <CardItem>
                    <Body style={{marginTop:-15}}>
                        <Text>
                            <Text style={{ fontWeight: "900" , color:"#43a047"}}>Abdullah  </Text>
                            i have cultivated my first palm using TSMMA thanks for motivating and helping in making the earth better place.
                        </Text>
                    </Body>
                    </CardItem>
                    <CardItem>
                    <Body style={{marginTop:-15}}>
                        <Text>
                            <Text style={{ fontWeight: "900" , color:"#43a047"}}>Mohammed  </Text>
                            we will take care of it 
                        </Text>
                    </Body>
                    </CardItem>
                    <CardItem>
                    <Body style={{marginTop:-15}}>
                        <Text style={{color:"blue"}}>
                            <Text style={{ fontWeight: "900" , color:"#43a047"}}>Fares </Text>
                            #lte's_make_earth_better_place
                        </Text>
                    </Body>
                </CardItem>
            </Card>
            </ScrollView>
        );
    }
}

export default Post;