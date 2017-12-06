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
import styles from '../style/styles.js'

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
      
        <Text style={styles.tryGuestText} onPress={this.onGuestLogin.bind(this) }>
            Explore as Guest
        </Text>
      
    )
  }
}


export default GuestLogin
