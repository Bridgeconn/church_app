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
class Signup extends Component {
  constructor(props){
    super(props);

    this.state = {
      error: "",
      showProgress: false,
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
       const config = { headers: { 'Content-Type': ' application/x-www-form-urlencoded'} };
      axios.post('https://churchappapi.herokuapp.com/api/v1/users', data, config)
        .then((response) => {
          if(response.status==201){
            console.log(response.status)
            alert('registered')
          }
        })
       .catch(function (error) {
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
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onRegisterPressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Signup
          </Text>
        </TouchableOpacity>
      </View>
    );
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

export default Signup
