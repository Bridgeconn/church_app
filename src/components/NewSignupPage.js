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
  View,
  Keyboard,
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import Spinner from 'react-native-loading-spinner-overlay';
import Login from "./LoginPage"
import Signup from "./SignupPage"
import styles from '../style/styles.js'

var GuestLogin = React.createClass({

  render: function() {
        if (this.props.visible) {
            return (
                <Text key="guestLogin" style={styles.tryGuestText} onPress={this.onGuestLogin }>
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
      <View style={styles.userContainer}>
      <Spinner visible={this.state.showProgress} size={"large"} color={"#3F51B5"} style={styles.spinnerCustom}/>
        <Text style={styles.heading}>
          Church App
        </Text>
        <TextInput
          onChangeText={ (text)=> this.setState({name: text}) }
          style={styles.input} placeholder="Name">
        </TextInput>

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
          name={this.state.name}
          email={this.state.email}
          password={this.state.password}
        />
        
        <Text style={styles.noAccountText} onPress={this.onOpenLoginPage.bind(this) }>
            Already have an account? Login here
        </Text>

        <GuestLogin visible={this.state.guestVisible}/>
        
      </View>
    );
  
  }
}


export default NewSignup