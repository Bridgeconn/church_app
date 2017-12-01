import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
import { Container, Header, Title, Content, H3,Item,Input, ListItem, Button, Icon, Footer, FooterTab, Left, Right, Body } from 'native-base';
let SQLite = require('react-native-sqlite-storage')
let db = SQLite.openDatabase({name: 'test1.db', createFromLocation : "~example.db"}, this.openCB, this.errorCB, this.successCB);
export default class searchBar extends Component {

  constructor(props) {
    super(props);
     const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
        dataSource: ds.cloneWithRows([]),
        isLoading: false,
    }
   
    SplashScreen.hide()
    // db.transaction((tx) => {
    //   tx.executeSql('SELECT * FROM Example', [], (tx, results) => {
    //        let rows = results.rows.raw();
    //         rows.map(row => console.log(` Id: ${row.id}, name: ${row.name}`));
    //         this.setState({rows});
    //     });

    //   })
  }
  searchMatchingWords(keyWord) {
     if(keyWord.length > 0) {
      db.transaction((tx) => {
      tx.executeSql('SELECT * FROM SearchItem ', [], (tx, results) => {
           let rows = results.rows.raw();
            rows.map(row => console.log(` Id: ${row.id}, name: ${row.name}`));
            this.setState({rows});
        })
      // db.executeSql('select * from Example', [], function(results) {
      //     var len = results.rows.length;
      //       for (let i = 0; i < len; i++) {
      //         temp.push(results.rows.item(i));
      //         console.temp("temp"+temp)
      //       }
      //       this.setState({
      //           dataSource: this.state.dataSource.cloneWithRows(temp),
      //       });
      //   });
      })
     }
  }
  errorCB(err) {
    console.log("SQL Error: " + err);
  }

  successCB() {
    console.log("SQL executed fine");
  }

  openCB() {
    console.log("Database OPENED");
  }

  render() {
    return (
      <Container style={{flex:1}}>

        <Header>
          <Left>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Search Words</Title>
          </Body>
          <Right />
        </Header>
        <Header searchBar rounded>
          <Item>
            <Icon active name="search" />
            <Input placeholder="Search" onChangeText={(text) => this.searchMatchingWords(text)}/>
            <Icon active name="bookmark" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>

        <Content>
            <View style={{flex: 1, paddingTop: 22}}>
              <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={(rowData) =>
                  <ListItem>
                    <Text>{rowData.name}</Text>
                    <Right><Icon name="arrow-forward" /></Right>
                  </ListItem>
                }/>
            </View>
        </Content>

      </Container>
    );
  }
}

