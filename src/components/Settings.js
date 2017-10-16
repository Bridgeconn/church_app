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


class Settings extends Component {
  constructor(props){
    super(props)
    this.state ={
      showProgress:false,
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
    
    console.log('remove loginkey')
    Actions.refresh({showProgress:false})
    Actions.user({hasToken:false, guestKey:false});    
    alert('Logout Success!');

    } catch (error) {
    Actions.refresh({showProgress:false})
    console.log('AsyncStorage error: ' + error.message);
    }
    }
  render() {
    return (
      <View style={styles.container}>
                <Spinner visible={this.state.showProgress} size={"large"} color={"#3F51B5"} style={{justifyContent:"center",alignItems:"center"}} />
        <TouchableOpacity onPress={this.userLogout}>
          <Text>logout</Text>
        </TouchableOpacity>
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
