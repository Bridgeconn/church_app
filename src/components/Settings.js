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
import styles from '../style/styles.js'

var Config = require('react-native-android-config');

export default class Settings extends Component {
  constructor(props){
    super(props)
    this.state ={
     showProgress: false
    }
  }
  async userLogout(){
    try {
    Actions.refresh({showProgress:true})
    await   AsyncStorage.removeItem('token');
    await   AsyncStorage.removeItem('guest');
    await   AsyncStorage.removeItem('uri')
    await   AsyncStorage.removeItem('user')
    await   AsyncStorage.removeItem('contact')
    Actions.refresh({showProgress:false})
    Actions.reset("register", {hasToken:false, guestKey:false})
    // alert('Logout Success!');

    } catch (error) {
    console.log('AsyncStorage error: ' + error.message);
    }
    }

    _shareMessage(message) {
      if(Platform.OS=="android"){
      let packageName = Config.API_URL;
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
      <View style={styles.container}>
      <ScrollView>
        <Spinner visible={this.state.showProgress} size={"large"} color={"#3F51B5"} style={{justifyContent:"center",alignItems:"center"}} />
         <TouchableOpacity  onPress={this._shareMessage.bind(this)}>
        <Card>
            <Text style={{margin:20}}>Share</Text>
        </Card>
        </TouchableOpacity>
        <TouchableOpacity >
          <Card>
            <Text style={{margin:20}}>About</Text>
          </Card>
        </TouchableOpacity>
       
        <TouchableOpacity  onPress={this.userLogout}>
             <Card>
            <Text style={{margin:20}}>Logout</Text>
            </Card>
        </TouchableOpacity>
      </ScrollView>
      </View>
    );
  
  }
}

