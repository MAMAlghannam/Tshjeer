import React from 'react';
import {View, Text} from 'react-native';
import { Header } from 'react-native-elements';
import Post from '../Components/Post';

//importing from API folder
import getUsersPosts from '../API/getUsersPosts';
import { ScrollView } from 'react-native-gesture-handler';

class Questions extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          posts: [],
        }
    }

    componentDidMount(){
        this._isMounted = true;
        var { userID } = this.props.navigation.state.params;
        getUsersPosts(userID, this.fillPosts)
    }
  
    fillPosts = (p) =>{
      if (this._isMounted){
          this.setState({posts: p})
      }
    }

    render(){
        return (
            <View style={{flex: 1}}>
                <Header
                    containerStyle={{backgroundColor: 'white'}}
                    leftComponent={{ icon: 'keyboard-arrow-left', size: 40, onPress: ()=> { this.props.navigation.goBack() } }}
                    centerComponent={ <Text style={{fontSize: 20,fontWeight: '500'}}>Questions</Text> }
                />
                <ScrollView style={{flex: 1}}>
                {
                Object.entries(this.state.posts).map((post, index)=>{
                    if(post[1].isQuestion){
                        return (
                        <Post
                            userID={post[1].uid}
                            postID={post[0]}
                            imageUri={post[1].image}
                            isQuestion={post[1].isQuestion}
                            since={post[1].since}
                            desc={post[1].description}
                            lastTimeWatered={post[1].lastTimeWatered}
                            navigation={this.props.navigation.navigate}
                        />
                        )
                    }
                })
                }
                </ScrollView>
            </View>
        )
    }
}

export default Questions;