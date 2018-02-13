import React, {Component} from 'react'
import {View,Text,ScrollView,TouchableOpacity,Image,Dimensions,Share,Platform, RefreshControl,ActivityIndicator} from 'react-native';
import {ListItem,List,Card,CardItem,Body,Right, Button} from 'native-base'
import {Actions} from 'react-native-router-flux'
// import verse from './verseOfTheDayListDummy.json'
import Timestamp from 'react-timestamp';
import styles from '../style/styles.js'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FCM, {FCMEvent} from "react-native-fcm"
let SQLite = require('react-native-sqlite-storage')
import LocalEventEmitter from "./LocalEventEmitter"
var db = SQLite.openDatabase({name: 'church_app.db', location: 'default'}, () => console.log("SQL Database Opened"),(err) => console.log("SQL Error: " + err))

export default class VersePage extends Component{

 constructor(props){
        super(props)
      
        this.state ={
            verseData: [],
            result:"",
            isLoading:false,
            isRefreshing:false
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
    LocalEventEmitter.on('NewVerseNotification', 'VersePage',  (data) => {

      let a = this.state.verseData //creates the clone of the state
      a.splice(0, 0, data);
      this.setState({verseData: a});

    })
  }

  componentWillUnmount() { 
      LocalEventEmitter.rm('NewVerseNotification', 'VersePage') ;
    }

    getVersesFromDb(){
      this.setState({isLoading:true})
      db.transaction((tx)=>{
        tx.executeSql('SELECT * FROM Verse ORDER BY timestamp DESC', [], (tx,res) => {
          console.log("Query completed");
          console.log("data response"+  JSON.stringify(res.rows.raw()))
          let rows = res.rows.raw();
            this.setState({verseData: rows, isLoading:false, isRefreshing: false})
            
            // this.setState({isLoading:false,isRefreshing:false})
        })
      })
    }

   onRefreshFunction(){
        if(this.state.isLoading){
          return
        }
        // this.setState({isRefreshing:true})
        this.getVersesFromDb()
      }

    render() {
      console.log("state data = " + JSON.stringify(this.state.verseData))

      console
        return (
          <ScrollView 
              contentContainerStyle={{flexGrow:1}}
              showsVerticalScrollIndicator={false}
              refreshControl={
                    <RefreshControl
                        onRefresh={() => this.onRefreshFunction()}
                        refreshing={this.state.isRefreshing}
                    />
                }
              >

              {this.state.isLoading ? 
                <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                  <ActivityIndicator size={"large"} animating={ this.state.isRefreshing ? false:true } style={{alignItems:"center"}} color="#3F51B5"/>
                  </View>
                  : 
                  (this.state.verseData.length == 0) ? 
                    <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                      <Text>No notifications</Text>
                    </View>
                    :
                    <View style={{margin:8}}>
                   { this.state.verseData.map(item =>
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
                      )
                  }
                    </View>
                    }
              </ScrollView>
                )                                                                                                                                                                                                                                            
}
}
 