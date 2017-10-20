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
import Spinner from 'react-native-loading-spinner-overlay';
import Login from "./LoginPage"
import Signup from "./SignupPage"
import GuestLogin from "./GuestLoginPage"
import styles from '../style/styles.js'
class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      showProgress:false
    }

  }
  
  componentWillReceiveProps(props) {
      console.log("componentWillReceivePropscallback : userPage=" + props.showProgress)
      this.setState({showProgress:props.showProgress})
    }

  render() {
    return (
      <View style={styles.userContainer}>
      <Spinner visible={this.state.showProgress} size={"large"} color={"#3F51B5"} style={{justifyContent:"center",alignItems:"center"}} />
        <Text style={styles.heading}>
          Church App
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


export default User
