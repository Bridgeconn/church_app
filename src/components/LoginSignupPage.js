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
class Login extends Component {
  constructor(){
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      token: null,
      showProgress: false,
    }
  }
  goToSignup(){
    Actions.signup()
  }
  async saveItem(item, selectedValue) {
    try {
      AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error);
    }
  }
  onLoginPressed() {
  console.log('hi')
    let data = new FormData();
    data.append("email", this.state.email);
    data.append("password", this.state.password);
    const config = { headers: { 'Content-Type': ' application/x-www-form-urlencoded'} };
      axios.post('https://churchappapi.herokuapp.com/api/v1/users/login', data, config)
        .then((response) => { 
          if (response.data.auth_token) {
            var token = response.data.auth_token;
            this.saveItem('token', token)
            console.log(token)
          }
          if(response.data.success == true){
            console.log('check toekn'+response.data.auth_token)
              console.log('enjoy')
              alert('login successfully')
              Actions.home()
          }
        })
        .catch(function (error) {
          var errors = error.response.data
          console.log("something went wrong")
          alert('something went wrong')    
        })    
  }
  onRegisterPressed() {
    let data = new FormData();
    data.append("user[email]", this.state.email);
    data.append("user[password]", this.state.password);
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
   onGuestLogin() {
      AsyncStorage.setItem("guest", '1');
      Actions.home()
    }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Native
        </Text>
        <TextInput
          onChangeText={ (text)=> this.setState({email: text}) }
          style={styles.input} placeholder="Email">
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({password: text}) }
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}>
        </TextInput>
        <TouchableOpacity onPress={this.onLoginPressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onRegisterPressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Signup
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onGuestLogin.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Guest Login
          </Text>
        </TouchableOpacity>
        <ActivityIndicator animating={this.state.showProgress} size="large" style={styles.loader} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 80
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
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
  },
  heading: {
    fontSize: 30,
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  success: {
    color: 'green',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});

export default Login
