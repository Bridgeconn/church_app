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
  constructor(props){
    super(props);
    this.state = {
      error: "",
      token:false,
      showProgress: false,

    }
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
    data.append("email", this.props.email);
    data.append("password", this.props.password);
    const config = { headers: { 'Content-Type': ' application/x-www-form-urlencoded'} };
      axios.post('https://churchappapi.herokuapp.com/api/v1/users/login', data, config)
        .then((response) => { 
          if (response.data.auth_token) {
            var token = response.data.auth_token;
            this.saveItem('token', token)

          }
          if(response.data.success == true){
            	console.log('check token'+response.data.auth_token)
              	console.log('enjoy')
             	alert('login successfully')	
             	AsyncStorage.getItem('token').then((auth_token) => {
           		this.setState({token: auth_token!== null})
           		console.log("token to home"+this.state.token)
              // Actions.pop();
              Actions.home({token:this.state.token})

           		})	
	        }
        })
        .catch(function (error) {
        	console.log(error)
          	console.log("something went wrong")
         	alert('something went wrong')    
        }) 
  }
 	componentWillUpdate(prevProps, prevState) {
      console.log("prevProps"+prevProps,"prevState "+prevState)
      console.log("prev Props"+this.props.hasToken,"prev State "+this.state.token)
      console.log('Component DID UPDATE!')
   }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onLoginPressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Login
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
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  }
});

export default Login
