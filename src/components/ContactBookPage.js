
import React, {Component} from 'react'
import {View,StyleSheet,Text,ScrollView,TouchableHighlight,Image,Dimensions,TouchableOpacity} from 'react-native';
import {ListItem,List} from 'native-base'
import {Actions} from 'react-native-router-flux'
import Panel from './EventsAccordion';
import contactList from './contactListDummy.json'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import Communications from 'react-native-communications';
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
                       {data.map(item =>
                        <List key={item.id} style={styles.listStyle}>
                        <ListItem  style={styles.listItemStyle}>
                          <Text style={styles.textStyle}>{item.contact_name}</Text>
                        </ListItem>
                        <ListItem style={styles.listItemStyle}>
                        <TouchableOpacity onPress={() => Communications.phonecall(item.contact_number, true)}>
                            <Text style={styles.textStyle}>{item.contact_number}</Text>
                        </TouchableOpacity>
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
    marginLeft:0,
    paddingTop:0
  },
  textStyle:{
    padding:0,
    fontSize:18
    
  },
  holder: {
    flex: 0.25,
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
  },
})
  
