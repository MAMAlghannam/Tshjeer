import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,ScrollView
} from "react-native";

import { Card, CardItem, Thumbnail, Body, Left, Right, Button ,Content,Item ,Input} from 'native-base'
import { Ionicons, EvilIcons ,Feather,FontAwesome} from '@expo/vector-icons';


class Post extends React.Component{
    
    render() {

        const images = {

            "1": require('../assets/1.jpg'),
            "2": require('../assets/2.jpg'),
            "3": require('../assets/3.png')
        }

        return (
          <ScrollView>
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../assets/5.jpeg')} />
                        <Body>
                            <Text>Abdullah </Text>
                            <Text note>Jan 29, 2020</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                {
                    false ?
                    <Image source={require('../assets/10.jpg')} style={{ height: 300, width: null, flex: 1 }} /> 
                    : <View><Text>I'm a question</Text></View> 
                }
                </CardItem>
                <CardItem style={{ height: 45 }}>
                    <Left>
                        <Button transparent>
                        <Ionicons name="ios-water" size={30} color="#b3e5fc" />
                        </Button>
                        <Button transparent>
                          <FontAwesome name="comment-o" size={26} color="#616161" />
                        </Button>
                        <Button transparent>
                            < Feather name="send" size={23} color="#616161"  />
                        </Button>


                    </Left>
                    <Right>
                <Text>11h ago</Text>
              </Right>
                </CardItem>

                <CardItem style={{ marginTop:-10}}>
                    <Text style={{ fontWeight: "500",color:"#039be5"}}>10 waterd </Text>
                </CardItem>
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
                     <CardItem>
                    
                        <Item rounded style={{ borderColor:'rgba(0,0,0,0.6)',backgroundColor:'rgba(250,250,250,0.10)',height:30,width:330}}>
                          <Input style={{backgroundColor:'rgba(250,250,250,0.10)'}} placeholder='Add Comment...'/>
                        </Item>
                  
                </CardItem>
            </Card>
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../assets/5.jpeg')} />
                        <Body>
                            <Text>Abdullah </Text>
                            <Text note>Jan 29, 2020</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={require('../assets/11.jpg')} style={{ height: 300, width: null, flex: 1 }} />
                </CardItem>
                <CardItem style={{ height: 45 }}>
                    <Left>
                        <Button transparent>
                        <Ionicons name="ios-water" size={30} color="#b3e5fc" />
                        </Button>
                        <Button transparent>
                          <FontAwesome name="comment-o" size={26} color="#616161" />
                        </Button>
                        <Button transparent>
                            < Feather name="send" size={23} color="#616161"  />
                        </Button>


                    </Left>
                    <Right>
                <Text>11h ago</Text>
              </Right>
                </CardItem>

                <CardItem style={{ marginTop:-10}}>
                    <Text style={{ fontWeight: "500",color:"#039be5"}}>10 waterd </Text>
                </CardItem>
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
                     <CardItem>
                    
                        <Item rounded style={{ borderColor:'rgba(0,0,0,0.6)',backgroundColor:'rgba(250,250,250,0.10)',height:30,width:330}}>
                          <Input style={{backgroundColor:'rgba(250,250,250,0.10)'}} placeholder='Add Comment...'/>
                        </Item>
                  
                </CardItem>
            </Card>
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../assets/5.jpeg')} />
                        <Body>
                            <Text>Abdullah </Text>
                            <Text note>Jan 29, 2020</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={require('../assets/4.jpg')} style={{ height: 300, width: null, flex: 1 }} />
                </CardItem>
                <CardItem style={{ height: 45 }}>
                    <Left>
                        <Button transparent>
                        <Ionicons name="ios-water" size={30} color="#b3e5fc" />
                        </Button>
                        <Button transparent>
                          <FontAwesome name="comment-o" size={26} color="#616161" />
                        </Button>
                        <Button transparent>
                            < Feather name="send" size={23} color="#616161"  />
                        </Button>


                    </Left>
                    <Right>
                <Text>11h ago</Text>
              </Right>
                </CardItem>

                <CardItem style={{ marginTop:-10}}>
                    <Text style={{ fontWeight: "500",color:"#039be5"}}>10 waterd </Text>
                </CardItem>
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
                     <CardItem>
                    
                        <Item rounded style={{ borderColor:'rgba(0,0,0,0.6)',backgroundColor:'rgba(250,250,250,0.10)',height:30,width:330}}>
                          <Input style={{backgroundColor:'rgba(250,250,250,0.10)'}} placeholder='Add Comment...'/>
                        </Item>
                  
                </CardItem>
            </Card>
            </ScrollView>
        );
    }
}

export default Post;