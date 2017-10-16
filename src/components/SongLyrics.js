import React, {Component} from 'react'
import {Text,View,Image,TouchableOpacity,TouchableHighlight, Animated,Dimensions} from 'react-native';
import {List, ListItem}  from 'native-base'
import styles from '../style/styles.js'

export default class EventsDetail extends Component{
  constructor(props){
    super(props);
   console.log('name'+this.props.name)
  }
  render(){

    return (
      <View style={styles.container}>
      <Text style={styles.textSong}>{this.props.song_name}</Text>
       <Text style={styles.textSong}>{this.props.text}</Text>       
      </View>
      )
    }
  }


