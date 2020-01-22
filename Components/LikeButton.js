import React from 'react';
import { Icon } from 'react-native-elements';

class LikeButton extends React.Component{
    render(){
        return (
            <Icon
            containerStyle={this.props.style}
            name='heart-o'
            type='font-awesome'
            color='#e63900'
            size={27}
            onPress={()=>{}}
            />
        )
    }
}

export default LikeButton;
