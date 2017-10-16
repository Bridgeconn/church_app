
import React, { Component } from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import Content from './Content'

export default class Example extends React.Component {
  onClick = () => {
    this.child.method() 
   
  };
  render() {
    return (
      <View style={{flex:1, justifyContent:"center",alignItems:"center"}}>
        <Content onRef={ref => (this.child = ref)} />
        <TouchableOpacity onPress={this.onClick}><Text>Hello</Text></TouchableOpacity>
      </View>
    );
  }
}

