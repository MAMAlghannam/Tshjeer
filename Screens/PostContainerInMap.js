import React from 'react';
import { View, StyleSheet } from 'react-native';
import Post from '../Components/Post'; 

class PostContainerInMap extends React.Component{

    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: navigation.state.params.isQuestion ? "Question" : "Post",
          headerTitleStyle:{ color: "#008B45", fontSize: 20 },
          headerStyle:{
              backgroundColor: 'white',
              borderBottomWidth: 1,
              borderBottomColor: 'lightgrey',
          },
        }
    };

    render(){
        const {postID, image, since, desc, uid, isQuestion, lastTimeWatered, coords} = this.props.navigation.state.params;
        return(
        <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
            <Post
                placed="Map"
                userID={uid}
                postID={postID}
                imageUri={image}
                isQuestion={isQuestion}
                since={since}
                desc={desc}
                lastTimeWatered={lastTimeWatered}
                coords={coords}
                navigation={this.props.navigation.navigate}
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    
})

export default PostContainerInMap;