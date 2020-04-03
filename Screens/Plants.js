import React from 'react';
import {View, Text, RefreshControl} from 'react-native';
import { Header } from 'react-native-elements';
import Post from '../Components/Post';

//importing from API folder
import getUsersPosts from '../API/getUsersPosts';
import { ScrollView } from 'react-native-gesture-handler';

class Plants extends React.Component{

    static navigationOptions = ({ navigation }) => {
        return {
            headerShown: false,
        }
    };

    constructor(props){
        super(props);
        this.state = {
          posts: [],
          refreshing: true
        }
    }

    componentDidMount(){
        this._isMounted = true;/*
        var { userID } = this.props.navigation.state.params;
        getUsersPosts(userID, this.fillPosts)*/
        this.bringPosts();
    }
  
    fillPosts = (p) =>{
      if (this._isMounted){
          this.setState({posts: p, refreshing: false})
      }
    }

    bringPosts = () =>{
        this.setState({posts: []})
        var { userID } = this.props.navigation.state.params;
        getUsersPosts(userID, this.fillPosts)
    }

    render(){
        return (
            <View style={{flex: 1}}>
                <Header
                    containerStyle={{backgroundColor: '#8FBC8F'}}
                    leftComponent={{ icon: 'keyboard-arrow-left', size: 40, color: 'white', onPress: ()=> { this.props.navigation.goBack() } }}
                    centerComponent={ <Text style={{color: 'white', fontSize: 20, fontWeight: '500'}}>Plants</Text> }
                />
                {   this.state.posts.length == 0 ?
                    //if there is NO plants
                    <ScrollView style={{backgroundColor: '#efefef'}}
                    contentContainerStyle={{alignItems: 'center'}}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.bringPosts} />}
                    >
                    <Text style={{fontSize: 18, color: 'grey'}}>No plants yet</Text>
                </ScrollView> 
                :
                    //if there are plants
                    <ScrollView style={{flex: 1}}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.bringPosts} />}
                    >
                    {
                    Object.entries(this.state.posts)
                    .sort((a, b)=>{
                        return b[1].since-a[1].since;
                    })
                    .map((post, index)=>{
                        if(!post[1].isQuestion){
                            return (
                            <Post
                                key={post[0]}
                                placed="Map"
                                userID={post[1].uid}
                                postID={post[0]}
                                imageUri={post[1].image}
                                isQuestion={post[1].isQuestion}
                                since={post[1].since}
                                desc={post[1].description}
                                lastTimeWatered={post[1].lastTimeWatered}
                                coords={post[1].coords}
                                navigation={this.props.navigation.navigate}
                            />
                            )
                        }
                    })
                    }
                    </ScrollView>
                }
            </View>
        )
    }
}

export default Plants;