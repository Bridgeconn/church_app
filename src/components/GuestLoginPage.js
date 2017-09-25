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

class GuestLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
    onGuestLogin() {
      AsyncStorage.setItem("guest", '1');
      Actions.replace(Actions.home({hasToken:false, guestKey:true}), "");
    
      
      
    }
  
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onGuestLogin.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Guest Login
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    padding: 5,
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  }
});

export default GuestLogin
