import React, {Component} from 'react'
import {StyleSheet,Text,View,Image,TouchableOpacity,TouchableHighlight, Animated,Dimensions} from 'react-native';
import {List, ListItem}  from 'native-base'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
export default class EventsDetail extends Component{
  constructor(props){
    super(props)
    console.log(this.props.data)

  }
  render(){
    const data = this.props.data 
    console.log("data "+data)
    return (
      <View style={styles.container}>
      <Image source={{uri:this.props.event_poster}} style={styles.image}/>
       <Text>{this.props.event_name}</Text>
       <Text>{this.props.event_time_start}</Text>
       <Text>{this.props.event_time_end}</Text>
      </View>
      )
    }
  }

  var styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent:"flex-start",
    alignItems:"flex-start",
  },
  image:{
    width:width,
    height:height*0.60,
  }
})
  
