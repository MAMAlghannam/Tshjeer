import React from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

class CameraScreen extends React.Component{
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        WhiteBalance: Camera.Constants.WhiteBalance.auto
      };
    
      async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
      }
    
      render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
          return <View />;
        } else if (hasCameraPermission === false) {
          return <Text>No access to camera</Text>;
        } else {
          return (
            <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {/* begin of flip and X buttons */}
                <View style={{flex: 0.5, flexDirection: 'row' , justifyContent: 'space-between',backgroundColor: 'black'}}>
                <View style={{borderWidth: 1}}>
                    <TouchableOpacity
                        onPress={() => {
                        this.setState({
                          type:
                            this.state.type === Camera.Constants.Type.back
                              ? Camera.Constants.Type.front
                              : Camera.Constants.Type.back,
                        });}}
                        style={{margin: 15}}
                    >
                        <Text style={{color: 'white', fontSize: 16}}>Flip</Text>
                    </TouchableOpacity>
                </View>
                <View style={{borderWidth: 1}}>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.goBack() }}
                        style={{margin: 15}}
                    >
                        <Text style={{color: 'white', fontSize: 16}}>X</Text>
                    </TouchableOpacity>
                </View>
                {/* end of flip and X buttons */}
                </View>
                <Camera 
                style={{ flex: 4 }} 
                ref={ref => {
                    this.camera = ref;
                }}
                type={this.state.type} 
                whiteBalance={this.state.WhiteBalance}
                >
                
                </Camera>
                <View style={{flexDirection: 'column', flex: 1, backgroundColor: 'black'}}>
                    {/*Mode of camera button*/}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 0.5, padding: 5 }}>
                        
                        <TouchableOpacity
                        onPress={()=>{
                            this.setState({WhiteBalance: Camera.Constants.WhiteBalance.auto})
                        }}>
                        <Text style={[styles.modeBtn, {borderColor: 
                            this.state.WhiteBalance == Camera.Constants.WhiteBalance.auto ? 'white' : 'black'}]}
                        >auto</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress={()=>{
                            this.setState({WhiteBalance: Camera.Constants.WhiteBalance.sunny})
                        }}>
                        <Text style={[styles.modeBtn, {borderColor: 
                            this.state.WhiteBalance == Camera.Constants.WhiteBalance.sunny ? 'white' : 'black'}]}
                        >sunny</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress={()=>{
                            this.setState({WhiteBalance: Camera.Constants.WhiteBalance.cloudy})
                        }}>
                        <Text style={[styles.modeBtn, {borderColor: 
                            this.state.WhiteBalance == Camera.Constants.WhiteBalance.cloudy ? 'white' : 'black'}]}
                        >cloudy</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress={()=>{
                            this.setState({WhiteBalance: Camera.Constants.WhiteBalance.shadow})
                        }}>
                        <Text style={[styles.modeBtn, {borderColor: 
                            this.state.WhiteBalance == Camera.Constants.WhiteBalance.shadow ? 'white' : 'black'}]}
                        >shadow</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                        onPress={()=>{
                            this.setState({WhiteBalance: Camera.Constants.WhiteBalance.fluorescent})
                        }}>
                        <Text style={[styles.modeBtn, {borderColor: 
                            this.state.WhiteBalance == Camera.Constants.WhiteBalance.fluorescent ? 'white' : 'black'}]}
                        >flu</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress={()=>{
                            this.setState({WhiteBalance: Camera.Constants.WhiteBalance.incandescent})
                        }}>
                        <Text style={[styles.modeBtn, {borderColor: 
                            this.state.WhiteBalance == Camera.Constants.WhiteBalance.incandescent ? 'white' : 'black'}]}
                        >inc</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {/*Take picture button*/}
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TouchableOpacity style={{ margin: 10,padding: 10 }}
                        onPress={ async ()=>{
                            if (this.camera) {
                                let photo = await this.camera.takePictureAsync();
                                alert('uri: '+photo.uri);
                            }
                        }}>
                            <Text style={{ color: 'white', fontSize: 16 }}> - Take - </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </SafeAreaView>
          );
        }
    }
}

const styles = StyleSheet.create({
    modeBtn: {
        color: 'white',
         borderWidth: 1,
         padding: 2,
         marginTop: 5,
         borderRadius: 4
    }
})

export default CameraScreen;