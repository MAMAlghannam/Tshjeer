import React from 'react';
import { StyleSheet, Text, View, Dimensions, Platform  } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Callout, Marker } from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import { Avatar, Icon, Image, Overlay } from 'react-native-elements';
import Arrow from '@expo/vector-icons/FontAwesome';

/*
In Map component we found a different behavior for the callout in android and ios, for the android can't render the image
on the callout but for the ios it's ok.
So we decided to make normal callout for the ios, small modal that has the post image and other info for the android.

This file contains two functions (CalloutForIOS, CalloutForAndroid) which it will be called when needed as a component inside 
the Map component.
*/

function CalloutForIOS(props){
  return (
    <Callout 
    tooltip 
    style={{width: Dimensions.get('window').width*0.8}}
    onPress={()=>alert('callout pressed! '+props.id)}>
      {/*first row*/}
      <View style={styles.firstRow}>
        <View style={styles.userInfoContainer}>
          <Avatar source={require('../images/avatarImg.png')} size={'small'} containerStyle={{margin:5}} rounded title="T"/>
          <Text style={{fontSize:20, margin: 5}}>username</Text>
        </View>
        <View style={styles.sinceContainer}>
          <Text>-since-</Text>
        </View>
      </View>
      {/*second row*/}
      <Image source={require('../images/plant.jpg')} containerStyle={styles.image} resizeMode='stretch'/>
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
  return (
    <View style={{flex: 1}}>
      {/* user info area and -since- */}
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 2, flexDirection: 'row', alignItems: 'center',}}>
          <Avatar
            rounded 
            source={require('../images/avatarImg.png')} 
            size={'small'} 
            containerStyle={{margin:5}} 
            title="T"
          />
          <Text style={{fontSize:20,margin: 5}}>username</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>-since-</Text>
        </View>
      </View>
      {/* image */}
      <View style={{height: 200, alignItems: 'center'}}>
      <Image 
        containerStyle={{ width: Dimensions.get('window').width*0.8, height: 200 }}
        resizeMode='stretch' 
        source={require('../images/plant.jpg')}
      />
      </View>
      {/* like, more */}
      <View style={{flex: 1, height: 50, flexDirection: 'row'}}>
        <View style={{flex: 1, borderColor: 'blue', justifyContent: 'center', alignItems: 'center'}}>
        </View>
        <View style={{flex: 1, borderColor: 'purple', justifyContent: 'center'}}>
          <Icon
            name='chevron-right'
            type='font-awesome'
            color='#009933'
            onPress={()=>{alert('test')}}
          />
        </View>
      </View>
    </View>
  )
}

export default class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOverlayVisible: false, 
      //don't forget the info of the selected post
      latitude: null,
      longitude: null
    }
  }

  async componentDidMount(){
    const {status} = await Permissions.getAsync(Permissions.LOCATION)

    if(status != 'granted'){
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    navigator.geolocation.getCurrentPosition(
      ({coords:{latitude, longitude}}) => this.setState({latitude, longitude}),
      (error) => alert(error)
    )
  }

  render(){
    const {latitude, longitude} = this.state
    if(latitude){
    return (
    <View style={styles.container}>
      <MapView
      showsUserLocation
      provider={PROVIDER_GOOGLE}  
      style={styles.mapStyle} 
      region={{/*just delete the numbers and the colon too*/
        latitude: 24.774265,
        longitude: 46.738586,
        latitudeDelta: 0.203,
        longitudeDelta: 0.308,
      }}
      >
      {/*marker*/}
      <Marker 
        coordinate={{ latitude: 24.774265, longitude: 46.738586 }}
        onPress={()=>{Platform.OS == 'android' ? this.setState({isOverlayVisible: true}) : null}}>
        <Avatar 
          rounded
          source={require('../images/plant.jpg')} 
          size={'small'}  
          title="T"
          containerStyle={{borderWidth:3, borderColor: 'green'}}
        />
        {Platform.OS == 'ios' ? /*don't forget to pass the props */ <CalloutForIOS /> : null }
      </Marker>
      {/*end of marker*/}
      </MapView>
      {
      this.state.isOverlayVisible && (
        <Overlay isVisible onBackdropPress={()=>this.setState({isOverlayVisible: false})}
        overlayStyle={{ padding: 0, height: 350, width: Dimensions.get('window').width*0.8 }}>
          {/*don't forget to pass the props */}
          <CalloutForAndroid />
        </Overlay>
      )
      }
    </View>
    )
    }
    
    //if permission for location not granted by the user the line below will be rendered
    return <View style={{margin: 50}}><Text>Need location permission!</Text></View>
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
    borderColor:'grey'
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
    height: 200
  }, //End of styling for CalloutForIOS
  
});
