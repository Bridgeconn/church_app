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
      token:false,
      showProgress: true,
      status:true
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
    console.log('hi')
    let data = new FormData();
    data.append("email", this.props.email);
    data.append("password", this.props.password);
    Utilities.validateEmailAndPassword(this.props.email,this.props.password);
    switch (Utilities.validateEmailAndPassword(this.props.email,this.props.password)) {
      case 0:{
        Actions.refresh({showProgress:true})
      const config = { headers: {'Church-App-Id': Config.CHURCH_APP_ID} }
      axios.defaults.headers.post[Config.HEADER_KEY_CONTENT_TYPE] = Config.CONTENT_TYPE;
      axios.post(Config.BASE_API_URL + Config.LOGIN_API_URL, data, config)
        .then((response) => { 
          console.log("loader showpregress"+response.data)
          Actions.refresh({showProgress:false})
          this.setState({showProgress:false})
          if (response.data.auth_token) {
            var token = response.data.auth_token;
            this.saveItem('token', token)
           
          }   
          if(response.data.success == true){
            console.log("success login")
            console.log(response.data)
              console.log('check token'+response.data.auth_token)
              console.log('enjoy')
              AsyncStorage.getItem('token').then((auth_token) => {
              this.setState({token: auth_token!== null})
              console.log("token to home"+this.state.token)
              Actions.home2();
            })  
          }
        })
        .catch(function (error) {
          Actions.refresh({showProgress:false})
          console.log(error)
          console.log("something went wrong")
          alert('something went wrong')    
        })      
       }
      case 1:{
        alert("Email or Password is empty")
        break;
      }
      case 2:{
        alert("Password length is too short. Minimum Password length should be 6 characters")
        break;
      }
      case 3:{
        alert("Invalid Email")
        break;
      }
    }               
  }

  

  render() {
    return (
      <View >
        <TouchableOpacity onPress={this.onLoginPressed.bind(this) } style={styles.buttonRegister}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    )
  
  }
}



export default Login
