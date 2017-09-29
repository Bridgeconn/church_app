
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
                        <List key={item.id} style={styles.listStyle}>
                        <ListItem  style={styles.listItemStyle}>
                          <Text style={styles.textStyle}>{item.contact_name}</Text>
                        </ListItem>
                        <ListItem  style={styles.listItemStyle}>
                          <Text style={styles.textStyle}>{item.contact_number}</Text>
                        </ListItem>
                        </List>
                        )}
                    </View>
                
                )

                                                                                                                                                                                                                                          
}
}

var styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"flex-start",
    alignItems:"flex-start",
    backgroundColor:"#fff"
  },
  listStyle:{
    padding:5,
    borderRadius:5,
    borderWidth:1,
    margin: 5,
    width:width*0.98,
    borderColor: 'rgba(0,0,0,.8)'
  },
  listItemStyle:{
    borderBottomWidth:0,
  },
  textStyle:{
    padding:0,
    fontSize:18
    
  }
})
  
