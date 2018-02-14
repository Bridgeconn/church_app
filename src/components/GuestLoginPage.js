import React, {Component} from 'react'
import axios from 'axios';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  Text,
  Alert,
  View
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import {guestLogin as guestLogin} from '../style/style2.js'
const guestLoginStyle = StyleSheet.create(guestLogin)

class GuestLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  onGuestLogin() {
    AsyncStorage.setItem("guest", '1');
    Actions.home2()  
  }
  
  render() {
    return (
      
        <Text style={guestLogin.tryGuestText} onPress={this.onGuestLogin.bind(this) }>
            Explore as Guest
        </Text>
      
    )
  }
}


export default GuestLogin
