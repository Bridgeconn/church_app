import React, {Component} from 'react'
import { Router, Scene,  Schema, Animations, Actions} from 'react-native-router-flux'
import {AsyncStorage,ActivityIndicator} from 'react-native'
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
  constructor() {
    super()
    this.state = { hasToken:false, isLoaded: false, guestToken:false };

  }
  componentDidMount(){
    AsyncStorage.getItem('token').then((auth_token) => {
      this.setState({ hasToken: auth_token !== null, isLoaded: true })
      console.log(this.state.hasToken)
    })
    AsyncStorage.getItem('guest_key').then((value) => {
      this.setState({ guestToken:value !== null, isLoaded: true })
      console.log(this.state.value)
    })
  }
      render() {
        if (!this.state.isLoaded) {
          return (
            <ActivityIndicator />
          )
         }
         else{
        return(
          <Router>
            <Scene key="root">
              <Scene 
                key = "loginSignup"       
                component = {LoginSignupPage}           
                title = "Signup" 
                initial={!this.state.hasToken && !this.state.guestToken}
                hideNavBar={true}
              />
              <Scene 
                key = "home"  
                component = {HomePage}              
                initial={this.state.hasToken || this.state.guestToken}           
                title = "HomePage" 
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
          </Router>          
          )
        }
      }
  }

