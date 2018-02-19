import React, {Component} from 'react'
import { Router, Scene,  Schema, Animations, Actions} from 'react-native-router-flux'
import { Container, Header, Item, Input, Button} from 'native-base';
import {AsyncStorage,ActivityIndicator,BackHandler,TouchableOpacity,Text,View, DeviceEventEmitter, NativeModules, NativeEventEmitter, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ProfilePage from './ProfilePage'
import Register from './RegisterPage'
import Settings from './Settings'
import Login from './LoginPage'
import GuestLogin from './GuestLoginPage'
import Signup from './SignupPage'
import NewSignup from './NewSignupPage'
import EventsPage from './EventsPage'
import EventsDetail from './EventsDetail'
import LiveStreamPage from './LiveStreamPage'
import StartLiveStream from './StartLiveStream'
import SongBookPage from './SongBookPage'
import SongLyrics from './SongLyrics'
import ContactBookPage from './ContactBookPage'
import VersePage from './VersePage'
import YoutubeSongSearch from './YoutubeSongSearch'
import {styleRouter} from '../style/styles'
import SplashScreen from 'react-native-splash-screen'
import Spinner from 'react-native-loading-spinner-overlay';
import FCM from "react-native-fcm"
import SQLite from 'react-native-sqlite-storage'
import * as AsyncStorageConstants from './AsyncStorageConstants';
import LocalEventEmitter from './LocalEventEmitter'

const NotificationModule = NativeModules.NotificationModule;

import {registerKilledListener, registerAppListener, registerTopicListener} from "./Listeners";

var db = SQLite.openDatabase({name: 'church_app.db', location: 'default'}, () => console.log("SQL Database Opened"),(err) => console.log("SQL Error: " + err),)

registerKilledListener();
registerTopicListener();

export default class RoutesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false, 
      guestKey:false, 
      tokenValue:null,
      imageUri:null,
      username:null,
      contactNum:null,
      email:null,
      showEmail:null,
      showContact:null
      // verseData:[]
    };
    this.updateTokenValue = this.updateTokenValue.bind(this);
    this.updateProfileValue =this.updateProfileValue.bind(this);
  }

  async componentDidMount() {
    
    registerAppListener();

    await AsyncStorage.getItem(AsyncStorageConstants.UserToken).then((auth_token) => {
      console.log('token1 '+auth_token)
      this.setState({tokenValue:auth_token})
    })
    if(this.state.tokenValue==null){
        await AsyncStorage.getItem('guest').then((value) => {
          console.log('key1 '+value)
          this.setState({ guestKey: value !== null })
        })
     } else {  
        await AsyncStorage.getItem(AsyncStorageConstants.UserEmail).then((email) => {
          console.log("email"+email)
          this.setState({email:email})
        })

      await AsyncStorage.getItem(AsyncStorageConstants.UserName).then((value) => {
        console.log("value "+value+"  " + typeof value)
        this.setState({ username: value})
      })
      await AsyncStorage.getItem(AsyncStorageConstants.UserContactNumber).then((value) => {
        this.setState({contactNum: value})
      })
      await AsyncStorage.getItem(AsyncStorageConstants.UserCheckBoxEmail).then((value) => {
        console.log("email_value "+value+ " "+ typeof value)

        this.setState({ showEmail: JSON.parse(value)})
      })
      await AsyncStorage.getItem(AsyncStorageConstants.UserCheckBoxContact).then((value) => {
        this.setState({showContact: JSON.parse(value)})
      })

     }
    
    this.setState({isLoaded:true}) 
    this.hideSplashScreen()
    BackHandler.addEventListener('hardwareBackPress', this.handleAndroidBack)
    
  }

    updateTokenValue(params) {
      console.log("here in updateTokenValue")
 // updateTokenValue(paramToken, paramEmail, paramUserName, paramContact, paramShowEmail, paramShowContact) {
     this.setState({tokenValue: params[0]})
     this.setState({email:params[1]})
     this.setState({username:params[2]})
     this.setState({contactNum:params[3]})
     this.setState({showEmail:params[4]})
     this.setState({showContact:params[5]})

    console.log("now call home 2 with tabs")
    Actions.home2();
    // {tokenValue:response.data.user.auth_token, contactNum:response.data.user.user_contact,
      // email:response.data.user.email, username:response.data.user.first_name,showpregress:this.state.showProgress});

   }

   updateProfileValue(params){
      this.setState({username:params[0]})
     this.setState({contactNum:params[1]})
     this.setState({showEmail:params[2]})
     this.setState({showContact:params[3]})
   }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleAndroidBack)
  }
 
  componentWillMount(){
    db.transaction((tx)=>{
            tx.executeSql('CREATE TABLE IF NOT EXISTS Verse (timestamp int, chapter_num int, verse_num text, book_name text, verse_body text)',
              [],
              (tx, res)=>{
                console.log("Table created",JSON.stringify(res))
              }
            )
         })

    DeviceEventEmitter.addListener('notificationReceived', function(e: Event) {
      console.log("Event = " + JSON.stringify(e))
      console.log("Event = TITLE" + e.notification_title)
      console.log("Event = body" + e.notification_body)

      var offset = new Date().getTimezoneOffset();
            console.log(offset);
            e.notification_timestamp = e.notification_timestamp - (offset*60*1000)

      // add to db here
        db.transaction((tx)=>{
        tx.executeSql("INSERT INTO Verse (timestamp, chapter_num, verse_num, book_name, verse_body) VALUES (?,?,?,?,?)", [e.notification_timestamp, e.chapter_num, e.verse_num, e.book_name, e.notification_title], 
          function(tx, res) {
            console.log("insertId: " + res.insertId + " -- probably 1");
            console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
       })
     })
      FCM.presentLocalNotification({
            title: e.notification_title,                 
            body: e.notification_body,                
            show_in_foreground: true,
            big_text: e.notification_body,
        })

     LocalEventEmitter.trigger('NewVerseNotification', {timestamp:e.notification_timestamp, chapter_num:e.chapter_num,verse_num: e.verse_num, book_name: e.book_name, verse_body: e.notification_title}) 
    })

  }

  handleAndroidBack(){
    console.log('back press'+Actions.currentScene)
    if (Actions.currentScene == "home2" || Actions.currentScene == "register" || Actions.currentScene == "_tab_events" || Actions.currentScene == "newsignup") {
        console.log("home2")
        BackHandler.exitApp();
    } else if (Actions.currentScene == "profile"){
     LocalEventEmitter.trigger('BackButtonPressProfile', {})
    } else {
      Actions.pop()
    }
    return true
  }


  hideSplashScreen(){
    setTimeout(()=>{SplashScreen.hide()},
         500
      )
  }

  rightButton = () =>{
    return(
        <View style={styleRouter.navbarRightButton}>
                  <TouchableOpacity onPress={()=>{Actions.profile({tokenValue: this.state.tokenValue,
                contactNum:this.state.contactNum,
                email:this.state.email,
                username:this.state.username,   
                showEmail:this.state.showEmail,
                showContact:this.state.showContact})}} style={styleRouter.buttonTouchable}>
                    <Icon name="account-circle" size={26} color="white"/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{Actions.settings()}} style={styleRouter.buttonTouchable}>
                    <Icon name="settings" size={26} color="white" />
                  </TouchableOpacity>
              </View>
            )
  }
  
      render() {
        console.log("loader"+this.state.isLoaded)
        console.log("render image uri  "+this.state.imageUri)
        if (!this.state.isLoaded) {
          return (
            null
          )
         }
        else{
        return(
          <Router
          navigationBarStyle={styleRouter.navigationBarColor}
          leftButtonIconSize={30} 
          leftButtonColor={"white"} 
          tintColor={'white'} 
          titleStyle={styleRouter.navbarTitle}
          >
            <Scene key="root">
              <Scene 
                key = "register"       
                component = {Register}   
                initial = {!this.state.guestKey && this.state.tokenValue == null}     
                tokenValue={this.state.tokenValue}
                guestKey={this.state.guestKey}
                hideNavBar={true}  
                type="reset"
                action={this.updateTokenValue}
              />
               
              
              <Scene 
                key = "newsignup"       
                component = {NewSignup}   
                tokenValue={this.state.tokenValue}
                guestKey={this.state.guestKey}
                hideNavBar={true}  
                type="reset"
              />
              <Scene 
                key = "settings"  
                component = {Settings} 
                title="Settings"
              />
             
              <Scene 
                key = "guest"  
                component = {GuestLogin}  
                hideNavBar={true}
              />
              
              <Scene key = "profile"    
                component = {ProfilePage}        
                title = "Profile" 
                hideNavBar={true}
                tokenValue={this.state.tokenValue}
                contactNum={this.state.contactNum}
                email={this.state.email}
                username={this.state.username}   
                showEmail={this.state.showEmail}
                showContact={this.state.showContact}            
                titleStyle={styleRouter.navbarTitle}
                ref={profileRef => this.profileRef = profileRef}
                action = {this.updateProfileValue}

              />
              
              <Scene 
                key = "eventsDetails"   
                title = "Events"    
                component = {EventsDetail}                  
                titleStyle={styleRouter.navbarTitle} 
                       
              />
              <Scene 
                key = "live"       
                component = {LiveStreamPage}     
                title = "Live Event"                 
              />
              
              <Scene 
                key = "songLyrics"       
                component = {SongLyrics}       
                title = "Song Lyrics"       
              />

              <Scene 
                key = "youtubeSongSearch"       
                component = {YoutubeSongSearch}       
                title = "Search Results"            
              />
             
              <Scene 
              key="home2" 
              type="reset"  
              hideNavBar={false}
              tokenValue={this.state.tokenValue}
              contactNum={this.state.contactNum} 
              username={this.state.username}
              email={this.state.email}
              activeBackgroundColor='#3F51B5'
              initial={this.state.guestKey || this.state.tokenValue!==null}
              showLabel={false} 
              swipeEnabled={false}
              lazyLoad={false}
              animationEnabled={false}
              tabBarStyle={styleRouter.tabBar} 
              tabs={true} 
              tabBarPosition="bottom" 
                renderRightButton={this.rightButton}
               >

                <Scene
                  key="tab_events"
                  title="Events"
                  icon={TabIcon}
                  iconName="eventbrite"
                  component={EventsPage}
                  tokenValue={this.state.tokenValue}
                />
                <Scene
                key="tab_contacts"
                title="Contacts"  
                component={ContactBookPage}
                icon={TabIcon}
                iconName="contacts"
                renderTitle="Contacts Book"
                tokenValue={this.state.tokenValue}

                />
                <Scene 
                key="tab_songbook" 
                title="Songs"
                icon={TabIcon} 
                iconName="itunes"
                component={SongBookPage}
                renderTitle="Songs Book"
                tokenValue={this.state.tokenValue}


                />
                <Scene 
                key="tab_verses"  
                title="Verse" 
                icon={TabIcon}  
                iconName="book-open-page-variant"
                component={VersePage}
                renderTitle="Verse of the day"
                tokenValue={this.state.tokenValue}

                />
                <Scene 
                key="tab_livestream" 
                title="Video" 
                icon={TabIcon} 
                iconName="video"
                component={StartLiveStream}
                tokenValue={this.state.tokenValue}

                />
              </Scene>
            </Scene> 
          </Router>          
          )
        }
      }
  }

class TabIcon extends Component {
  render() {
    var color = this.props.focused ? '#fff':'#3F51B5'
    return (
      <View style={styleRouter.tabContainer}>
        <Icon color={color} name={this.props.iconName || "circle"} size={28}/>
        {this.props.focused?<Text style={{color: color, fontSize: 12}}>{this.props.title}</Text>:null}
      </View>
    );
  }
}

