import React, {Component} from 'react'
import {View,Text,ScrollView,TouchableOpacity,Image,Dimensions,Share,Platform} from 'react-native';
import {ListItem,List,Card,CardItem,Body,Right, Button} from 'native-base'
import {Actions} from 'react-native-router-flux'
import verse from './verseOfTheDayListDummy.json'
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
             verseData :[],
    //         result:"",
    //         token: "",
    //         tokenCopyFeedback: "",
          }
        }
    //       this.getData =this.getData.bind(this);
    //       this._shareMessage = this._shareMessage.bind(this);
    //       this._showResult = this._showResult.bind(this);
    // }

  //   getData(){
  //     const data = verse.verses
  //     this.setState({data: data})  
  //   }
  //   _showResult(result) {
  //   this.setState({result});
  // }

  // _shareMessage(message, book_name, chapter, verse_number) {
  //   let messageText = book_name+" " +chapter+ ":" +verse_number+ " " +version+ "\n" +message;
  //   Share.share({
  //     message: messageText
  //   }).then(this._showResult);
  // }
  
  
  componentDidMount(){
    this.getVersesFromDb()
  }
    getVersesFromDb(){
      db.transaction((tx)=>{
        tx.executeSql('SELECT * FROM Verse', [], function(tx,res){
          console.log("Query completed");
          console.log("data response"+  JSON.stringify(res.rows.raw()))
            this.setState({verseData: res.rows.raw()})
          // let rows = res.rows.raw();
          //   console.log("rows"+JSON.stringify(rows))
          //   rows.map(row => console.log(`chapter_num: ${row.chapter_num}`));
          //   rows.map(row => console.log(`verse_num: ${row.verse_num}`));
            
        },function(e) {
                console.log("ERROR: " + e);
            })
      })
    }

    rerender() {
      this.getVersesFromDb()
      console.log("state data = " + JSON.stringify(this.state.verseData))
    }

    render() {
      console.log("state data = " + JSON.stringify(this.state.verseData))
          return (
                    <View style={styles.container}>
                    <Button onPress={()=>this.rerender()}><Text>HELLO CHECK</Text></Button>
                    <ScrollView>
                       {this.state.verseData.map(item =>
                          <Text style={{color:'black'}}>hello</Text>
                        )}
                        
                    </ScrollView>
                    </View>
                )                                                                                                                                                                                                                                        
}
}
// / {this.state.verseData.map(item =>
// <Card key={item.timestamp} style={styles.cardVerse}>
//                          <CardItem style={styles.verseListItemStyle}>
//                           <Text style={styles.tabTextSize}>{item.book_name} {item.chapter_num} : {item.verse_num} </Text>
//                           <Timestamp time={item.timestamp/1000} utc={false} component={Text} format='date' style={styles.verseTimestamp}/>
//                         </CardItem>
//                         <CardItem>
//                           <Text style={styles.tabTextVerseSize}>{item.verse_body}</Text>
//                         </CardItem>
//                         <CardItem style={styles.contactListItemStyle}>
//                         <TouchableOpacity  onPress={this._shareMessage.bind(this,
//                           item.verse_body,
//                           item.book_name,
//                           item.chapter_num,
//                           item.verse_num)}
//                           title="Share"
//                           color="#3F51B5"
//                           >
//                           <Icon name="share-variant" size={24} color="#3F51B5"/>
//                           </TouchableOpacity>
//                         </CardItem>
//                         </Card>