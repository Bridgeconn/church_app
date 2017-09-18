
import React, { Component } from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import Content from './Content'

export class ExampleLifeCycle extends Component {

   constructor(props) {
      super(props)
		
      this.state = {
         data: 0
      }

   }

   setNewNumber = () =>{
      this.setState({data: this.state.data + 1})
   }

   render() {
      return (
         <View>
            <TouchableOpacity onPress = {this.setNewNumber}><Text>INCREMENT</Text></TouchableOpacity>
            <Content/>
         </View>
      );
   }
}