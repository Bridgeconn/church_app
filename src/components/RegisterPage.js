import React, {Component} from 'react'
import axios from 'axios';
import {
  registerPageStyleheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  Text,
  Alert,
  View,
  Keyboard,
  StyleSheet
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import Spinner from 'react-native-loading-spinner-overlay';
import Login from "./LoginPage"
import Signup from "./SignupPage"

import {newSignupOrRegister as newSignupOrRegister} from '../style/style2.js'

const registerPageStyle = StyleSheet.create(newSignupOrRegister)

var GuestLogin = React.createClass({

  render: function() {
        if (this.props.visible) {
            return (
                <Text key="guestLogin" style={registerPageStyle.tryGuestText} onPress={this.onGuestLogin }>
                  Explore as Guest
                </Text>
            );
        } else {
            return null;
        }
  },
  
  onGuestLogin: function() {
    // AsyncStorage.setItem("guest", '1');
    // Actions.home2()  
    alert("This feature is in progress");
  }
});

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      showProgress:false,
      guestVisible:true
    }

  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (event) => {
    console.log("keyboard will show");
    this.setState({guestVisible:false});
  };

  _keyboardDidHide = (event) => {
    console.log("keyboard will hide");
    this.setState({guestVisible:true});
  }
  
  componentWillReceiveProps(props) {
      console.log("componentWillReceivePropscallback : userPage=" + props.showProgress)
      this.setState({showProgress:props.showProgress})
    }

  onOpenSignupPage() {
    Actions.newsignup();
  }

  render() {
    return (
      <View style={registerPageStyle.userContainer}>
      <Spinner visible={this.state.showProgress} size={"large"} color={"#3F51B5"} style={registerPageStyle.spinnerCustom}/>
        <Text style={registerPageStyle.heading}>
          Church App
        </Text>
        <TextInput
          onChangeText={ (text)=> this.setState({email: text}) }
          style={registerPageStyle.input} placeholder="Email">
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({password: text}) }
          style={registerPageStyle.input}
          placeholder="Password"
          secureTextEntry={true}>
        </TextInput>
        <Login 
        email={this.state.email}
        password={this.state.password}
        />

        <Text style={registerPageStyle.noAccountText} onPress={this.onOpenSignupPage.bind(this) }>
            No account yet? Create one
        </Text>
        
        <GuestLogin visible={this.state.guestVisible}/>
        
      </View>
    );
  
  }
}


export default Register
