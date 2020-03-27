import React from 'react';
import Icon from '@expo/vector-icons/Ionicons';

class SearchButton extends React.Component{
    render(){
        return (
            <Icon 
            color="white"
            style={{paddingRight:10, paddingLeft:10}} 
            name="md-search" size={30}
            onPress={()=> this.props.navigation.navigate('Search')}
            />
        );
    }
}

export default SearchButton;