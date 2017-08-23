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
import ProfilePage from './src/components/ProfilePage'

export default class ChurchApp extends Component {
  render() {
    return (
      <ProfilePage/>
    );
  }
}


AppRegistry.registerComponent('ChurchApp', () => ChurchApp);
