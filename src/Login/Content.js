
import React, { Component } from 'react'
import {View,Text} from 'react-native';

export default class Content extends Component {

   componentWillMount() {
      console.log('Component WILL MOUNT!')
   }

   componentDidMount() {
      console.log('Component DID MOUNT!')
   }

   componentWillReceiveProps(newProps) {   
      console.log("newProps"+newProps) 
      console.log("will recieve props"+ this.props.myNumber)
      console.log('Component WILL RECIEVE PROPS!')
   }

   shouldComponentUpdate(newProps, newState) {
      console.log("shouldState "+newState ,"should Props "+newProps)
      console.log("should State "+this.state ,"should props "+ this.props.myNumber)
      console.log('Component SHOULD UPDATE!')
      return true;
   }

   componentWillUpdate(nextProps, nextState) {
      console.log("newState "+nextState ,"nextProps "+ nextProps)
      console.log("new State "+this.state ,"new rops "+ this.props.myNumber)
      console.log('Component WILL UPDATE!')
   }

   componentDidUpdate(prevProps, prevState) {
      console.log("prevProps"+prevProps,"prevState "+prevState)
      console.log("prev Props"+this.props.myNumber,"prev State "+this.state)
      console.log('Component DID UPDATE!')
   }

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