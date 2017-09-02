/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Router from './src/components/Router'
import Index from './src/Login/Index'


export default class ChurchApp extends Component {
  render() {
    return (
      <Router/>
    );
  }
}


AppRegistry.registerComponent('ChurchApp', () => ChurchApp);
