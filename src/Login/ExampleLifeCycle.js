
import React, { Component } from 'react'
import {View,Text,TouchableOpacity,Platform} from 'react-native'
import {Scene,Router} from 'react-native-router-flux'
import NavBarAndroid from './Content'
import HomeScreen from './HomeScreen'

export default class App extends Component {
  render() {
    return <Router>
      <Scene key="root" navBar={Platform.Andoid=='ios' ? NavBar : NavBarAndroid}>
        <Scene key="home" component={HomeScreen}/>
      </Scene>
    </Router>     
  }
}