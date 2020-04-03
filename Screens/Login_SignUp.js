import React, { Component } from 'react';
import { View, 
  Text, StyleSheet,  Dimensions, TextInput, ActivityIndicator, TouchableOpacity} from 'react-native';
import Svg,{Image,Circle,ClipPath}from 'react-native-svg'
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');

// keyborad aware scroll view
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// importing login function
import login from '../API/login'

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}
class Login_SignUP extends Component {
  constructor(props) {
    super(props);

    this.state = {
    //user credintals
    email: "",
    password: "",

    loading: false
    }

    this.buttonOpacity = new Value(1);
    
    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            )
          ])
      }
    ]);
    this.onCloseState=event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              //هذي عشان تتقفل علامة الاكس عكسنا الواحد صفر والصفر واحد
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            )
          ])
      }
    ]);
    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP
    });
      //حق الصورة
    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3 - 50, 0],
      extrapolate: Extrapolate.CLAMP
    });
    this.textInputZindex=interpolate(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [1, -1],
        extrapolate: Extrapolate.CLAMP
      });
      this.textInputY=interpolate(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [0, 100],
        extrapolate: Extrapolate.CLAMP
      });
      this.textInputOpacity=interpolate(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP
      });
      this.rotateCross=interpolate(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [180, 360],
        extrapolate: Extrapolate.CLAMP 
      });
  }

  //login function
  _login = () => {
    this.setState({loading: true})

    const { email, password } = this.state;
    //this function in API folder
    login(email, password)
    .catch((err) => { 
      this.setState({loading: false})
      alert(err)
    });
  }

  //render function
  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'flex-end'
        }}
        enableOnAndroid={true} 
        extraScrollHeight={5}
      >
        
        <Animated.View
          style={{ 
            ...StyleSheet.absoluteFill,
            transform: [{ translateY: this.bgY }]
          }}
        >
          <Svg height={height + 50} width={width}>
            <ClipPath id="clip">
              <Circle r={height+50}cx={width/2}/>
            </ClipPath>
          <Image  
            href={require('../assets/Tsh33.jpg')}
           width={width}
           height={height+50}
           preserveAspectRatio="xMidYmid slice"
           clipPath="url(#clip)"
          /></Svg>
        </Animated.View>
        <View style={{ height: height / 3, justifyContent: 'center' }}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}  
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' ,color:'#54a87d' }}>SIGN IN</Text>
            </Animated.View>
          </TapGestureHandler>
          <TouchableOpacity  onPress={() => this.props.navigation.navigate('SignUp')}>
          <Animated.View
            style={{
              ...styles.button,
              backgroundColor: '#54a87d',
              opacity: this.buttonOpacity,
              transform: [{ translateY: this.buttonY }]
            }}
          >
            
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
              SIGN UP
            </Text>
          </Animated.View>
          
          </TouchableOpacity>
          <Animated.View style={{
            paddingTop: 15,
            zIndex: this.textInputZindex,
            opacity:this.textInputOpacity,
            transform:[{translateY:this.textInputY}],
            height:height/3,
            ...StyleSheet.absoluteFill,Top:null,
            justifyContent:'center'
          }}
          >
           <TapGestureHandler onHandlerStateChange={this.onCloseState}>
             <Animated.View style={styles.colseButton}>
              <Animated.Text style={{fontSize:15,
              transform:[{rotate: concat(this.rotateCross,
                'dog')}] 
                }}
                >X
                </Animated.Text>

             </Animated.View>
             </TapGestureHandler> 
          {/*username field*/}
          <TextInput
            placeholder="Email"
            value={this.state.email}
            onChangeText={(email)=>{this.setState({email: email})}}
            style={styles.textInput}
            placeholderTextColor='grey'
            returnKeyType="next"
            onSubmitEditing={() => this.passwordField.focus()}
          />
          {/*password field*/}
          <TextInput
            ref={ref => {this.passwordField = ref}}
            placeholder="Password"
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(pass)=>{this.setState({password: pass})}}
            style={styles.textInput}
            placeholderTextColor='grey'
            returnKeyType="go"
            onSubmitEditing={this._login}
          />
          <TouchableOpacity disabled={this.state.loading}  onPress={this._login}>
          <Animated.View style={styles.button} >
          {
            this.state.loading ? <ActivityIndicator size="large" color="lightgreen" /> 
             : <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text> 
          }
          </Animated.View>
          </TouchableOpacity>
          </Animated.View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default Login_SignUP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
                 
 backgroundColor: '#fff',
borderTopLeftRadius: 30,
borderTopRightRadius: 30,
    
  },
  button: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset:{width:2,height:2},
    shadowColor:'black',
    shadowOpacity:0.2
  },
  colseButton:{
    height:40,
    width:40,
    backgroundColor:'white',
    borderRadius:20,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    top:-20,
    left:width/2-20,
    shadowOffset:{width:2,height:2},
    shadowColor:'black',
    shadowOpacity:0.2
  },
  textInput:{
    height:50,
    borderRadius:25,
    borderWidth:0.5,
    marginHorizontal:20,
    paddingLeft:10,
    marginVertical:5,
    borderColor:'grey'/*'rgba(0,0,0,0.2)'*/,
    fontSize: 15, 
    fontWeight: 'bold',
    backgroundColor: 'white'
  }
});
