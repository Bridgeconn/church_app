
import React, {Component} from 'react'
import {View,Text,ScrollView,TouchableHighlight,Image,Dimensions,TouchableOpacity} from 'react-native';
import {Card,CardItem,Content} from 'native-base'
import {Actions} from 'react-native-router-flux'
import contactList from './contactListDummy.json'
import styles from '../style/styles.js'
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class ContactPage extends Component{

 constructor(){
        super()
        this.state ={
            data: []   
          }
          this.getData =this.getData.bind(this);
    }

    getData(){
      const data = contactList.contacts
      this.setState({data: data})  
      console.log("data"+data)
    }
        componentDidMount() {
        this.getData();
    }
    onPressCall() {
    const url = 'telprompt:5551231234';
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url)
            .catch(() => null);
        }
      });
}
    render() {
      const data = this.state.data;
          return (
          	<View style={styles.container}>
            <ScrollView>
             {data.map(item =>
              <Content>
              <Card key={item.id}>
              <CardItem>
                <Text>{item.contact_name}</Text>
              </CardItem>
              <CardItem >
              <TouchableOpacity onPress={() => Communications.phonecall(item.contact_number, true)} style={{flexDirection:"row"}}>
              <Icon name="call" size={24} />
              <Text >{item.contact_number}</Text>   
              </TouchableOpacity>
              </CardItem>
              </Card>
              </Content>
              )}
            </ScrollView>
          </View>
                )

                                                                                                                                                                                                                                          
}
}

