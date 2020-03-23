import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Platform, ActivityIndicator } from 'react-native';
import { Callout, Marker } from 'react-native-maps';
import { Avatar, Icon, Image } from 'react-native-elements';
import Arrow from '@expo/vector-icons/FontAwesome';
import CalloutForIOS from '../Components/CalloutForIOS';
import moment from 'moment'

//importing from API
import getAllPosts, {unsubscribePostsRef} from '../API/getAllPosts';

/*
In Map component we found a different behavior for the callout in android and ios, for the android can't render the image
on the callout but for the ios it's ok.
So we decided to make normal callout for the ios, small modal that has the post image and other info for the android.

This file contains two functions (CalloutForIOS, CalloutForAndroid) which it will be called when needed as a component inside 
the Map component.
*/

function CalloutForAndroid(props){
return(
<Callout tooltip>
    <Icon
    name='sort-desc'
    type='font-awesome'
    color='red'
    />
</Callout>
)
}

class Markers extends React.Component{
  _isMounted = false;
  constructor(props){
      super(props);
      this.state = {
        posts: [],
        tracksViewChanges: true,
      }
  }

  stopTrackingViewChanges = () => {
      this.setState(() => ({
        tracksViewChanges: false,
      }));
  }

  componentDidMount(){
      this._isMounted = true;
      getAllPosts(this.fillPosts)
  }

  fillPosts = (p) =>{
    if (this._isMounted){
        this.setState({posts: p})
    }
  }

  componentWillUnmount() {
      this._isMounted = false;
      unsubscribePostsRef();
      console.log('markers will unmount!!')
  }

  render(){
    const { tracksViewChanges } = this.state;
    
    return (
      Object.entries(this.state.posts).map((post, index) => (
        <Marker
        tracksViewChanges={tracksViewChanges}
        key={post[0]}
        coordinate={post[1].coords}
        onPress={()=>{
          const postInfo = {
            postID: post[0],
            image: post[1].image, 
            since: post[1].since, 
            desc: post[1].description, 
            uid: post[1].uid,
            lastTimeWatered: post[1].lastTimeWatered,
            isQuestion: post[1].isQuestion,
            coords: post[1].coords
          }
          Platform.OS == 'android' ? this.props.navigation.navigate('PostContainerInMap', postInfo) : null;
        }}
        >
        {post[1].isQuestion ? 
        <Arrow name="question" size={25} color={'darkorange'}/> 
        : <Avatar
            imageProps={{onLoad: this.stopTrackingViewChanges,
            fadeDuration: 0}}
            rounded
            source={{uri: post[1].image}} 
            size={'small'}
            PlaceholderContent={<ActivityIndicator />}
            containerStyle={{borderWidth: 3, borderColor: getStatusColor(post[1])}}
          />
        }
        {Platform.OS == 'ios' ? 
        <CalloutForIOS 
          postID={post[0]}
          navigation={this.props.navigation.navigate}
          image={post[1].image} 
          since={post[1].since} 
          desc={post[1].description}
          uid={post[1].uid}
          lastTimeWatered={post[1].lastTimeWatered}
          isQuestion={post[1].isQuestion}
          coords={post[1].coords}
        />
        : <CalloutForAndroid navigation={this.props.navigation.navigate} /> 
        }
        </Marker>
      ))
    )
  }
}

function getStatusColor(postInfo){
  var diffInHours = moment().diff(postInfo.lastTimeWatered, 'h');
  if(diffInHours < 1)
    return 'blue';
  else if(diffInHours < 24 && diffInHours > 15)
    return 'green';
  else 
    return 'red';
}

export default Markers;