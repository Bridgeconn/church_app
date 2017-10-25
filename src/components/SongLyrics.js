import React, {Component} from 'react'
import {Text,View,Image,TouchableOpacity,TouchableHighlight, Animated,Dimensions} from 'react-native';
import {List, ListItem}  from 'native-base'
import styles from '../style/styles.js'

export default class EventsDetail extends Component{
  constructor(props){
    super(props);
    console.log("title_name "+this.props.song_name)
    this.state = {
        title:this.props.song_name,
    }
   console.log('name'+this.props.name)
  }
  render(){

    return (
      <View style={styles.container}>
      <Text style={styles.textSong}>{this.props.title}</Text>
       <Text style={styles.textSong}>{this.props.text}</Text>       
      </View>
      )
    }
  }


