import React, {Component} from 'react'
import {StyleSheet,Text,View,Image,TouchableOpacity,TouchableHighlight, Animated} from 'react-native';
import {List, ListItem}  from 'native-base'
export default class EventsDetail extends Component{
  render(){
    const data = this.props.data 
    console.log("sagjkg "+ JSON.stringify(data))

    return (
      <View>
      <Text>HELLO</Text>
      </View>
      )
    }
  }