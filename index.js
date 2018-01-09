
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
 import Router from './src/components/Router'
 import App from './src/Login/App'
export default class ChurchApplication extends Component {
  render() {
    return (
      <Router/>
    );
  }
}

AppRegistry.registerComponent('ChurchApplication', () => ChurchApplication);

