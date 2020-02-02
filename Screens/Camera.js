import React from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

class CameraScreen extends React.Component{

    //We need a special header styling in this screen, so below are the styling for the header
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            headerTitle: "Photo",
            headerTitleStyle:{ color: 'white' },
            headerStyle: { backgroundColor: 'black' },
            headerLeft: () => (
                <MaterialIcons
                style={{paddingLeft:10}} 
                color={"yellow"} size={30} 
                name="switch-camera"
                //When this component did mount the params will have "flip" function to flip the camera
                onPress={params.flip}
                />
            ),
            headerRight: () => (
                <MaterialIcons 
                style={{paddingLeft:10}} 
                name="close" size={30} color={'white'}
                onPress={()=>navigation.navigate('Add')}
                />
            )
        }
    };

    constructor(props){
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            WhiteBalance: Camera.Constants.WhiteBalance.auto
        };
    }

    //This function will flip the camera type whether to front or back (rare) camera 
    _flip = () => {
        this.setState({ type:
            this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        })
    }
    
    async componentDidMount() {
        //Here the "_flip" function will be set for the navigation object so it can be called from the header 
        this.props.navigation.setParams({ flip: this._flip});

        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }
    
    render() {
    //Destructuring some properties to make the code more cleaner, I hope so :)
    const { hasCameraPermission, WhiteBalance } = this.state;
    const { auto, sunny, cloudy, shadow, fluorescent, incandescent } = Camera.Constants.WhiteBalance;

    if (hasCameraPermission === null) {
        return <View />;
    } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    } else {
        return (
            <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Camera 
                style={{ flex: 2 }} 
                ref={ref => { this.camera = ref; }}
                type={this.state.type} 
                whiteBalance={WhiteBalance}
                >
                </Camera>
                <View style={{flexDirection: 'column', flex: 1, backgroundColor: 'black', paddingTop: 7}}>
                    {/*Mode of camera buttons*/}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 0.5, padding: 5 }}>
                        {/*Auto mode */}
                        <TouchableOpacity
                        onPress={()=>{ this.setState({WhiteBalance: auto}) }}>
                        <Text style={[styles.modeBtn, {borderColor: 
                            WhiteBalance == auto ? 'white' : 'black'}]}
                        >auto</Text>
                        </TouchableOpacity>

                        {/*Sunny mode */}
                        <TouchableOpacity
                        onPress={()=>{ this.setState({WhiteBalance: sunny}) }}>
                        <Text style={[styles.modeBtn, {borderColor: 
                            WhiteBalance == sunny ? 'white' : 'black'}]}
                        >sunny</Text>
                        </TouchableOpacity>
                        
                        {/*Cloudy mode */}
                        <TouchableOpacity
                        onPress={()=>{ this.setState({WhiteBalance: cloudy}) }}>
                        <Text style={[styles.modeBtn, {borderColor: 
                            WhiteBalance == cloudy ? 'white' : 'black'}]}
                        >cloudy</Text>
                        </TouchableOpacity>

                        {/*Shadow mode */}
                        <TouchableOpacity
                        onPress={()=>{ this.setState({WhiteBalance: shadow}) }}>
                        <Text style={[styles.modeBtn, {borderColor: 
                            WhiteBalance == shadow ? 'white' : 'black'}]}
                        >shadow</Text>
                        </TouchableOpacity>
                        
                        {/*Fluorescent mode */}
                        <TouchableOpacity
                        onPress={()=>{ this.setState({WhiteBalance: fluorescent}) }}>
                        <Text style={[styles.modeBtn, {borderColor: 
                            WhiteBalance == fluorescent ? 'white' : 'black'}]}
                        >flu</Text>
                        </TouchableOpacity>
                        
                        {/*Incandescent mode */}
                        <TouchableOpacity
                        onPress={()=>{ this.setState({WhiteBalance: incandescent}) }}>
                        <Text style={[styles.modeBtn, {borderColor: 
                            WhiteBalance == incandescent ? 'white' : 'black'}]}
                        >inc</Text>
                        </TouchableOpacity>
                    {/*end of mode buttons*/}
                    </View>
                    {/*Take picture button*/}
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity 
                        onPress={ async ()=>{
                            if (this.camera) {
                                let photo = await this.camera.takePictureAsync();
                                /*Navigate to NewPost Screen which named "PictureTook" 
                                  in the navigator and pass the uri of the image too */
                                this.props.navigation.navigate('PictureTook',{ uri: photo.uri});

                                // alert('uri: '+photo.uri);
                            }
                        }}>
                            <MaterialIcons name={'lens'} color={'white'} size={90} />
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