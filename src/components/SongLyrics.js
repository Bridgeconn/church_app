import React, {Component} from 'react'
import {StyleSheet,Text,View,Image,TouchableOpacity,TouchableHighlight, Animated,Dimensions} from 'react-native';
import {List, ListItem}  from 'native-base'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class EventsDetail extends Component{
  constructor(props){
    super(props);
   console.log('name'+this.props.name)
  }
  render(){

    return (
      <View style={styles.container}>
      <Text>{this.props.song_name}</Text>
       <Text>{this.props.text}</Text>       
      </View>
      )
    }
  }

  var styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent:"flex-start",
    alignItems:"flex-start",
  }
})
  
