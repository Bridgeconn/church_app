import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {List, ListItem} from 'native-base'
import SplashScreen from 'react-native-splash-screen'
let SQLite = require('react-native-sqlite-storage')

export default class DatabaseExample extends Component {

  constructor(props) {
    super(props)

    this.state = {
      record: null,
      rows:[]
    }

    let db = SQLite.openDatabase({name: 'test.db', createFromLocation : "~example.db"}, this.openCB, this.errorCB, this.successCB);
    SplashScreen.hide()
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM Example', [], (tx, results) => {
           let rows = results.rows.raw();
            rows.map(row => console.log(` Id: ${row.id}, name: ${row.name}`));
            this.setState({rows});
        });

      })
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
      let rows = this.state.rows;
    return (
      <View style={styles.container}>
        <Text style={{fontSize:16,textAlign:'center'}}>
          Example with sqlite3 database
        </Text>
        <View>
        {
        rows.map(row => 
        <List>
        <ListItem style={{borderBottomWidth:0}}>
          <Text key={row.id} style={{fontSize:16}}>id {row.id}</Text>
        </ListItem>
        <ListItem style={{borderBottomWidth:0}}>
        <Text key={row.id} style={{fontSize:16}}>{row.name}</Text>
      </ListItem>
      </List>
       )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  
});
