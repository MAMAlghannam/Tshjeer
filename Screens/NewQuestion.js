import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class NewQuestion extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            q: "",
        }
    }

    render(){
        return(
        <View style={{flex: 1}}>
            {/* Since the NewQuestion screen doesn't in stack navigator we have to put it hard coded */}
            <Header
                containerStyle={{backgroundColor: 'white'}}
                rightComponent={{ icon: 'close', onPress: ()=> { this.props.navigation.navigate('Add') } }}
                centerComponent={ <Text style={{fontSize: 18,fontWeight: '500'}}>New Question</Text> }
            />
            {/* "KeyboardAwareScrollView" tag is downloaded separately as clear above, it moves above 
               the keyboard but we most set "extraScrollHeight" and "enableOnAndroid" properties */}
            <KeyboardAwareScrollView style={{flex: 1,}} enableOnAndroid={true} extraScrollHeight={50} >
                <View style={{flex: 8, padding: 10}}>
                    <Text style={{fontSize: 18}}>What do you want to ask others? </Text>
                    <TextInput
                        multiline style={styles.questionStyle}
                        onChangeText={text => this.setState({ q: text})}
                        value={this.state.q} maxLength={500}
                        placeholder={"Type here..."}
                    />
                </View>
            </KeyboardAwareScrollView>
            <TouchableOpacity style={styles.askButton}>
                <Text style={{fontSize: 18, color: 'white'}}>Ask</Text>
            </TouchableOpacity>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    questionStyle:{
        borderWidth: 1,
        padding: 8,
        fontSize: 16,
        backgroundColor: 'white'
    },
    askButton:{
        position: 'relative', 
        bottom: 0, 
        backgroundColor: "darkblue",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    }
})

export default NewQuestion;