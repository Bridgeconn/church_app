
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Router from './src/components/Router'
import SearchBar from './src/components/Searchbar'
export default class ChurchApplication extends Component {
  render() {
    return (
      <SearchBar/>
    );
  }
}

AppRegistry.registerComponent('ChurchApplication', () => ChurchApplication);

