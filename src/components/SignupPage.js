import React, {Component} from 'react'
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
    }
  }
  

async saveItem(item, selectedValue) {
  try {
    await AsyncStorage.setItem(item, selectedValue);
  } catch (error) {
    console.error('AsyncStorage error: ' + error.message);
  }
}
onRegisterPressed() {
  this.setState({showProgress: true})
  console.log('hi')
 if (!this.state.username || !this.state.password) return;
    var user = {
      email: this.state.email,
      password: this.state.password,
    }
    console.log(user.email)
    var formBody = [];
    for (var property in user) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(user[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    console.log(formBody)
    if (!this.state.username || !this.state.password) return;
      // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
    fetch('https://churchappapi.herokuapp.com/api/v1/users', {
      method: 'POST',
      headers: { 'Accept': 'application/x-www-form-urlencodedn', 'Content-Type': 'application/x-www-form-urlencodedn' },
      body: formBody
    })
    .then((response) => response.json())
    .then((responseData) => {
    this.saveItem('id_token', responseData.id_token),
    alert(JSON.stringify(responseData))
    console.log(responseData.id_token)
    Alert.alert('Login Success!', 'Click the button to get a Chuck Norris quote!'),
    Actions.HomePage();
    })
  .done();
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

