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
import Login from "./LoginPage"
import Signup from "./SignupPage"
import GuestLogin from "./GuestLoginPage"

class User extends Component {
  constructor(props){
    super(props);
    console.log("props user"+this.props.hasToken)
    this.state = {
      email: "",
      password: "",
      showProgress:false
    }

  }
  
  render() {
    console.log("Component Parent"+Login)
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
        <Signup 
        email={this.state.email}
        password={this.state.password}
        />
        <Login 
        email={this.state.email}
        password={this.state.password}
        />
        <GuestLogin/>
       
      </View>
    );
  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop:50,

  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  }
});

export default User
