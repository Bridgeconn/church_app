import React, {Component} from 'react'
import axios from 'axios';
import {
  StyleSheet,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  ActivityIndicator,
  Text,
  View
} from 'react-native';
import {Actions} from 'react-native-router-flux'


class Register extends Component {
  constructor(){
    super();

    this.state = {
      email: "",
      password: "",
      errors: [],
      showProgress: false,
      token: null
    }
  }
  

async saveItem(item, selectedValue) {
  try {
    await AsyncStorage.setItem(item, selectedValue);
    alert('success')
  } catch (error) {
    console.error('AsyncStorage error: ' + error.message);
  }
}
onRegisterPressed() {
  this.setState({showProgress: true})
  console.log('hi')
    console.log('email')
    let data = new FormData();
    data.append("user[email]", this.state.email);
    data.append("user[password]", this.state.password);
    
    console.log(data)
   
    const config = { headers: { 'Content-Type': ' application/x-www-form-urlencoded', 'Accept': 'application/json' } };
      axios.post('https://churchappapi.herokuapp.com/api/v1/users', data, config)
        .then((response) => {
          if (response.data.auth_token) {
            var token = response.data.auth_token;
            this.saveItem('token',token)
            this.setState({ token: token });
            console.log(this.state.token);
            
          }
          else {
            alert('not found token')
          }
          if(response.status==201){
            Actions.home();
          }
          else{
            alert('something went wrong')
          }
        })
        .catch(errors => console.log(errors))        
}
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Join us now!
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
        
        <TouchableHighlight onPress={this.onRegisterPressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Register
          </Text>
        </TouchableHighlight>

        <Errors errors={this.state.errors}/>

        <ActivityIndicator animating={this.state.showProgress} size="large" style={styles.loader} />
      </View>
    );
  }
}

const Errors = (props) => {
  return (
    <View>
      {props.errors.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
    </View>
  );
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
  loader: {
    marginTop: 20
  }
});

export default Register

