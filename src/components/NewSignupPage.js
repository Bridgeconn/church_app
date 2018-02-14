import React, {Component} from 'react'
import axios from 'axios';
import {
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
import {newSignupOrRegister as newSignupOrRegister} from '../style/styles.js'

const newSignupStyle = StyleSheet.create(newSignupOrRegister)

var GuestLogin = React.createClass({

  render: function() {
        if (this.props.visible) {
            return (
                <Text key="guestLogin" style={newSignupStyle.tryGuestText} onPress={this.onGuestLogin }>
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

class NewSignup extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
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

  onOpenLoginPage() {
    Actions.register();
  }

  render() {
    return (
      <View style={newSignupStyle.userContainer}>
      <Spinner visible={this.state.showProgress} size={"large"} color={"#3F51B5"} style={newSignupStyle.spinnerCustom}/>
        <Text style={newSignupStyle.heading}>
          Church App
        </Text>
        <TextInput
          onChangeText={ (text)=> this.setState({name: text}) }
          style={newSignupStyle.input} placeholder="Name">
        </TextInput>

        <TextInput
          onChangeText={ (text)=> this.setState({email: text}) }
          style={newSignupStyle.input} placeholder="Email">
        </TextInput>

        <TextInput
          onChangeText={ (text)=> this.setState({password: text}) }
          style={newSignupStyle.input}
          placeholder="Password"
          secureTextEntry={true}>
        </TextInput>

        <Signup 
          name={this.state.name}
          email={this.state.email}
          password={this.state.password}
        />
        
        <Text style={newSignupStyle.noAccountText} onPress={this.onOpenLoginPage.bind(this) }>
            Already have an account? Login here
        </Text>

        <GuestLogin visible={this.state.guestVisible}/>
        
      </View>
    );
  
  }
}


export default NewSignup