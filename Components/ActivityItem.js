import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements'; 
import moment from 'moment';

//importing from API folder
import getUserByUID from '../API/getUserByUID'

export default class ActivityItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            avatar: '../images/avatarImg.png',
            message: <View style={styles.msgContainer}></View>,
            timestamp: 0,
            usernameFound: false
        }

    }

    async componentDidMount(){
        const { type, actor, timestamp } = this.props.activity;

        var { avatar, username } = await getUserByUID(actor)

        switch(type){
            case 'followed':
                var message = 
                <View style={styles.msgContainer}>
                    <TouchableOpacity onPress={()=> {  }}>
                        <Text style={styles.clickableStyle}>{username}</Text>
                    </TouchableOpacity>
                    <Text>{" "}followed you</Text>
                </View>;
                this.setState({avatar, message, timestamp, usernameFound: true})
                break;
            case 'watered':
                var message = 
                <View style={styles.msgContainer}>
                    <TouchableOpacity onPress={()=> {  }}>
                        <Text style={styles.clickableStyle}>{username}</Text>
                    </TouchableOpacity>
                    <Text>{" "}watered your{" "}</Text>
                    <TouchableOpacity onPress={()=> {  }}>
                        <Text style={styles.clickableStyle}>plant</Text>
                    </TouchableOpacity>
                </View>;
                this.setState({avatar, message, timestamp, usernameFound: true})
                break;
            case 'comment':
                var message = 
                <View style={styles.msgContainer}>
                    <TouchableOpacity onPress={()=> {  }}>
                        <Text style={styles.clickableStyle}>{username}</Text>
                    </TouchableOpacity>
                    <Text>{" "}commented:{" "}</Text>
                    <Text>{"'"+this.props.activity.content+"' "}</Text>
                    <Text> your </Text>
                    <TouchableOpacity onPress={()=> {  }}>
                        <Text style={styles.clickableStyle}>post</Text>
                    </TouchableOpacity>
                </View>;
                this.setState({avatar, message, timestamp, usernameFound: true})
                break;
        }
    }

    render(){
        const { avatar, message, timestamp, usernameFound } = this.state;
        if(usernameFound)
            return(
            <View style={{flexDirection: 'row', padding: 5, borderBottomWidth: 1, borderColor: 'grey'}}>
                <View style={styles.avatarContainer}> 
                    <Avatar source={{uri: avatar}} size={'small'} rounded/>
                </View>
                {message}
                <View style={styles.sinceContainer}>
                    <Text style={{textAlign: 'center'}}>{moment(timestamp).fromNow()}</Text>
                </View>
            </View>
            )
        else
            return null;
    }
}

const styles = StyleSheet.create({
    avatarContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    msgContainer:{
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        padding: 5
    },
    sinceContainer:{
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    clickableStyle:{
        color: 'green',
        fontWeight: 'bold'
    }
})