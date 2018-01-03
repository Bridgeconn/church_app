// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   ListView,
//   TextInput,
//   Platform,
//   TouchableOpacity,
//   TouchableHighlight
// } from 'react-native';
// import axios from 'axios';
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
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
  Platform
} from 'react-native';

import FCM from "react-native-fcm";

import {registerKilledListener, registerAppListener} from "./Listeners";
// import firebaseClient from  "./FirebaseClient";

registerKilledListener();

export default class App extends Component {
  constructor(props) {
    super(props);
  SplashScreen.hide()
    this.state = {
      token: "",
      tokenCopyFeedback: ""
    }
  }

  async componentDidMount(){
     SplashScreen.hide()
    registerAppListener();
    FCM.getInitialNotification().then(notif => {
      this.setState({
        initNotif: notif
      })
    });

    try{
      let result = await FCM.requestPermissions({badge: false, sound: true, alert: true});
    } catch(e){
      console.error(e);
    }

    FCM.getFCMToken().then(token => {
      console.log("TOKEN (getFCMToken)", token);
      this.setState({token: token || ""})
    });

    if(Platform.OS === 'android'){
      FCM.getAPNSToken().then(token => {
        console.log("APNS TOKEN (getFCMToken)", token);
      });
    }
  }

  showLocalNotification() {
    FCM.presentLocalNotification({
      vibrate: 500,
      title: 'Hello',
      body: 'Test Notification',
      big_text: 'i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large',
      priority: "high",
      sound: "bell.mp3",
      large_icon: "https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg",
      show_in_foreground: true,
      group: 'test',
      number: 10
    });
  }

  scheduleLocalNotification() {
    FCM.scheduleLocalNotification({
      id: 'testnotif',
      fire_date: new Date().getTime()+5000,
      vibrate: 500,
      title: 'Hello',
      body: 'Test Scheduled Notification',
      sub_text: 'sub text',
      priority: "high",
      large_icon: "https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg",
      show_in_foreground: true,
      picture: 'https://firebase.google.com/_static/af7ae4b3fc/images/firebase/lockup.png'
    });
  }
  setClipboardContent(text) {
    Clipboard.setString(text);
    this.setState({tokenCopyFeedback: "Token copied to clipboard."});
    setTimeout(() => {this.clearTokenCopyFeedback()}, 2000);
  }
  clearTokenCopyFeedback() {
    this.setState({tokenCopyFeedback: ""});
  }
  render() {
    let { token, tokenCopyFeedback } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Simple Fcm Client!
        </Text>

        <Text>
          Init notif: {JSON.stringify(this.state.initNotif)}

        </Text>

        <Text selectable={true} onPress={() => this.setClipboardContent(this.state.token)} style={styles.instructions}>
          Token: {this.state.token}
        </Text>
        <Text style={styles.feedback}>
          {this.state.tokenCopyFeedback}
        </Text>        
        <TouchableOpacity onPress={() => this.showLocalNotification()} style={styles.button}>
          <Text style={styles.buttonText}>Send Local Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.scheduleLocalNotification()} style={styles.button}>
          <Text style={styles.buttonText}>Schedule Notification in 5s</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 2,
  },
  feedback: {
    textAlign: 'center',
    color: '#996633',
    marginBottom: 3,
  },
  button: {
    backgroundColor: "teal",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 15,
    borderRadius: 10
  },
  buttonText: {
    color: "white",
    backgroundColor: "transparent"
}
})