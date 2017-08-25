import React , {Component} from 'react'
import { AppRegistry, StyleSheet, Text, View, ScrollView, TouchableHighlight, TextInput}  from 'react-native'
import ContactList from './ContactList'
import Contacts from 'react-native-contacts'

export default class AddressbookDemo extends Component{
  constructor(){
    super()
    this.state = {
      contacts: [],
    }
    
    this.newContact = this.newContact.bind(this);
  }

  

  newContact(){
    var newPerson1 = {
  emailAddresses: [{
    label: "work",
    email: "abcd-jung@example.com",
  }],
  givenName: "abcd-jung",
  phoneNumbers: [{
    label: "mobile",
    number: "(555) 555-5555",
  }],
 
}
 var newPerson2 = {
  emailAddresses: [{
    label: "work",
    email: "efgh-jung@example.com",
  }],
  givenName: "efgh-jung",
  phoneNumbers: [{
    label: "mobile",
    number: "(555) 555-6655",
  }],
 
}
 var newPerson3 = {
  emailAddresses: [{
    label: "work",
    email: "ghij-jung@example.com",
  }],
  givenName: "ghij-jung",
  phoneNumbers: [{
    label: "mobile",
    number: "(555) 555-4455",
  }],
 
}
    Contacts.addContact(newPerson1,(err) => {
      console.log('NEW CONTACT', err, newPerson1)
      console.log(newPerson1)
    })
    Contacts.addContact(newPerson2,(err) => {
      console.log(newPerson2)
    })
    Contacts.addContact(newPerson3,(err) => {
      console.log('NEW CONTACT', err, newPerson3)
      console.log(newPerson3)
    })
    
  }

 
 
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={this.newContact}>
          <Text>add Contact</Text>
        </TouchableHighlight>
        <ContactList contacts={this.state.contacts} />
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
  },
  note: {
    fontSize:20,
    fontWeight:'bold',
  },
  button: {
    backgroundColor: 'rgba(0,0,0,.6)',
    padding:5,
    borderRadius:3,
    borderWidth:1,
    margin: 5,
    borderColor: 'rgba(0,0,0,.8)'
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
  },
});