import React, {Component} from 'react'
import { Router, Scene,  Schema, Animations, Actions} from 'react-native-router-flux'
import {AsyncStorage,ActivityIndicator,BackHandler,TouchableOpacity,Text} from 'react-native'
import {Icon} from 'native-base'
import ProfilePage from './ProfilePage'
import User from './UserPage'
import HomePage from './HomePage'
import Login from './LoginPage'
import GuestLogin from './GuestLoginPage'
import Signup from './SignupPage'
import EventsPage from './EventsPage'
import EventsDetail from './EventsDetail'
import LiveStreamPage from './LiveStreamPage'
import SongBookPage from './SongBookPage'
import SongLyrics from './SongLyrics'
import ContactBookPage from './ContactBookPage'
import VersePage from './VersePage'
import styles from '../style/styles.js'

export default class RoutesPage extends Component {
  constructor(props) {
    super(props)
    console.log("router"+ this.props.hasToken)
    this.state = { hasToken:false, isLoaded: false, guestKey:false, imageUri:null};
  }
  async componentDidMount() {
    console.log('initial token '+this.state.hasToken)
    await AsyncStorage.getItem('token').then((auth_token) => {
      console.log('token1 '+auth_token)
      this.setState({ hasToken: auth_token !== null})
      console.log('loader when token'+this.state.isLoaded)
      console.log("hasToken "+this.state.hasToken)
      console.log("token "+auth_token)
    })
    if(this.state.hasToken==false){
      console.log('initial key '+this.state.guestKey)
      await AsyncStorage.getItem('guest').then((value) => {
      console.log('key1 '+value)
      this.setState({ guestKey: value !== null, isLoaded: value !==null })
      console.log("guestKey "+this.state.guestKey)
      console.log("key "+value)
    })
     }
     else{
     await AsyncStorage.getItem('uri').then((uri) => {
        console.log("uri"+uri)
        console.log('uri '+this.state.imageUri)
        this.setState({ imageUri:uri, isLoaded:true})
        console.log("hasUri"+this.state.imageUri)
        })
     }
    
    this.setState({isLoaded:true}) 
    BackHandler.addEventListener('hardwareBackPress', this.handleAndroidBack)
  }
  componentWillUnmount(){
  BackHandler.removeEventListener('hardwareBackPress', this.handleAndroidBack)
  }
  handleAndroidBack(){
    if (Actions.currentScene == "home" || Actions.currentScene == "user") {
      BackHandler.exitApp();
      return true;
    }
    return false;
  }
   ComponentWillMount(){
    Actions.refresh({key: 'eventsDetails', title: 'hi'});
    console.log("component "+EventsPage.getData)
  }
      render() {
        const children = this.props.children;
        console.log("component "+children)
        console.log('render')
        console.log("loader"+this.state.isLoaded)
        console.log("render image uri  "+this.state.imageUri)
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
                hasToken={this.state.hasToken}
                guestKey={this.state.guestKey}
                hideNavBar={true}  
                type="reset"

              />
              <Scene 
                key = "home"  
                component = {HomePage}
                hasToken ={this.state.hasToken}
                guestKey ={this.state.guestKey}
                initial={this.state.guestKey || this.state.hasToken}
                imageUri={this.state.imageUri} 
                title = "Home" 
                hideNavBar={true}
                type="reset"
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
                title = "Profile" 
                navigationBarStyle={{backgroundColor: '#3F51B5'}} 
                titleStyle={styles.navbarTitle}
                renderRightButton = {() => 
                  <TouchableOpacity>
                  <Text>Save</Text>
                  </TouchableOpacity>
                }
              />
              <Scene 
                key = "events"     
                component = {EventsPage}         
                title = "Events" 
                navigationBarStyle={{backgroundColor: '#3F51B5'}} 
                titleStyle={styles.navbarTitle} 
                leftButtonColor={"white"}
                leftButtonIconSize={30} 
              />
              <Scene 
                key = "eventsDetails"      
                component = {EventsDetail}          
                hideNavBar={true}  
              />
              <Scene 
                key = "live"       
                component = {LiveStreamPage}     
                title = "LiveStream" 
                navigationBarStyle={{backgroundColor: '#3F51B5'}} 
                titleStyle={styles.navbarTitle}
              />
              <Scene 
                key = "songs"       
                component = {SongBookPage}       
                title = "SongBook" 
                navigationBarStyle={{backgroundColor: '#3F51B5'}} 
                titleStyle={styles.navbarTitle}
              />
              <Scene 
                key = "songLyrics"       
                component = {SongLyrics}       
                title = "SongLyrics" 
                navigationBarStyle={{backgroundColor: '#3F51B5'}} 
                titleStyle={styles.navbarTitle}
              />
              <Scene 
                key = "contacts"   
                component = {ContactBookPage}    
                title = "Contact" 
                navigationBarStyle={{backgroundColor: '#3F51B5'}} 
                titleStyle={styles.navbarTitle}
              />
              <Scene 
                key = "verse"      
                component = {VersePage}          
                title = "Verse" 
                navigationBarStyle={{backgroundColor: '#3F51B5'}} 
                titleStyle={styles.navbarTitle}
              />
              
            </Scene>
          </Router>          
          )
        }
      }
  }

