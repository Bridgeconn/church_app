
import React, {Component} from 'react'
import {View,StyleSheet,Text,ScrollView,TouchableHighlight,Image,Dimensions} from 'react-native';
import {ListItem,List} from 'native-base'
import {Actions} from 'react-native-router-flux'
import Panel from './EventsAccordion';
import contactList from './contactListDummy.json'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class EventsPage extends Component{

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
    render() {
      const data = this.state.data;
          return (
                    <View style={styles.container}>
                       {data.map(item =>
                        <List key={item.id} >
                        <ListItem  style={{borderBottomWidth: 0}}>
                          <Text>{item.contact_name}</Text>
                        </ListItem>
                        <ListItem  style={{borderBottomWidth: 0}}>
                          <Text>{item.contact_number}</Text>
                        </ListItem>
                        </List>
                        )}
                    </View>
                
                )

                                                                                                                                                                                                                                          
}
}

var styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent:"flex-start",
    alignItems:"flex-start",
    backgroundColor:"#fff"
  },
})
  
