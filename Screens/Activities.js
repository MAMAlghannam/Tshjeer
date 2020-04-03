import React from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { Header } from 'react-native-elements'
import ActivityItem from '../Components/ActivityItem';

//importing from API folder
import getActivities from '../API/getActivities'

export default class Activities extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Username",
    }
  }

  constructor(props){
    super(props);
    this.state = {
      activities: [],
      refreshing: true
    }
  }

  fillActivities = (activities) =>{
    this.setState({activities, refreshing: false})
  }

  componentDidMount(){
    this.bringActivities();
  }

  bringActivities = () =>{
    this.setState({activities: []})
    getActivities(this.fillActivities);
  }

  render(){
    const { navigation } = this.props;
    const { activities } = this.state;
    return (
      <View style={{flex: 1}}>
        <Header
          containerStyle={{backgroundColor: '#8FBC8F'}}
          leftComponent={{ icon: 'menu', size: 30, color: 'white', onPress: ()=> { this.props.navigation.openDrawer() } }}
          centerComponent={ <Text style={{color: 'white', fontSize: 20,fontWeight: '500'}}>Activities</Text> }
        />
      { activities.length == 0 ? 
        //if there is no activity found
        <ScrollView style={{backgroundColor: '#efefef'}}
          contentContainerStyle={{alignItems: 'center'}}
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.bringActivities} />}
        >
          <Text style={{fontSize: 18, color: 'grey'}}>No activities yet</Text>
        </ScrollView> 
        : 
        //if there is activity found
        <ScrollView style={{backgroundColor: '#efefef'}}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.bringActivities} />
          }
        >
        {
          Object.entries(activities).reverse().map((activity, index)=>(
            <ActivityItem 
              key={activity[0]} 
              activity={activity[1]} 
              navigation={navigation.navigate} 
            />
          ))
        }
        </ScrollView>
      }
      </View>
    );
  }
}