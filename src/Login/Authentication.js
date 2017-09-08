import React, {Component} from 'react';
<<<<<<< HEAD
import {Text, TextInput, TouchableOpacity, View,AsyncStorage,Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
=======
import {Text, TextInput, TouchableOpacity, View,AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from '../style/styles.js'

>>>>>>> 22bd387d3f76abf6b321bda70780f5fdb63ca002
class Authentication extends Component {

  constructor() {
    super();
    this.state = { username: null, password: null };
  }

  userSignup() {
<<<<<<< HEAD
  if (!this.state.username || !this.state.password) return;
  
  fetch(' https://churchappapi.herokuapp.com/api/v1/users', {
=======
    Actions.HomePage();
  }

  userLogin() {
    Actions.HomePage();
  }
  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }
  userSignup() {
  if (!this.state.username || !this.state.password) return;
  
  fetch('https://churchappapi.herokuapp.com/api/v1/users', {
>>>>>>> 22bd387d3f76abf6b321bda70780f5fdb63ca002
    method: 'POST',
    headers: { 'Accept': 'application/x-www-form-urlencoded', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: JSON.stringify({
      username: this.state.username,
      password: this.state.password,
    })
  })
<<<<<<< HEAD
  .then((response) => response.json()) 
  .then((responseData) => {
    console.log(responseData)
    if (responseData.status >= 200 && responseData.status < 300) {
      this.saveItem('id_token', responseData.id_token),
      Alert.alert( 'Signup Success!', 'Click the button to get a Chuck Norris quote!'),
      Actions.HomePage();
    console.log('success', request.responseText);

  } else {
    console.warn('error');
    }
    
  })
  .done();
  console.log('hi')

}
  userLogin() {
  if (!this.state.username || !this.state.password) return;
  
  fetch(' https://churchappapi.herokuapp.com/api/v1/users/login', {
=======
  .then((response) => response.json())
  .then((responseData) => {
    this.saveItem('id_token', responseData.id_token),
    Alert.alert( 'Signup Success!', 'Click the button to get a Chuck Norris quote!'),
    Actions.HomePage();
  })
  .done();
}
userLogin() {
  if (!this.state.username || !this.state.password) return;
  fetch('https://churchappapi.herokuapp.com/api/v1/users/login', {
>>>>>>> 22bd387d3f76abf6b321bda70780f5fdb63ca002
    method: 'POST',
    headers: { 'Accept': 'application/x-www-form-urlencoded', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: JSON.stringify({
      username: this.state.username,
      password: this.state.password,
    })
  })
  .then((response) => response.json())
  .then((responseData) => {
    this.saveItem('id_token', responseData.id_token),
    Alert.alert('Login Success!', 'Click the button to get a Chuck Norris quote!'),
    Actions.HomePage();
  })
  .done();
<<<<<<< HEAD
  console.log('hello')
}
  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }
  render() {
    return (
      <View>
        <Text> Welcome </Text>

        <View >
=======
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Welcome </Text>

        <View style={styles.form}>
>>>>>>> 22bd387d3f76abf6b321bda70780f5fdb63ca002
          <TextInput
            editable={true}
            onChangeText={(username) => this.setState({username})}
            placeholder='Username'
            ref='username'
            returnKeyType='next'
<<<<<<< HEAD
            
=======
            style={styles.inputText}
>>>>>>> 22bd387d3f76abf6b321bda70780f5fdb63ca002
            value={this.state.username}
          />

          <TextInput
            editable={true}
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'
            ref='password'
            returnKeyType='next'
            secureTextEntry={true}
<<<<<<< HEAD
            
            value={this.state.password}
          />

          <TouchableOpacity  onPress={this.userLogin.bind(this)}>
            <Text > Log In </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.userSignup.bind(this)}>
            <Text> Sign Up </Text>
=======
            style={styles.inputText}
            value={this.state.password}
          />

          <TouchableOpacity style={styles.buttonWrapper} onPress={this.userLogin.bind(this)}>
            <Text style={styles.buttonText}> Log In </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonWrapper} onPress={this.userSignup.bind(this)}>
            <Text style={styles.buttonText}> Sign Up </Text>
>>>>>>> 22bd387d3f76abf6b321bda70780f5fdb63ca002
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Authentication;