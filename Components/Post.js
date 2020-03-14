import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,ScrollView,
    TouchableOpacity
} from "react-native";
import { Card, CardItem, Thumbnail, Body, Left, Right, Button ,Content,Item ,Input} from 'native-base'
import { Ionicons, EvilIcons ,Feather,FontAwesome} from '@expo/vector-icons';
import moment from 'moment';
import Comment from './Comment';
import WaterButton from './WaterButton';

//importing getUserByUID
import getUserByUID from '../API/getUserByUID';
import getBriefComments from '../API/getBriefComments';

class Post extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            avatar: "'../images/avatarImg.png'",
            username: "",
            briefComments: [],
        }
    }
    
    async componentDidMount(){
        try{
            var { avatar, username} = await getUserByUID(this.props.userID)
            this.setState({avatar: avatar, username: username})

            var briefComments = await getBriefComments(this.props.postID)
            this.setState({ briefComments })
        }
        catch(err){
            console.log(err)
        }
    }

    render() {

        const {userID, postID, imageUri, isQuestion, desc, since, lastTimeWatered, coords} = this.props;

        return (
          <ScrollView>
            <Card>
                {/*user info*/}
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: this.state.avatar}} />
                        <Body>
                            <TouchableOpacity 
                            onPress={()=>{
                                this.props.navigation('ProfileInMap', {userID: userID})
                            }}>
                                <Text>{this.state.username}</Text>
                            </TouchableOpacity>
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
                        <Button transparent>
                        { isQuestion ? null :
                            <WaterButton 
                                postID={postID} 
                                lastTimeWatered={lastTimeWatered}
                                coords={coords}
                            />
                        }
                        </Button>
                    </Right>
                </CardItem>
                {/*comments area*/
                this.state.briefComments.map((comment, index) =>(
                <CardItem key={index}>
                    <Comment 
                        userID={comment.userID} 
                        comment={comment.comment} 
                        timestamp={comment.timestamp}
                    />
                </CardItem>
                ))
                }
            </Card>
            </ScrollView>
        );
    }
}

export default Post;