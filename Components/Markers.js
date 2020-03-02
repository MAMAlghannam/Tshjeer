import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Platform, ActivityIndicator } from 'react-native';
import { Callout, Marker } from 'react-native-maps';
import { Avatar, Icon, Image } from 'react-native-elements';
import Arrow from '@expo/vector-icons/FontAwesome';

//importing from API
import getAllPosts, {unsubscribePostsRef} from '../API/getAllPosts';
import getUserByUID from '../API/getUserByUID';


/*
In Map component we found a different behavior for the callout in android and ios, for the android can't render the image
on the callout but for the ios it's ok.
So we decided to make normal callout for the ios, small modal that has the post image and other info for the android.

This file contains two functions (CalloutForIOS, CalloutForAndroid) which it will be called when needed as a component inside 
the Map component.
*/


function CalloutForIOS(props){
    const [avatar, setAvatar] = useState('../images/avatarImg.png')
    const [username, setUsername] = useState("")
  
    // Warning: Can't perform a React state update on an unmounted component. 
    // This is a no-op, but it indicates a memory leak in your application. To fix, 
    // cancel all subscriptions and asynchronous tasks in %s.%s, a useEffect cleanup function
    useEffect(()=>{ 
      getUserByUID(props.uid, setAvatar, setUsername) 
    });
  
    return (
      <Callout 
      tooltip 
      style={{width: Dimensions.get('window').width*0.8}}
      onPress={()=>props.navigation('Post')}>
        {/*first row*/}
        <View style={styles.firstRow}>
          <View style={styles.userInfoContainer}>
            <Avatar source={{uri: avatar}} size={'small'} containerStyle={{margin:5}} rounded title="T"/>
            <Text style={{fontSize:20, margin: 5}}>{username}</Text>
          </View>
          <View style={styles.sinceContainer}>
            <Text>{new Date(props.since).getDate()}</Text>
          </View>
        </View>
        {/*second row*/
        props.isQuestion ? <View style={styles.question}><Text >{props.desc}</Text></View> 
        : <Image 
            source={{uri: props.image}} 
            containerStyle={styles.image} 
            resizeMode='stretch'
            PlaceholderContent={<ActivityIndicator />}
          /> 
        }
        {/*third row*/}
        <View style={{alignItems: 'center'}}>
          <Arrow name={'caret-down'} color={'grey'} size={25} 
          style={{
            marginTop: -10,
            marginBottom: -5,
            shadowOpacity: 0.3,
            shadowOffset: { width: 1, height: 4 }
          }}/>
        </View>
      </Callout>
    )
}
  
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

var testId = 1;

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
        this.state.posts.map(post => (
        <Marker
        tracksViewChanges={tracksViewChanges}
        key={(testId++)}
        coordinate={post.coords}
        onPress={()=>{
            Platform.OS == 'android' ? this.props.navigation.navigate('Post') : null
        }}
        >
        {post.isQuestion ? 
        <Arrow name="question" size={25} color={'green'}/> 
        : <Avatar
            imageProps={{onLoad: this.stopTrackingViewChanges,
            fadeDuration: 0}}
            rounded
            source={{uri: post.image}} 
            size={'small'}  
            PlaceholderContent={<ActivityIndicator />}
            containerStyle={{borderWidth: 3, borderColor: 'green'}}
        />
        }
        {Platform.OS == 'ios' ? 
        <CalloutForIOS 
            navigation={this.props.navigation.navigate}
            image={post.image} 
            since={post.since} 
            desc={post.description}
            uid={post.uid}
            isQuestion={post.isQuestion}
        />
        : <CalloutForAndroid navigation={this.props.navigation.navigate} /> 
        }
        </Marker>
        ))
    );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    //styling for CalloutForIOS
    firstRow:{
      flex:1,
      flexDirection:'row', 
      backgroundColor: 'white',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5, 
      borderTopWidth:1,
      borderRightWidth:1,
      borderLeftWidth:1,
      borderColor:'grey',
    },
    userInfoContainer:{
      flex: 3,
      flexDirection:'row',
      borderColor:'red',
      alignItems: 'center',
    },
    sinceContainer:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor:'#99ff66'
    },
    image:{
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      borderBottomWidth:1,
      borderRightWidth:1,
      borderLeftWidth:1,
      borderColor:'grey',
      backgroundColor: 'white',
      height: 200,
    }, 
    question:{
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      borderBottomWidth:1,
      borderRightWidth:1,
      borderLeftWidth:1,
      borderColor:'grey',
      backgroundColor: 'white',
      padding: 10,
      
      alignItems: 'center',
      justifyContent: 'center',
      borderColor:'grey'
    }, //End of styling for CalloutForIOS
    
  });

export default Markers;