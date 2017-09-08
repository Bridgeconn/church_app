import React, {Component} from 'react'
import { Router, Scene,  Schema, Animations, Actions } from 'react-native-router-flux'
import {Icon} from 'native-base'
import ProfilePage from './ProfilePage'
import LoginSignupPage from './LoginSignupPage'
import HomePage from './HomePage'
import EventsPage from './EventsPage'
import LiveStreamPage from './LiveStreamPage'
import SongBookPage from './SongBookPage'
import ContactBookPage from './ContactBookPage'
import VersePage from './VersePage'
import styles from '../style/styles.js'

export default class RoutesPage extends Component {
   componentDidMount() {
      Actions.loginsignup();
    }
      render() {
          return (
              <Router scenes={scenes} />  
              )
      }
  }

const scenes = Actions.create(
  <Scene key="root">
  <Scene 
      key = "loginsignup"       
      component = {LoginSignupPage}           
      title = "Signup" 
      initial={true} 
      hideNavBar={true}
    />
  	<Scene 
      key = "home"       
      component = {HomePage}           
      title = "HomePage" 
      hideNavBar={true}
    />
    <Scene key = "profile"    
      component = {ProfilePage}        
      title = "Edit Profile" 
      hideNavBar={true}
    />
   	<Scene 
      key = "events"     
      component = {EventsPage}         
      title = "EventsPage" 
      navigationBarStyle={{backgroundColor: '#3F51B5'}} 
      titleStyle={styles.navbarTitle} 
      leftButtonColor={"white"}
      leftButtonIconSize={30} 
      
    />
   	<Scene 
      key = "live"       
      component = {LiveStreamPage}     
      title = "Live Stream" 
      navigationBarStyle={{backgroundColor: '#3F51B5'}} 
      titleStyle={styles.navbarTitle}
      navBarButtonColor={"white"}
    />
   	<Scene 
      key = "songs"   	  
      component = {SongBookPage}       
      title = "Songbook" 
      navigationBarStyle={{backgroundColor: '#3F51B5'}} 
      titleStyle={styles.navbarTitle}
      navBarButtonColor={"white"}
    />
   	<Scene 
      key = "contacts"   
      component = {ContactBookPage}    
      title = "Address Book" 
      navigationBarStyle={{backgroundColor: '#3F51B5'}} 
      titleStyle={styles.navbarTitle}
      navBarButtonColor={"white"}
    />
   	<Scene 
      key = "verse"      
      component = {VersePage}          
      title = "Verse of the Day" 
      navigationBarStyle={{backgroundColor: '#3F51B5'}} 
      titleStyle={styles.navbarTitle}
      navBarButtonColor={"white"}
    />
  </Scene>
)
