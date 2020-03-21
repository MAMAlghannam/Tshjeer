import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'native-base'
import moment from 'moment';
import * as Permissions from 'expo-permissions';

//importing form API folder
import wateringPlant from '../API/wateringPlant'

class WaterButton extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isWatering: false,
            newWateringTime: 0,
            isWatered: false
        }
    }

    _waterThePlant = async () =>{
        this.setState({isWatering: true})

        try{
            const {status} = await Permissions.getAsync(Permissions.LOCATION)
            if(status != 'granted'){
                alert('Ensure to enable your GPS')
            }
            navigator.geolocation.getCurrentPosition(
                (userCoords)=>{ //when it succeeded
                    const { postID, coords } = this.props
                    wateringPlant(userCoords, postID, coords)
                    .then(msg=>{
                        if(msg.data){
                            this.setState({isWatered: true, newWateringTime: new Date()})
                            alert("Thank you")
                            this.props.setLastTimeWatered(new Date())
                        }
                        else{
                            this.setState({isWatering: false})
                            alert("It just watered")    
                        }
                    })
                    .catch(err=>{
                        this.setState({isWatering: false})
                        alert("You are too far!")
                    })
                },
                (error) => {
                    alert(error)
                    this.setState({isWatering: false})
                },//when something went wrong
                {enableHighAccuracy: true}//options 
            )
        }
        catch(err){
            console.log('WaterPlant', err)
            this.setState({isWatering: false})
        }
    }

    render(){

        const { postID, lastTimeWatered, coords } = this.props

        const { isWatering, isWatered, newWateringTime } = this.state;

        const realLastTimeWatered = newWateringTime == 0 ? lastTimeWatered : newWateringTime ;

        if(isWatering && !isWatered)
            return(
            <View style={styles.buttonContainer}>
                <Text>{"    "}</Text>
                <ActivityIndicator size="small" color="lightblue" />
                <Text>{"    "}</Text>
            </View>
            )
        else if(isWatered || moment().diff(lastTimeWatered, 'h') < 15)
            return(
            <View style={styles.buttonContainer}>
                <Button 
                transparent
                disabled
                >
                    <Ionicons name="ios-water" size={30} color="lightgrey" />
                </Button>
            </View>
            )
        else 
            return (
            <View style={styles.buttonContainer}>
                <Button 
                transparent
                onPress={this._waterThePlant}
                >
                    <Ionicons name="ios-water" size={30} color="#b3e5fc" />
                </Button>
            </View>
            )
    }
}

const styles = StyleSheet.create({
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default WaterButton;
