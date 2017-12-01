import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Router from './src/components/Router'
import DatabaseEx from './src/Login/DatabaseEx'
import Searchbar from './src/Login/Searchbar'

export default class ChurchApplication extends Component {
  render() {
    return (
     <Searchbar/>
    )
  }
}

AppRegistry.registerComponent('ChurchApplication', () => ChurchApplication);

