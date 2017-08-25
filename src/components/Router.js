import React, {Component} from 'react'
import { Router, Scene,  Schema, Animations, Actions } from 'react-native-router-flux'
import {Icon} from 'native-base'
import ProfilePage from './ProfilePage'
import HomePage from './HomePage'
import EventsPage from './EventsPage'
import LiveStreamPage from './LiveStreamPage'
import SongBookPage from './SongBookPage'
import ContactBookPage from './ContactBookPage'
import VersePage from './VersePage'
import styles from '../style/styles.js'

export default class RoutesPage extends Component {
   componentDidMount() {
      Actions.home();
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
      key = "home"       
      component = {HomePage}           
      title = "HomePage" 
      initial={true} 
      hideNavBar={true}
    />
    <Scene key = "profile"    
      component = {ProfilePage}        
      title = "ProfilePage" 
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
      title = "LiveStreamPage" 
      navigationBarStyle={{backgroundColor: '#3F51B5'}} 
      titleStyle={styles.navbarTitle}
    />
   	<Scene 
      key = "songs"   	  
      component = {SongBookPage}       
      title = "SongBookPage" 
      navigationBarStyle={{backgroundColor: '#3F51B5'}} 
      titleStyle={styles.navbarTitle}
    />
   	<Scene 
      key = "contacts"   
      component = {ContactBookPage}    
      title = "ContactBookPage" 
      navigationBarStyle={{backgroundColor: '#3F51B5'}} 
      titleStyle={styles.navbarTitle}
    />
   	<Scene 
      key = "verse"      
      component = {VersePage}          
      title = "VersePage" 
      navigationBarStyle={{backgroundColor: '#3F51B5'}} 
      titleStyle={styles.navbarTitle}
    />
  </Scene>
)
