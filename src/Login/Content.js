
import React, { Component } from 'react'
import {View,Text} from 'react-native';

export default  class Content extends React.Component {
  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(null)
  }
  method() {
   console.log('do stuff')
   alert("hello")
  }
  render() {
    return <View style={{flex:1}}><Text>hello world</Text></View>
  }
}
