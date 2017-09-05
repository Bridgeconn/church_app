import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View,AsyncStorage,Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
class Authentication extends Component {

  constructor() {
    super();
    this.state = { username: null, password: null };
  }

  userSignup() {
  if (!this.state.username || !this.state.password) return;
  // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
  fetch(' https://churchappapi.herokuapp.com/api/v1/users', {
    method: 'POST',
    headers: { 'Accept': 'application/x-www-form-urlencoded', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: JSON.stringify({
      username: this.state.username,
      password: this.state.password,
    })
  })
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
  // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
  fetch(' https://churchappapi.herokuapp.com/api/v1/users/login', {
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
          <TextInput
            editable={true}
            onChangeText={(username) => this.setState({username})}
            placeholder='Username'
            ref='username'
            returnKeyType='next'
            
            value={this.state.username}
          />

          <TextInput
            editable={true}
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'
            ref='password'
            returnKeyType='next'
            secureTextEntry={true}
            
            value={this.state.password}
          />

          <TouchableOpacity  onPress={this.userLogin.bind(this)}>
            <Text > Log In </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.userSignup.bind(this)}>
            <Text> Sign Up </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Authentication;