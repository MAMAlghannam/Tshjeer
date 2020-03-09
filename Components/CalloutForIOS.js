import React from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
import { Callout } from 'react-native-maps';
import { Avatar, Image } from 'react-native-elements'; 
import moment from 'moment';
import Arrow from '@expo/vector-icons/FontAwesome';

//importing from API folder
import getUserByUID from '../API/getUserByUID'

export default class CalloutForIOS extends React.Component{

    constructor(props){
        super(props);
        this.state={
            avatar: '../images/avatarImg.png',
            username: ""
        }
    }

    async componentDidMount(){
        var { avatar, username } = await getUserByUID(this.props.uid)
        this.setState({username: username, avatar: avatar})
    }

    render(){
        return (
        <Callout
        tooltip 
        style={{width: Dimensions.get('window').width*0.8}}
        onPress={()=>{
            const postInfo = {
            postID: this.props.postID,
            image: this.props.image, 
            since: this.props.since, 
            desc: this.props.desc, 
            uid: this.props.uid,
            lastTimeWatered: this.props.lastTimeWatered,
            isQuestion: this.props.isQuestion
            }
            this.props.navigation('PostContainerInMap', postInfo)
        }}>
            {/*first row*/}
            <View style={styles.firstRow}>
            <View style={styles.userInfoContainer}>
                <Avatar source={{uri: this.state.avatar}} size={'small'} containerStyle={{margin:5}} rounded title="T"/>
                <Text style={{fontSize:20, margin: 5}}>{this.state.username}</Text>
            </View>
            <View style={styles.sinceContainer}>
                <Text>{moment(new Date(this.props.since)).fromNow(true)}</Text>
            </View>
            </View>
            {/*second row*/
            this.props.isQuestion ? <View style={styles.question}><Text >{this.props.desc}</Text></View> 
            : <Image 
                source={{uri: this.props.image}} 
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
}

const styles = StyleSheet.create({
    //styling for CalloutForIOS
    firstRow:{
      padding: 5,
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