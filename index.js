
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
 import Router from './src/components/Router'
 import DatabaseEx from './src/components/DatabaseEx'
 import Searchbar from './src/components/Searchbar'
export default class ChurchApplication extends Component {
  render() {
    return (
      <Searchbar/>
    );
  }
}

AppRegistry.registerComponent('ChurchApplication', () => ChurchApplication);

