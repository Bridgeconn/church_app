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
      <View style={styles.container}>
      <Spinner visible={this.state.showProgress} size={"large"} color={"#3F51B5"} style={{justifyContent:"center",alignItems:"center"}} />
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
