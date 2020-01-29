import React from 'react';
import {View, Text, StyleSheet, Button, Image, Dimensions } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import LikeButton from './LikeButton';

class Post extends React.Component{
    render(){
        return(
            <View style={[styles.container, this.props.style]}>
            {/*first row*/}
            <View style={{flex:1, flexDirection:'row'}}>
                <View style={styles.userInfoContainer}>
                    <Avatar 
                        rounded
                        source={require('../images/avatarImg.png')} 
                        size={'small'} 
                        containerStyle={{margin:5}} 
                        title="T"
                    />
                    <Text style={{fontSize:20,margin: 5}}>username</Text>
                </View>
                <View style={styles.sinceContainer}>
                    <Text>-since-</Text>
                </View>
            </View>
            {/*second row*/}
            <View style={{borderWidth: 1, flex: 4, alignItems: 'center'}}>
                <Image
                    style={{ width: Dimensions.get('window').width*0.9}}
                    resizeMode='stretch'
                    source={require('../images/postImg.png')}
                />
            </View>
            {/*third row*/}
            <View style={{flex:1, flexDirection:'row'}}>
                <View style={styles.likeContainer}>
                    <LikeButton style={styles.likeBtn} />
                </View>
                <View style={styles.moreContainer}>
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
}

const styles = StyleSheet.create({
    container:{
        width: Dimensions.get('window').width*0.9,
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: Dimensions.get('window').width*0.05
    },
    userInfoContainer:{
        flex: 3,
        // borderWidth:1,
        flexDirection:'row',
        borderColor:'red',
        alignItems: 'center',
    },
    sinceContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth:1,
        borderColor:'#99ff66'
    },
    likeContainer:{
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 5,
        // borderWidth:1,
        borderColor:'red'
    },
    likeBtn:{
        marginLeft: '25%'
    },
    moreContainer:{
        flex: 1,
        padding: 5,
        // borderWidth:1,
        borderColor:'blue',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    moreBtn:{
        backgroundColor: 'grey',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10
    }
})

export default Post;