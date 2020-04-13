import React from 'react';
import {View, ScrollView, Text, StyleSheet, RefreshControl} from 'react-native';
import { Header } from 'react-native-elements';
import Post from '../Components/Post';
import moment from 'moment'

//importing from API folder getWateredByUser
import getWateredByUser from '../API/getWateredByUser';

class Watering extends React.Component{

    static navigationOptions = ({ navigation }) => {
        return {
            headerShown: false,
        }
    };

    constructor(props){
        super(props);
        this.state = {
          posts: [],
          listOfpostID: [],
          listOftimestamps: [],
          listOfWateredKeys: [],
          refreshing: true
        }
    }

    componentDidMount(){
        this.bringPosts();
    }

    fillPosts = (p, l, pID, keys) =>{
        this.setState({posts: p, listOftimestamps: l, listOfpostID: pID, listOfWateredKeys: keys, refreshing: false})
      }
  
    bringPosts = () =>{
        this.setState({posts: []})
        var { userID } = this.props.navigation.state.params;
        getWateredByUser(userID, this.fillPosts)
    }
 
    render(){

        const { posts, listOftimestamps, listOfpostID, listOfWateredKeys, refreshing } = this.state;
        
        return (
            <View style={{flex: 1}}>
                <Header
                    containerStyle={{backgroundColor: '#8FBC8F'}}
                    leftComponent={{ icon: 'keyboard-arrow-left', size: 40, color: 'white', onPress: ()=> { this.props.navigation.goBack() } }}
                    centerComponent={ <Text style={{color: 'white', fontSize: 20,fontWeight: '500'}}>Watering</Text> }
                />
                {   posts.length == 0 ?
                    //if there is NO plants
                    <ScrollView style={{backgroundColor: '#efefef'}}
                    contentContainerStyle={{alignItems: 'center'}}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.bringPosts} />}
                    >
                    <Text style={{fontSize: 18, color: 'grey'}}>No plants yet</Text>
                </ScrollView> 
                :    //if there are plants
                    <ScrollView style={{flex: 1}}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.bringPosts} />}
                    >
                    {
                    posts.map((post, index)=>{
                    if(!post.isQuestion){
                        return (
                        <View key={listOfWateredKeys[index]} >
                        <View style={styles.back}>
                            <Text style={styles.label}>Watered this since {moment(listOftimestamps[index]).fromNow()}</Text>
                            <Post
                                placed="Map"
                                userID={post.uid}
                                postID={listOfpostID[index]}
                                imageUri={post.image}
                                isQuestion={post.isQuestion}
                                since={post.since}
                                desc={post.description}
                                lastTimeWatered={post.lastTimeWatered}
                                coords={post.coords}
                                navigation={this.props.navigation.navigate}
                            />
                        </View>
                        <View style={styles.margin}></View>
                        </View>
                        )
                    }
                    })
                    }
                    </ScrollView>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    back:{
        backgroundColor: '#00b8d4'
    },
    label:{
        color: 'white',
        padding: 5
    },
    margin:{
        margin: 15
    },
})

export default Watering;