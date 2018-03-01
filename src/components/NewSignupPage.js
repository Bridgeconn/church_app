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
import { 
  CheckBox
} from 'native-base';
import {Actions} from 'react-native-router-flux'
import Spinner from 'react-native-loading-spinner-overlay';
import LoginButton from "./LoginPage"
import Signup from "./SignupPage"
import {SigninStyle} from '../style/styles.js'

var GuestLogin = React.createClass({
  render: function() {
        if (this.props.visible) {
            return (
                <Text key="guestLogin" style={SigninStyle.tryGuestText} onPress={this.onGuestLogin }>
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
      guestVisible:true,
      isSecureTextEntry:true
    }

  }
 /**
  *hid/show keyboard by adding event listner
  */
  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }
 /**
  *removing event listner
  */
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
    this.refPassword.blur();
  }

  componentWillReceiveProps(props) {
      console.log("componentWillReceivePropscallback : userPage=" + props.showProgress)
      this.setState({showProgress:props.showProgress})
  }

  /**
  redirect to signup Page
  */
  onOpenLoginPage() {
    Actions.register();
  }

  /**
  *@function onSelectionToggle
  *hide / show password  
  */
  onSelectionToggle(){
  // console.log("event "+event.nativeEvent.selection+ " , "+this.state.selectionValue)
    this.setState({isSecureTextEntry:!this.state.isSecureTextEntry})
    this.refPassword.blur();
  // console.log("value from textInputToggle" +this.textInputToggle)
}
  render() {
    return (
      <View style={SigninStyle.userContainer}>
      <Spinner visible={this.state.showProgress} size={"large"} color={"#3F51B5"} style={SigninStyle.spinnerCustom}/>
        <Text style={SigninStyle.heading}>
          Church App
        </Text>
        <TextInput
          onChangeText={ (text)=> this.setState({name: text}) }
          style={SigninStyle.input} placeholder="Name">
        </TextInput>

        <TextInput
          onChangeText={ (text)=> this.setState({email: text}) }
          style={SigninStyle.input} placeholder="Email">
        </TextInput>

        <TextInput
          onChangeText={ (text)=> this.setState({password: text}) }
          style={SigninStyle.input}
          placeholder="Password"
          ref = {ref => (this.refPassword) = ref}
          secureTextEntry={true}
          onSubmitEditing={()=>this._keyboardDidHide}
          secureTextEntry={this.state.isSecureTextEntry}
          />
          <View style={{flexDirection:'row',marginTop:8}}> 
            <CheckBox onPress={this.onSelectionToggle.bind(this)} checked={!this.state.isSecureTextEntry} />
            <Text style={{marginLeft:16}}>Show Password</Text>
          </View>
        <Signup 
          name={this.state.name}
          email={this.state.email}
          password={this.state.password}
        />
        
        <Text style={SigninStyle.noAccountText} onPress={this.onOpenLoginPage.bind(this) }>
            Already have an account? Login here
        </Text>

        <GuestLogin visible={this.state.guestVisible}/>
        
      </View>
    );
  
  }
}


export default NewSignup