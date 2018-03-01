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
import Config from 'react-native-config'
import Utilities from './Utilities'
import {SigninStyle} from '../style/styles.js'

class Signup extends Component {
  constructor(props){
    super(props);

    this.state = {
      error: "",
      showProgress: true,

    }
  }
  /**
  *@function onRegisterPressed
  *validate email and password 
  *post email , password , name to server to regiter user
  * 
  */
  onRegisterPressed() {
    let data = new FormData();
    data.append("user[email]", this.props.email);
    data.append("user[password]", this.props.password);
    data.append("user[first_name]", this.props.name);
    //validation done in Utilities file
    var validationResult = Utilities.validateEmailAndPassword(this.props.email,this.props.password);
    if (validationResult == 0) {
       Actions.refresh({showProgress:true})
       const config = { headers: {'Church-App-Id': Config.CHURCH_APP_ID} }
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
       .catch((error)=> {
        console.log("in catch error"+error)
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
    } else {
      alert(Utilities.formValidationAlerts(validationResult));
    }
  }
  render() {
    return (
      <View >
        <TouchableOpacity onPress={this.onRegisterPressed.bind(this)} style={SigninStyle.buttonRegister}>
          <Text style={SigninStyle.buttonText}>
            Signup
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}



export default Signup
