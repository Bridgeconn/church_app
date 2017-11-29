import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Router from './src/components/Router'
import DatabaseEx from './src/Login/DatabaseEx'

export default class ChurchApplication extends Component {
  render() {
    return (
     <DatabaseEx/>
    )
  }
}

AppRegistry.registerComponent('ChurchApplication', () => ChurchApplication);

