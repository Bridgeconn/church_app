import React, {Component} from 'react'
import { Router, Scene,  Schema, Animations, Actions} from 'react-native-router-flux'
import { Container, Header, Item, Input, Button} from 'native-base';
import {AsyncStorage,ActivityIndicator,BackHandler,TouchableOpacity,Text,View, DeviceEventEmitter, NativeModules, NativeEventEmitter} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ProfilePage from './ProfilePage'
import Register from './RegisterPage'
import HomePage from './HomePage'
import HomePage2 from './HomePage2'
import NavBar from './NavBar'
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
import Searchbar from './Searchbar'
// import RightButton from './RightButton'
import styles from '../style/styles.js'
import SplashScreen from 'react-native-splash-screen'
import Spinner from 'react-native-loading-spinner-overlay';
import FCM from "react-native-fcm"
import SQLite from 'react-native-sqlite-storage'

const NotificationModule = NativeModules.NotificationModule;

import {registerKilledListener, registerAppListener, registerTopicListener} from "./Listeners";

var db = SQLite.openDatabase({name: 'church_app_new.db', location: 'default'})

registerKilledListener();
registerTopicListener();

export default class RoutesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false, guestKey:false, tokenValue:null,
      imageUri:null,username:null,contactNum:null,email:null,
      // verseData:[]
    };
  }

  async componentDidMount() {
    
    registerAppListener();

    await AsyncStorage.getItem('token').then((auth_token) => {
      console.log('token1 '+auth_token)
      this.setState({tokenValue:auth_token})
    })
    if(this.state.tokenValue==null){
        await AsyncStorage.getItem('guest').then((value) => {
          console.log('key1 '+value)
          this.setState({ guestKey: value !== null })
        })
     } else {  
        await AsyncStorage.getItem('uri').then((uri) => {
          console.log("uri"+uri)
          this.setState({ imageUri:uri})
        })
        await AsyncStorage.getItem('user').then((user) => {
          console.log("user"+user)
          this.setState({ username:user})
        })
        await AsyncStorage.getItem('contact').then((contact) => {
          console.log("contact"+contact)
          this.setState({contactNum:contact})
        })
        await AsyncStorage.getItem('email').then((email) => {
          console.log("email"+email)
          this.setState({email:email})
        })
     }
    
    this.setState({isLoaded:true}) 
    this.hideSplashScreen()
     
    BackHandler.addEventListener('hardwareBackPress', this.handleAndroidBack)
    
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleAndroidBack)
  }
 
  componentWillMount(){
    DeviceEventEmitter.addListener('notificationReceived', function(e: Event) {
      console.log("Event = " + JSON.stringify(e))
      console.log("Event = TITLE" + e.notification_title)
      console.log("Event = body" + e.notification_body)
      // add to db here
        db.transaction((tx)=>{
        tx.executeSql('CREATE TABLE IF NOT EXISTS Verse (timestamp int, chapter_num int, verse_num text, book_name text, verse_body text)',
          [],
          (tx, res)=>{
            console.log("Table created",JSON.stringify(res))
          }
        )
        tx.executeSql("INSERT INTO Verse (timestamp, chapter_num, verse_num, book_name, verse_body) VALUES (?,?,?,?,?)", [e.notification_timestamp, e.chapter_num, e.verse_num, e.book_name, e.notification_body], 
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

   
    })

  }

  handleAndroidBack(){
    console.log('back press'+Actions.currentScene)
    if (Actions.currentScene == "home2" || Actions.currentScene == "register" || Actions.currentScene == "_tab_events" || Actions.currentScene == "newsignup") {
        console.log("home2")
        BackHandler.exitApp();
        return true;
    } else {
      Actions.pop()
      return true
    }
  }


  hideSplashScreen(){
    setTimeout(()=>{SplashScreen.hide()},
         500
      )
  }

  generateNotif() {
    FCM.presentLocalNotification({
            title: "hello title",                 
            body: "hello i ma bnody",                
            show_in_foreground: true,
            // click_action: "Actions.profile()",        
            big_text: "hello i ma bnody"
        })

    // NotificationModule.generateNotification('Awesome', {
    //         title: "hello title",        
    //         show_in_foreground: true,         
    //         body: "hello i ma bnody",                
    //         click_action: "Actions.settings()"




  }

  rightButton = () =>{
    return(
        <View style={{flexDirection:"row"}}>
                  <TouchableOpacity onPress={()=>{this.generateNotif()}}>
                    <Icon name="account-circle" size={26} color="white" style={{paddingRight:20,marginTop:12}}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{Actions.settings()}}>
                    <Icon name="settings" size={26} color="white" style={{paddingRight:20,marginTop:12}}/>
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
          navigationBarStyle={styles.navigationBarColor} 
          leftButtonIconSize={30} 
          leftButtonColor={"white"} 
          tintColor={'white'} 
          titleStyle={styles.navbarTitle}
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
                titleStyle={styles.navbarTitle}
              />
              
              <Scene 
                key = "eventsDetails"   
                title = "Events"    
                component = {EventsDetail}                  
                titleStyle={styles.navbarTitle} 
                       
              />
              <Scene 
                key = "live"       
                component = {LiveStreamPage}     
                title = "Live Event"                 
              />
              
              <Scene 
                key = "songLyrics"       
                component = {SongLyrics}       
                title = "SongLyrics"                 
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
              lazyLoad={true}
              animationEnabled={false}
              tabBarStyle={styles.tabBar} 
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
                />
                <Scene
                key="tab_contacts"
                title="Contacts"  
                component={ContactBookPage}
                icon={TabIcon} 
                iconName="contacts"
                renderTitle="Contacts Book"
                />
                <Scene 
                key="tab_songbook" 
                title="Songs"
                icon={TabIcon} 
                iconName="itunes"
                component={SongBookPage}
                renderTitle="Songs Book"

                />
                <Scene 
                key="tab_verses"  
                title="Verse" 
                icon={TabIcon}  
                iconName="book-open-page-variant"
                component={VersePage}
                renderTitle="Verse of the day"
                />
                <Scene 
                key="tab_livestream" 
                title="Video" 
                icon={TabIcon} 
                iconName="video"
                component={StartLiveStream} 
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
      <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
        <Icon color={color} name={this.props.iconName || "circle"} size={28}/>
        {this.props.focused?<Text style={{color: color, fontSize: 12}}>{this.props.title}</Text>:null}
      </View>
    );
  }
}

