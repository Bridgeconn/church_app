import React, {Component} from 'react'
import {View,Text,ScrollView,TouchableOpacity,Image,Dimensions,Share,Platform} from 'react-native';
import {ListItem,List,Card,CardItem,Body,Right, Button} from 'native-base'
import {Actions} from 'react-native-router-flux'
// import verse from './verseOfTheDayListDummy.json'
import Timestamp from 'react-timestamp';
import styles from '../style/styles.js'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FCM, {FCMEvent} from "react-native-fcm"
let SQLite = require('react-native-sqlite-storage')

var db = SQLite.openDatabase({name: 'church_app_new.db', location: 'default'})

export default class VersePage extends Component{

 constructor(props){
        super(props)
      
        this.state ={
            verseData: [],
            result:"",
          }
          this._shareMessage = this._shareMessage.bind(this);
          this._showResult = this._showResult.bind(this);
}
  
    _showResult(result) {
    this.setState({result});
  }

  _shareMessage(message, book_name, chapter, verse_number) {
    let messageText = book_name+" " +chapter+ ":" +verse_number+ "\n" +message;
    Share.share({
      message: messageText
    }).then(this._showResult);
  }
  
  
  componentDidMount(){
    this.getVersesFromDb()
  }
    getVersesFromDb(){
      db.transaction((tx)=>{
        tx.executeSql('SELECT * FROM Verse', [], (tx,res) => {
          console.log("Query completed");
          console.log("data response"+  JSON.stringify(res.rows.raw()))
          let rows = res.rows.raw();
            this.setState({verseData: rows})
        
        })
      })
    }

    rerender() {
      this.getVersesFromDb()
      console.log("state data = " + JSON.stringify(this.state.verseData))
    }

    render() {
      console.log("state data = " + JSON.stringify(this.state.verseData))
      
      if(this.state.verseData.length == 0){
        return null;
      }
      else{
        return (
          <View style={styles.container}>
          <ScrollView>
             {this.state.verseData.map(item =>
               <Card key={item.timestamp} style={styles.cardVerse}>
               <CardItem style={styles.verseListItemStyle}>
                <Text style={styles.tabTextSize}>{item.book_name} {item.chapter_num} : {item.verse_num} </Text>
                <Timestamp time={item.timestamp/1000} utc={false} component={Text} format='ago' style={styles.verseTimestamp}/>
              </CardItem>
              <CardItem>
                <Text style={styles.tabTextVerseSize}>{item.verse_body}</Text>
              </CardItem>
              <CardItem style={styles.contactListItemStyle}>
              <TouchableOpacity  onPress={this._shareMessage.bind(this,
                item.verse_body,
                item.book_name,
                item.chapter_num,
                item.verse_num)}
                title="Share"
                color="#3F51B5"
                >
                <Icon name="share-variant" size={24} color="#3F51B5"/>
                </TouchableOpacity>
              </CardItem>
              </Card>
              )}
          </ScrollView>
          </View>
                )                         
      }
                                                                                                                                                                                                                         
}
}
