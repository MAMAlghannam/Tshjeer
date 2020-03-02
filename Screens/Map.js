import React from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
import MapView, {PROVIDER_GOOGLE } from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import Markers from '../Components/Markers'

/*
  Just a Map component renders Markers component
*/
export default class Map extends React.Component {
  _isMounted = false;
  constructor(props){
    super(props);
    this.state = {
      latitude: null,
      longitude: null
    }
  }

  async componentDidMount(){
    this._isMounted = true;
    const {status} = await Permissions.getAsync(Permissions.LOCATION)

    if(status != 'granted'){
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    navigator.geolocation.getCurrentPosition(
      ({coords:{latitude, longitude}}) => this.setState({latitude, longitude}),
      (error) => alert(error)
    )
  }

  componentWillUnmount() {
    this._isMounted = false;
    unsubscribePostsRef();
    console.log('map will unmount!!')
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
      region={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.3,
      }}
      >
        <Markers navigation={this.props.navigation}/>
      </MapView>
    </View>
    )
    }
     
    //if permission for location not granted by the user the line below will be rendered
    return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size={'large'} />
      <Text>Need location permission!</Text>
    </View>
    )
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
});
