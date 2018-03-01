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
import SQLite from 'react-native-sqlite-storage'

export default class Settings extends Component {
  constructor(props){
    super(props)
    this.state ={
     showProgress: false
    }
  }
  /**
  @funtion userLogout
  *remove all asyncstorage (local storage) key 
  *remove table Verse from db used to save notification data
  *redirect to register page 
  */
  async userLogout(){
    try {
    Actions.refresh({showProgress:true})
    await AsyncStorage.removeItem(AsyncStorageConstants.UserToken);
    await  AsyncStorage.removeItem(AsyncStorageConstants.UserName)
    await  AsyncStorage.removeItem(AsyncStorageConstants.UserContactNumber)
    await  AsyncStorage.removeItem(AsyncStorageConstants.UserCheckBoxEmail)
    await  AsyncStorage.removeItem(AsyncStorageConstants.UserCheckBoxContact)
    await  AsyncStorage.removeItem(AsyncStorageConstants.UserEmail)
    SQLite.openDatabase({name: 'church_app.db', location: 'default'}, 
        (db) =>  {
          console.log("sqlite open openDatabase")

        db.transaction((tx)=>{
        tx.executeSql('DROP TABLE IF EXISTS Verse ')
        })
        },
        (err) => console.log("SQL Error: " + err));
   
    } catch (error) {
    console.log('AsyncStorage error: ' + error.message);
    }
    Actions.refresh({showProgress:false})
    Actions.register()
    }
    /**
    @function _shareMessage
    *share data 
    *@param {string} message 
    *
    */
  _shareMessage() {
    if(Platform.OS=="android"){
      let packageName = 'com.churchapplication';
      let messageText = "Hey checkout this awesome Church App  https://play.google.com/store/apps/details?id="+packageName;
      console.log("share package name")
      Share.share({
        message: messageText
      }).then(this._showResult(messageText));
    }
  }
/**
    @function _showResult
    *share data result
    *
    *@param {string} result
    *result to show
    */
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

