import React, {Component} from 'react'
import {Text,View,Image,TouchableOpacity,ScrollView} from 'react-native';
import {List, ListItem}  from 'native-base'
import styles from '../style/styles.js'

export default class EventsDetail extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.songTitleText}>{this.props.songTitle}</Text> 
           <Text style={styles.songLyricsText}>{this.props.songLyrics}</Text>      
        </ScrollView>
      </View>
      )
    }
  }


