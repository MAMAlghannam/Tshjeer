import React from 'react'
import {View, Text, Alert, TouchableHighlight, Modal, StyleSheet} from 'react-native'
import TrashIcon from '@expo/vector-icons/FontAwesome';

//importing auth from firebase
import firebase from 'firebase/app';
import 'firebase/auth'

//importing from API folder
import deletePost from '../API/deletePost';

export default class DeleteButton extends React.Component {

    state = {
        modalVisible: false
    }

    _delete = () =>{
        Alert.alert(
            "Delete !",
            "Are you sure to delete this post?",
            [
                {text: 'Yes', onPress: () => {
                    deletePost(this.props.postID)
                    .then(()=>  this.props.deleted())
                    .catch((err)=> alert(err))
                }, style: 'destructive'},
                {text: 'No', style: 'default',}
            ]
        )
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    render(){
        
        const { modalVisible } = this.state;
        
        const currentUser = firebase.auth().currentUser || null;
        const { userID } = this.props; //ID for the owner of the post

        if(currentUser.uid == userID)
            return(
                <View style={{flex: 1}}>
                <TrashIcon name="trash" size={25} color="red" onPress={this._delete} />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>

                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                            onPress={() => {
                            this.setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                </View>
            )
        else
            return null;
    }
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });