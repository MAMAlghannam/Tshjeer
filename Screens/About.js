import React, { Component } from 'react';
import { ImageBackground,TouchableOpacity } from 'react-native';
import { Ionicons, EvilIcons ,Feather,FontAwesome,MaterialIcons,AntDesign, Entypo} from '@expo/vector-icons';
import { Container, /*Header,*/ Content, Card, CardItem, Text, Body,View ,Button, Icon, Fab,Left,Title,Right} from 'native-base';
import { Header } from 'react-native-elements'
import ListButton from '../Components/ListButton';

export default class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    };
  }
  render() {
    const { navigation } = this.props;
    return (
      <Container>
      
        <ImageBackground source={ require('../assets/16.png')} style= {{
        flex: 1,
        width: '100%',
        height: '100%',
       
        opacity: 0.8
    }} >
    {/*  <Header style={{ backgroundColor:'#8FBC8F'}}>
          <Left>
            <Button transparent onPress={()=>this.props.navigation.openDrawer()}>
              <Icon  style={{color: 'white'}}  name='menu' />
            </Button>
          </Left>
          <Body>
            <Title style={{fontSize:21,color:'white'}}>About</Title>
          </Body>
          <Right>
            <Button transparent>
              <Text></Text>
            </Button>
          </Right>
        </Header>
    */}
      <Header
        containerStyle={{backgroundColor: '#8FBC8F'}}
        leftComponent={ <ListButton navigation={this.props.navigation} />}
        centerComponent={ <Text style={{color: 'white', fontSize: 20,fontWeight: '500'}}>About</Text> }
      />

        <Content >
        
 
    
        <View style={{ justifyContent: "center",
        alignItems: "center",}}>
          <Card style={{ opacity: 0.7, width:240,marginTop:160,}}>
            <CardItem header >
              <Text style={{fontSize:26}}>           Tshjeer </Text>
            </CardItem>
            <CardItem footer style={{marginTop:-10}} >
              <Body>
              <Text style={{fontWeight:'bold'}}>About</Text>
                <Text>
                  The first social media application 
                  that cares about planting to change 
                  the envirment and imporve the quality 
                  of life
                </Text>
              </Body>
              
            </CardItem>
            <CardItem footer style={{marginTop:-10}}>
              <Text>initiative </Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={{marginTop:-20}}>
                  planting more that 1m plants araound the world.
                </Text>
              </Body>
            </CardItem>
            <CardItem footer style={{marginTop:-10}}>
              <Text>Contact us </Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={{marginTop:-20}}>
                  you can contact us by clicking on the Button down below. 
                </Text>
              </Body>
            </CardItem>
            
            
         </Card>  
         </View>
        </Content>
        <View style={{ marginLeft:300,marginBottom:6}}>
          <Fab
            active={this.state.active}
            direction="left"
            containerStyle={{ }}
            style={{ backgroundColor: '#34A34F' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="share" />
            <Button style={{ backgroundColor: '#34A34F' }}>
              <Icon name="logo-whatsapp" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }}>
              <Icon name="logo-facebook" />
            </Button>
            <Button disabled style={{ backgroundColor: '#DD5144' }}>
              <Icon name="mail" />
            </Button>
          </Fab>
        </View>
        </ImageBackground>
      </Container>
    );
  }
}