import React, {Component} from 'react'
import { Router, Scene,  Schema, Animations, Actions} from 'react-native-router-flux'
import {AsyncStorage,ActivityIndicator} from 'react-native'
import {Icon} from 'native-base'
import ProfilePage from './ProfilePage'
import User from './UserPage'
import HomePage from './HomePage'
import Login from './LoginPage'
import GuestLogin from './GuestLoginPage'
import Signup from './SignupPage'
import EventsPage from './EventsPage'
import LiveStreamPage from './LiveStreamPage'
import SongBookPage from './SongBookPage'
import ContactBookPage from './ContactBookPage'
import VersePage from './VersePage'
import styles from '../style/styles.js'

export default class RoutesPage extends Component {
  constructor(props) {
    super(props)
    console.log("router"+ this.props.hasToken)
    this.state = { hasToken:false, isLoaded: false, guestKey:false};
  }
  async componentDidMount() {
    console.log('initial token '+this.state.hasToken)
    await AsyncStorage.getItem('token').then((auth_token) => {
      console.log('token1 '+auth_token)
      this.setState({ hasToken: auth_token !== null, isLoaded: auth_token !== null  })
      console.log('loader when token'+this.state.isLoaded)
      console.log("hasToken "+this.state.hasToken)
      console.log("token "+auth_token)
    })
    if(this.state.isLoaded==false){
      console.log('initial key '+this.state.guestKey)
      await AsyncStorage.getItem('guest').then((value) => {
      console.log('key1 '+value)
      this.setState({ guestKey: value !== null, isLoaded: value !==null })
      console.log("guestKey "+this.state.guestKey)
      console.log("key "+value)
    })
     }
    this.setState({isLoaded:true}) 
  }
  
      render() {
        console.log('render')
        console.log("loader"+this.state.isLoaded)
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
                key = "user"       
                component = {User}        
                initial={!this.state.guestKey && !this.state.hasToken}
                hideNavBar={true}                
              />
              <Scene 
                key = "home"  
                component = {HomePage}
                hasToken ={this.state.hasToken}
                initial={this.state.guestKey || this.state.hasToken}         
                title = "HomePage" 
                hideNavBar={true}
              />
              <Scene 
                key = "login"  
                component = {Login} 
                hideNavBar={true}
              />
              <Scene 
                key = "signup"  
                component = {Signup}
                title = "Signup" 
                hideNavBar={true}
              />
              <Scene 
                key = "guest"  
                component = {GuestLogin}  
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

