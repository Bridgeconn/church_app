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
import {loginButtonStyle} from '../style/styles.js'
import Config from 'react-native-config'
import Utilities from './Utilities'
import * as AsyncStorageConstants from './AsyncStorageConstants';



class LoginButton extends Component {
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
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error);
    }
  }
  /**
  *function onLoginPressed 
  *call on login button press
  *validete email filed and password field
  */
  onLoginPressed(){
    let data = new FormData();
    data.append("email", this.props.email);
    data.append("password", this.props.password);
    // validation done in Utilities file
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
            console.log("auth data token"+response.data.user.auth_token)
            console.log("auth data email"+response.data.user.email)
            console.log(" USER DATA STATUS "+ response.data.user.user_status)
            this.setState({tokenValue: response.data.user.auth_token})
            this.setState({email: response.data.user.email})
            //save auth_token,first_name,user_contact,email,user_status to asyncStorage (local storage)
            this.saveItem(AsyncStorageConstants.UserToken, response.data.user.auth_token)
            this.saveItem(AsyncStorageConstants.UserName, response.data.user.first_name)
            this.saveItem(AsyncStorageConstants.UserContactNumber, response.data.user.user_contact)
            this.saveItem(AsyncStorageConstants.UserEmail, response.data.user.email)
            this.saveItem(AsyncStorageConstants.UserCheckBoxEmail,  JSON.stringify(response.data.user.user_status))
            this.saveItem(AsyncStorageConstants.UserCheckBoxContact,JSON.stringify(response.data.user.user_status))
            //update value on router page
            this.props.action([response.data.user.auth_token, response.data.user.email, response.data.user.first_name, 
                  response.data.user.user_contact, response.data.user.user_status, response.data.user.user_status]);
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) =>{
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
        <TouchableOpacity onPress={this.onLoginPressed.bind(this) } style={loginButtonStyle.buttonRegister}>
          <Text style={loginButtonStyle.loginButtonText}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    )
  
  }
}

export default LoginButton