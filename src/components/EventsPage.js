import React, {Component} from 'react';
import {Text,View,Image,StyleSheet,ListView} from 'react-native';
import {Content, Card, CardItem, Body,List,ListItem} from 'native-base';
import  Events from './eventListDummy.json'
import Accordion from 'react-native-accordion'
import range from 'lodash'

export default class EventsPage extends Component {
  constructor() {
  super();
  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  this.state = {
    dataSource: ds.cloneWithRows(range(20)),
  }
}

renderHeader() {
    return (
      <View style={{
        paddingTop: 15,
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#a9a9a9',
        backgroundColor: '#f9f9f9',
      }}>
        <Text>Click to Expand</Text>
      </View>
    )
  }
  renderContent() {
    return (
      <View style={{
        backgroundColor: '#31363D'
      }}>
        <Text style={{
          paddingTop: 15,
          paddingRight: 15,
          paddingBottom: 15,
          paddingLeft: 15,
          color: '#fff',
        }}>
          This content is hidden in the accordion
        </Text>
      </View>
    )
  }

    render(){
    return(
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      </View>
      )
 }
 
  _renderRow(rowData) {
    return (
      <Accordion
        header={this.renderHeader()}
        content={this.renderContent()}
        duration={300}
        easing="easeOutCubic"
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})