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
  View,
  NetInfo
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import styles from '../style/styles.js'
import Config from 'react-native-config'
import Utilities from './Utilities'

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: "",
      tokenValue:null,
      showProgress: true
    }
  }
  async saveItem(item, selectedValue) {
    try {
      AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error);
    }
  }
  onLoginPressed(){
    let data = new FormData();
    data.append("email", this.props.email);
    data.append("password", this.props.password);
    var validationResult = Utilities.validateEmailAndPassword(this.props.email,this.props.password);
    if (validationResult == 0) {
        Actions.refresh({showProgress:true})
      const config = { headers: {'Church-App-Id': Config.CHURCH_APP_ID} }
      axios.defaults.headers.post[Config.HEADER_KEY_CONTENT_TYPE] = Config.CONTENT_TYPE;
      axios.post(Config.BASE_API_URL + Config.LOGIN_API_URL, data, config)
        .then((response) => { 
          console.log("loader showpregress"+JSON.stringify(response))
          Actions.refresh({showProgress:false})
          this.setState({showProgress:false})

          if (response.data.success) {
            console.log("success login")
            var tokenValue = response.data.user.auth_token;
          console.log("auth data token"+tokenValue)
            this.setState({tokenValue:tokenValue})
            this.saveItem('token', tokenValue)
              Actions.home2({tokenValue:'1234567'});
          } else {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          Actions.refresh({showProgress:false})
          console.log("ERROR == "+error)
          alert('There is some problem with email or password'); 
        })      
       } else {
          alert(Utilities.formValidationAlerts(validationResult));
       }
  }

  render() {
    return (
      <View >
        <TouchableOpacity onPress={this.onLoginPressed.bind(this) } style={styles.buttonRegister}>
          <Text style={styles.loginButtonText}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    )
  
  }
}

export default Login