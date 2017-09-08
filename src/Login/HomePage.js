import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View,AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
<<<<<<< HEAD

class HomePage extends Component {

 

=======
import styles from '../style/styles.js'

class HomePage extends Component {

  getProtectedQuote() {
    Alert.alert('We will print a Chuck Norris quote')
  }

  userLogout() {
    Actions.Authentication();
  }
>>>>>>> 22bd387d3f76abf6b321bda70780f5fdb63ca002
  async userLogout() {
    try {
      await AsyncStorage.removeItem('id_token');
      Alert.alert('Logout Success!');
      Actions.Authentication();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
<<<<<<< HEAD
  render() {
    return (
      <View >
        <TouchableOpacity onPress={this.userLogout}>
          <Text > Log out </Text>
=======
  getProtectedQuote() {
  AsyncStorage.getItem('id_token').then((token) => {
    
    fetch('http://192.168.XXX.XXX:3001/api/protected/random-quote', {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then((response) => response.text())
    .then((quote) => {
      Alert.alert('Chuck Norris Quote', quote)
    })
    .done();
  })
}
  render() {
    return (
      <View style={styles.container}>
    

        <TouchableOpacity style={styles.buttonWrapper} onPress={this.getProtectedQuote}>
          <Text style={styles.buttonText}> Get Chuck Norris quote! </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonWrapper} onPress={this.userLogout}>
          <Text style={styles.buttonText} > Log out </Text>
>>>>>>> 22bd387d3f76abf6b321bda70780f5fdb63ca002
        </TouchableOpacity>
      </View>
    );
  }
}

export default HomePage;