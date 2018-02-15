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
  ScrollView,
  Share,
  Platform
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import Spinner from 'react-native-loading-spinner-overlay';
import {Card,CardItem,Body} from 'native-base';
import {settingStyle} from '../style/styles'
import * as AsyncStorageConstants from './AsyncStorageConstants';

export default class Settings extends Component {
  constructor(props){
    super(props)
    this.state ={
     showProgress: false
    }
  }

   userLogout(){
    try {
    Actions.refresh({showProgress:true})
      AsyncStorage.removeItem(AsyncStorageConstants.UserToken);
      AsyncStorage.removeItem('guest');
      AsyncStorage.removeItem(AsyncStorageConstants.UserName)
      AsyncStorage.removeItem(AsyncStorageConstants.UserContactNumber)
      AsyncStorage.removeItem(AsyncStorageConstants.UserCheckBoxEmail)
      AsyncStorage.removeItem(AsyncStorageConstants.UserCheckBoxContact)
      AsyncStorage.removeItem(AsyncStorageConstants.UserEmail)
    Actions.refresh({showProgress:false})
    Actions.reset("register", {tokenValue:null, guestKey:false})
    // alert('Logout Success!');

    } catch (error) {
    console.log('AsyncStorage error: ' + error.message);
    }
    }

    _shareMessage(message) {
      if(Platform.OS=="android"){
      let packageName = 'com.churchapplication';
      let messageText = "Hey checkout this awesome Church App  https://play.google.com/store/apps/details?id="+packageName;
      console.log("share package name")
      Share.share({
        message: messageText
      }).then(this._showResult);
    }
  }

_showResult(result) {
    this.setState({result});
  }

  render() {
    return (
      <View style={settingStyle.container}>
      <ScrollView>
        <Spinner visible={this.state.showProgress} size={"large"} color={"#3F51B5"} style={settingStyle.spinnerCustom} />
         <TouchableOpacity  onPress={this._shareMessage.bind(this)}>
        <Card>
            <Text style={settingStyle.textStyle}>Share</Text>
        </Card>
        </TouchableOpacity>
        <TouchableOpacity >
          <Card>
            <Text style={settingStyle.textStyle}>About</Text>
          </Card>
        </TouchableOpacity>
       
        <TouchableOpacity  onPress={this.userLogout}>
             <Card>
            <Text style={settingStyle.textStyle}>Logout</Text>
            </Card>
        </TouchableOpacity>
      </ScrollView>
      </View>
    );
  
  }
}

