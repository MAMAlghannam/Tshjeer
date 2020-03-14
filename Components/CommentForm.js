import React from 'react';
import { View, StyleSheet, TextInput, Keyboard} from 'react-native'; 
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'

//importing from API folder
import sendComment from '../API/sendComment'

export default class CommentForm extends React .Component{

    constructor(props){
        super(props);
        this.state={
            text: ""
        }
    }

    sendComment = () =>{
        if(this.state.text.trim() != ""){
            sendComment(this.props.postID, this.state.text, this.props.addExtraData)
            this.setState({text: ""});
            Keyboard.dismiss();
        }
        Keyboard.dismiss();
    }

    render(){
        return(
        <KeyboardAccessoryView alwaysVisible={true}>
            <View style={styles.commentForm}>
                <TextInput
                    style={styles.inputField}
                    onChangeText={text => this.setState({text})}
                    value={this.state.text}
                    maxLength={500}
                    placeholder={"Type here..."}
                    ref={ref => {this.commentField = ref}}
                    returnKeyType="send"
                    onSubmitEditing={this.sendComment}
                />
            </View>
        </KeyboardAccessoryView>
        )
    }
}

const styles = StyleSheet.create({
    commentForm:{
        padding: 8,
        backgroundColor: '#d9d9d9',
        flexDirection: "row",
    },
    inputField:{
        borderWidth: 2,
        borderColor: 'grey',
        backgroundColor: 'white',
        padding: 8,
        fontSize: 18,
        flex: 4,
        borderRadius: 50
    },
    sendBtn:{
        flex: 1,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
        backgroundColor: '#009933'
    },
    sendBtnText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
})