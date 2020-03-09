import React from 'react';
import { View, StyleSheet, Text } from 'react-native'; 

//importing from API folder
import getUserByUID from '../API/getUserByUID'

export default class Comment extends React.Component{

    constructor(props){
        super(props);
        this.state={
            username: ""
        }
    }

    async componentDidMount(){
        var { username } = await getUserByUID(this.props.userID)
        this.setState({username: username})
    }

    render(){
        return (
        <View style={styles.commentContainer}>
            <Text style={styles.username}>{this.state.username}: </Text>
            <Text style={styles.content}>{this.props.comment}</Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({   
    commentContainer:{
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }, 
    username:{
        color: 'green',
        fontWeight: 'bold',
        fontSize: 17,
    },
    content:{
        flex: 1,
        fontSize: 16,
    },
})