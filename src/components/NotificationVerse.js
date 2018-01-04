import React, {Component} from 'react'
import axios from 'axios';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Text
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import Spinner from 'react-native-loading-spinner-overlay';
import {Card,CardItem,Body} from 'native-base';
import styles from '../style/styles.js'

export default class NotificationVerse extends Component {
  constructor(props){
    super(props)
    console.log("props body"+this.props.notif.title)
    this.state ={
     data:this.props.notif
    }
  }
 
  render() {
    return (
      <View style={styles.container}>
      <ScrollView> 
      <Card>   
            <Text style={{margin:5,fontWeight:"bold",fontSize:20}}>Notification</Text>
            <Text style={{margin:5,fontSize:18}}>{this.state.data.title}</Text>
            <Text style={{margin:5,fontSize:18}}>{this.state.data.body}</Text>
      </Card>
      </ScrollView>
      </View>
    );
  
  }
}
