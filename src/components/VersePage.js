import React, {Component} from 'react'
import {View,Text,ScrollView,TouchableOpacity,Image,Dimensions,Share,Platform} from 'react-native';
import {ListItem,List,Card,CardItem,Body,Right} from 'native-base'
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
            data :[],
            result:"",
            token: "",
            tokenCopyFeedback: "",
            initNotif:null  
          }
          this.getData =this.getData.bind(this);
          this._shareMessage = this._shareMessage.bind(this);
          this._showResult = this._showResult.bind(this);
    }

    getData(){
      const data = verse.verses
      this.setState({data: data})  
    }
    _showResult(result) {
    this.setState({result});
  }

  _shareMessage(message, book_name, chapter, version, verse_number) {
    let messageText = book_name+" " +chapter+ ":" +verse_number+ " " +version+ "\n" +message;
    Share.share({
      message: messageText
    }).then(this._showResult);
  }
  
  
  async componentDidMount(){
    this.getData();
    FCM.on(FCMEvent.Notification, notif => {
      console.log("Notification  "+JSON.stringify(notif));

      if(notif.local_notification){
      return
    }
    if(notif.opened_from_tray){
      console.log("Notification  data"+JSON.stringify(notif.fcm));
      
    }
    })

     FCM.on(FCMEvent.RefreshToken, token => {
      console.log("TOKEN (refreshUnsubscribe)", token);
      this.props.onChangeToken(token);
    })

    FCM.getInitialNotification().then(notif => {
      this.setState({
        initNotif: notif
      })
    })
    FCM.getFCMToken().then(token => {
      console.log("TOKEN (getFCMToken)", token);
      this.setState({token: token || ""})
    });
    }
    notificationToDb(){
        db.transaction((tx)=>{
        tx.executeSql('CREATE TABLE IF NOT EXISTS verseOfTheDay (time_stamp integer, book_name  text, chapter_num integer, verse_text text )',[],(tx, res)=>{
        console.log("Table created",JSON.stringify(res))
        })
        tx.executeSql("INSERT INTO verseOfTheDay (data, data_num) VALUES (?,?)", ["test", 100], function(tx, res) {
            console.log("insertId: " + res.insertId + " -- probably 1");
            console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
       })
     })
    }
    render() {
          return (
                    <View style={styles.container}>
                    <ScrollView>
                       {/*data.map(item =>
                        <Card key={item.book_name} style={styles.cardVerse}>
                        <CardItem style={styles.verseListItemStyle}>
                          <Text style={styles.tabTextSize}>{item.book_name} {item.chapter} : {item.verse_number} {item.version}</Text>
                          <Timestamp time={item.timestamp} component={Text} style={styles.verseTimestamp}/>
                        </CardItem>
                        <CardItem>
                          <Text style={styles.tabTextVerseSize}>{item.verse_text}</Text>
                        </CardItem>
                        <CardItem style={styles.contactListItemStyle}>
                        <TouchableOpacity  onPress={this._shareMessage.bind(this,
                          item.verse_text,
                          item.book_name,
                          item.chapter,
                          item.version,
                          item.verse_number)}
                          title="Share"
                          color="#3F51B5"
                          >
                          <Icon name="share-variant" size={24} color="#3F51B5"/>
                          </TouchableOpacity>
                        </CardItem>
                        </Card>
                        )*/}
                        {this.props.verseData == null ? null :
                        this.props.verseData.map(item =>
                        <Card key={item.verse_title} style={styles.cardVerse}>
                        <CardItem>
                          <Text style={styles.tabTextVerseSize}>{item.verse_body}</Text>
                        </CardItem>
                        <CardItem>
                          <Text style={styles.tabTextVerseSize}>{item.verse_body}</Text>
                        </CardItem>
                        </Card>
                        )}
                    </ScrollView>
                    </View>
                )                                                                                                                                                                                                                                        
}
}