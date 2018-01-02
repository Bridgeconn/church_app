// import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen'
// import { Container, Header, Title, Content, H3,Item,Input, List, ListItem, Button, Icon, Footer, FooterTab, Left, Right, Body } from 'native-base';
// let SQLite = require('react-native-sqlite-storage')
// let db = SQLite.openDatabase({name: 'test1.db', createFromLocation : "~example.db"}, this.openCB, this.errorCB, this.successCB);
// export default class searchBar extends Component {

//   constructor(props) {
//     super(props);
//      const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
//     this.state = {
//         record: null,
//         rows:[],
//         search:''
//     }
//     SplashScreen.hide()
//     let db = SQLite.openDatabase({name: 'test1.db', createFromLocation : "~example.db"}, this.openCB, this.errorCB, this.successCB);
//      db.transaction((tx) => {
//       tx.executeSql('SELECT * FROM SearchItem', [], (tx, results) => {
//            let rows = results.rows.raw();
//             rows.map(row => console.log(` Id: ${row.id}, name: ${row.name}`));
//             this.setState({rows});
//         })
      
//       })
     
    
//   }
//   // searchItem(){
//   //   // let rows = this.state.rows;
//   //   let FilteredName = this.state.rows.filter(
//   //       (rows) =>{
//   //         return rows.name.indexOf(this.state.search) !==-1;
//   //       }
//   //     )
//   //  }
//   errorCB(err) {
//     console.log("SQL Error: " + err);
//   }

//   successCB() {
//     console.log("SQL executed fine");
//   }

//   openCB() {
//     console.log("Database OPENED");
//   }

//   render() {
//     let rows = this.state.rows;
//     let FilteredName = this.state.rows.filter(
//         (rows) =>{
          
//           return rows.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1;
//         }
//       )
//     return (
//       <View style={{flex: 1}}>
//        <TextInput
//           onChangeText={ (text)=> this.setState({search: text}) }
//          placeholder="search"
//           >
//          </TextInput>
//         <View>
//           {
//             FilteredName.map(row => 
//             <List key={row.id}>
//             <ListItem style={{borderBottomWidth:0}}>
//             <Text key={row.name} style={{fontSize:16}}>{row.name}</Text>
//           </ListItem>
//           </List>
//            )}
//         </View>
//         </View>

      
//     );
//   }
// }


// const API_KEY = 'AIzaSyCUZhV7DAv0GQcKayL7KkN2PMa6ZycFj2U';

import React, { Component } from 'react';
var google = require('googleapis');
var googleAuth = require('google-auth-library');
export default class SearchBar extends Component {
  constructor(){
    super()
    SplashScreen.hide()
    
  }
searchListByKeyword(auth, requestData) {
  var service = google.youtube('v3');
  var parameters = removeEmptyParameters(requestData['params']);
  parameters['auth'] = auth;
  service.search.list(parameters, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    console.log(response);
  });
}

//See full code sample for authorize() function code.
authorize(JSON.parse(content), {'params': {'maxResults': '25',
                 'part': 'snippet',
                 'q': 'surfing',
                 'type': 'keyword'}}, searchListByKeyword);

  componentDidMount() {
    // this.loadYoutubeApi();
    this.searchExecute();
  }

  render() {
     return (
       <View style={{flex:1}}>
       <Text>Hi</Text>
       </View>
     )
}
}