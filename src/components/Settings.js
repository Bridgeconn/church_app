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

var Config = require('react-native-android-config');

class Settings extends Component {
  constructor(props){
    super(props)
    this.state ={
      showProgress:false,
    }
  }
  async userLogout(){
    Actions.refresh({showProgress:true})
    try {
    Actions.refresh({showProgress:false})
    await   AsyncStorage.removeItem('token');
    await   AsyncStorage.removeItem('guest');
    await   AsyncStorage.removeItem('uri')
    await   AsyncStorage.removeItem('user')
    await   AsyncStorage.removeItem('contact')
    console.log('remove loginkey')
    Actions.user("user",{hasToken:false, guestKey:false})
    alert('Logout Success!');

    } catch (error) {
    Actions.refresh({showProgress:false})
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
       
        <TouchableOpacity  onPress={this.userLogout}>
           <Card>
            <Text style={{margin:20}}>Logout</Text>
            </Card>
        </TouchableOpacity>
        <TouchableOpacity >
          <Card>
            <Text style={{margin:20}}>About</Text>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity  onPress={this._shareMessage.bind(this)}>
        <Card>
            <Text style={{margin:20}}>Share</Text>
        </Card>
    </TouchableOpacity>
      </ScrollView>
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

export default Settings
