
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
 import Router from './src/components/Router'
 // import DatabaseEx from './src/components/DatabaseEx'
 import NotificationEx from './src/components/NotificationEx'
export default class ChurchApplication extends Component {
  render() {
    return (
      <Router/>
    );
  }
}

AppRegistry.registerComponent('ChurchApplication', () => ChurchApplication);

