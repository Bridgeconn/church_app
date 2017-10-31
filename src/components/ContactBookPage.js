
import React, {Component} from 'react'
import {View,Text,ScrollView,TouchableHighlight,Image,Dimensions,TouchableOpacity} from 'react-native';
import {ListItem,List} from 'native-base'
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
          	<View style={{flex:1}}>
          <View style={{flex:1}}>
             {data.map(item =>
              <List key={item.id} style={styles.contactListStyle}>
              <ListItem  style={styles.contactListItemStyle}>
                <Text style={styles.contactTextStyle}>{item.contact_name}</Text>
              </ListItem>
              <ListItem style={styles.contactListItemStyle} >
              <TouchableOpacity onPress={() => Communications.phonecall(item.contact_number, true)} style={{flexDirection:"row"}}>
              <Icon name="call" size={30} />
              <Text style={styles.contactTextStyle}>{item.contact_number}</Text>
                  
              </TouchableOpacity>
              </ListItem>
              </List>
              )}
          </View>
          </View>
                )

                                                                                                                                                                                                                                          
}
}

