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

import Config from 'react-native-config'

class Signup extends Component {
  constructor(props){
    super(props);

    this.state = {
      error: "",
      showProgress: true,

    }
  }
  onRegisterPressed() {
    let data = new FormData();
    data.append("user[email]", this.props.email);
    data.append("user[password]", this.props.password);
    if(this.props.email=="" || this.props.password==""){
      alert("please fill the fields properly")
    }
    else{
       Actions.refresh({showProgress:true})
       const config = { headers: {Config.HEADER_KEY_CHURCH_APP_ID: Config.CHURCH_APP_ID} };
      axios.defaults.headers.post[Config.HEADER_KEY_CONTENT_TYPE] = Config.CONTENT_TYPE;
      axios.post(Config.BASE_API_URL + Config.SIGNUP_API_URL, data, config)
        .then((response) => {
          console.log(response)
          console.log("RESPONSE.STATUS == "+response.status)
          if(response.status==200){
            Actions.refresh({showProgress:false})
            alert('registered')
          } else {
            Actions.refresh({showProgress:false})
            alert(response.data)
          }
        })
       .catch(function (error) {
        Actions.refresh({showProgress:false})
          const errors = error.response.data
          if(errors.email) {
            console.log("email : " +errors.email)
            alert("email : " +errors.email)
          }
          else if(errors.password) {
            console.log("password : " +errors.password)
            alert("password : " +errors.password)
          }   
        })        
    }
   
  }
  render() {
    return (
      <View >
        <TouchableOpacity onPress={this.onRegisterPressed.bind(this)} style={styles.buttonRegister}>
          <Text style={styles.buttonText}>
            Signup
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}



export default Signup
