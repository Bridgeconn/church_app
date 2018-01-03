
import React, {Component} from 'react'
import {View,Text,ScrollView,TouchableOpacity,Image,Dimensions,Share} from 'react-native';
import {ListItem,List,Card,CardItem,Body,Right} from 'native-base'
import {Actions} from 'react-native-router-flux'
import verse from './verseOfTheDayListDummy.json'
import Timestamp from 'react-timestamp';
import styles from '../style/styles.js'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FCM from "react-native-fcm";
import {registerKilledListener, registerAppListener} from "./Listeners";

registerKilledListener();
export default class VersePage extends Component{

 constructor(){
        super()
        this.state ={
            data: [],
            result:"",
            token: "",
            tokenCopyFeedback: ""   
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
  showLocalNotification() {
    FCM.presentLocalNotification({
      vibrate: 500,
      title: 'Notification',
      body: 'Verse of the day',
      priority: "high",
      show_in_foreground: true,
      group: 'test',
      number: 10
    });
  }
  
  async componentDidMount(){
    this.getData();
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
  //   setClipboardContent(text) {
  //   Clipboard.setString(text);
  //   this.setState({tokenCopyFeedback: "Token copied to clipboard."});
  //   setTimeout(() => {this.clearTokenCopyFeedback()}, 2000);
  // }
  // clearTokenCopyFeedback() {
  //   this.setState({tokenCopyFeedback: ""});
  // }

    render() {
      const data = this.state.data;
          return (
                    <View style={styles.container}>
                    <ScrollView>
                       {data.map(item =>
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
                          <TouchableOpacity onPress={() => this.showLocalNotification()} >
                            <Text>Notification</Text>
                          </TouchableOpacity>
                          
                        </CardItem>
                        </Card>
                        )}
                    </ScrollView>
                    </View>
                )                                                                                                                                                                                                                                        
}
}
