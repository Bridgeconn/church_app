
import React, { Component } from 'react'
import {View,Text} from 'react-native';

export class Content extends Component {

   componentWillMount() {
      console.log('Component WILL MOUNT!')
   }

   componentDidMount() {
      console.log('Component DID MOUNT!')
   }

   // componentWillReceiveProps(newProps) {    
   //    console.log('Component WILL RECIEVE PROPS!')
   // }

   // shouldComponentUpdate(newProps, newState) {
   //    return true;
   // }

   // componentWillUpdate(nextProps, nextState) {
   //    console.log('Component WILL UPDATE!')
   // }

   // componentDidUpdate(prevProps, prevState) {
   //    console.log('Component DID UPDATE!')
   // }

   componentWillUnmount() {
      console.log('Component WILL UNMOUNT!')
   }
	
   render() {
      return (
         <View>
            <Text>{this.props.myNumber}</Text>
         </View>
      )
   }
}