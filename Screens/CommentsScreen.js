import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, } from 'react-native'; 
import CommentForm from '../Components/CommentForm';
import Comment from '../Components/Comment';

//importing from API folder
import getComments from '../API/getComments';
import getUserByUID from '../API/getUserByUID';


/*
    separate comment container
*/

class CommentsScreen extends React.Component{

    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: "Comments",
        }
    };

    constructor(props){
        super(props);
        this.state = {
            comments: [],
            extraComment: null
        }
    }

    addExtraData = ({userID, comment}) =>{
        const newComment = [];
        newComment[0] = "who knows!";
        newComment[1] = {userID, comment, timestamp: 0};
        this.setState({comments: [...this.state.comments, newComment]})
    }

    fillComments = (c) =>{
        this.setState({comments: Object.entries(c)})
    }

    useGetUserByUID = async (uid) =>{
        var { username } = await getUserByUID(uid)
        console.log(username);
        return username;
    }

    componentDidMount(){
        const { postID } = this.props.navigation.state.params;
        getComments(postID, this.fillComments)
    }

    render(){

        const { postID } = this.props.navigation.state.params;

        return(
        <View style={{flex: 1, borderColor: 'blue'}}>
            <View style={{flex: 8}}>
            <FlatList
            data={this.state.comments}
            renderItem={({ item }) => (
                <Comment 
                    userID={item[1].userID} 
                    comment={item[1].comment} 
                    timestamp={item[1].timestamp} 
                />
            )}
            ref={ref=>{this.commentsList = ref}}
            extraData={this.state}
            keyExtractor={item => item[0]}
            />
            </View>
            <CommentForm addExtraData={this.addExtraData} postID={postID} />
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
    commentFormContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        // borderWidth: 1,
        borderColor: 'pink'
    },
})

export default CommentsScreen;