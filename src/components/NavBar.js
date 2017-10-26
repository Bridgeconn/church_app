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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from '../style/styles.js'
class NavBar extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity>
          <Icon name="settings" size={26} color="white" style={{paddingRight:20}}/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="person" size={26} color="white" style={{paddingRight:20}}/>
        </TouchableOpacity>
      </View>
    )
  }
}


export default NavBar
