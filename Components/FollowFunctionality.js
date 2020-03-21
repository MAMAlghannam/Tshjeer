import React from 'react';
import { Text, ActivityIndicator, Alert } from 'react-native';
import { Button } from 'native-base'

//importing from API floder
import checkFollowing, { follow, unfollow } from '../API/checkFollowing';

export default class FollowFunctionality extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isFollowed: null
        }
    }

    async componentDidMount(){
        const result  = await checkFollowing(this.props.userID);
        this.setState({isFollowed: result});
    }

    _follow = () =>{
        const { userID } = this.props;
        follow(userID);
        this.setState({isFollowed: true})
    }
    
    _unfollow = () =>{
        const { userID } = this.props;
        Alert.alert(
            'Unfollow !',
            'Are you sure to unfollow this user?',
            [
                {text: 'Yes', onPress: () => {
                    unfollow(userID);
                    this.setState({isFollowed: false})
                }, style: 'destructive'},
                {text: 'No', style: 'default',}
            ]
        )
    }

    render(){
        const { isFollowed } = this.state;
        if(isFollowed == null)
            return(
                <Button transparent title="loading" disabled>
                    <ActivityIndicator color="#3492ca" size="small" />
                </Button>
            )
        else if(isFollowed)
            return(
                <Button transparent 
                style={{borderWidth: 1, borderColor: 'black', padding: 10 }}
                onPress={this._unfollow}>
                    <Text  style={{fontSize:15 }}>Followed</Text>
                </Button>
            )
        else
            return(
                <Button transparent title="Follow" onPress={this._follow}>
                    <Text  style={{ fontSize:15 , color:"#3492ca"}}>Follow </Text>
                </Button>
            )
    }
}