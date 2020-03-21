import React from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import Post from '../Components/Post'

//importing from API folder
import getFollowingPosts from '../API/getFollowingPosts';

export default class TimeLine extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      posts: [],
      refreshing: true
    }
  }

  _fillPosts = (posts) =>{
    this.setState({ posts, refreshing: false })
  }

  componentDidMount(){
    this.bringPosts();
  }

  bringPosts = () =>{
    this.setState({posts: []})
    getFollowingPosts(this._fillPosts);
  }
  
  render(){
  return (
    <ScrollView
    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.bringPosts} />}
    >
    {
      Object.values(this.state.posts).map((post, index)=>
        Object.entries(post).map((p)=>(
            <Post
              key={p[0]}
              placed="TimeLine"
              postID={p[0]}
              navigation={this.props.navigation.navigate}
              imageUri={p[1].image} 
              since={p[1].since} 
              desc={p[1].description}
              userID={p[1].uid}
              lastTimeWatered={p[1].lastTimeWatered}
              isQuestion={p[1].isQuestion}
              coords={p[1].coords}
            />
          )
        )
      )
    }
    </ScrollView>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
