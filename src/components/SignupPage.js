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
       const config = { headers: {'Church-App-Id': 'ChurchApp_33212'} };
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      axios.post('https://churchappapi.herokuapp.com/api/v1/users', data, config)
        .then((response) => {
          console.log(response)
          console.log("RESPONSE.STATUS == "+response.status)
          if(response.status==200){
            Actions.refresh({showProgress:false})
            console.log(response.status)
            alert('registered')
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
