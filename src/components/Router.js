import React, {Component} from 'react'
import { Router, Scene,  Schema, Animations, Actions} from 'react-native-router-flux'
import { Container, Header, Item, Input, Button} from 'native-base';
import {AsyncStorage,ActivityIndicator,BackHandler,TouchableOpacity,Text,View} from 'react-native'
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
import styles from '../style/styles.js'
import SplashScreen from 'react-native-splash-screen'
import Spinner from 'react-native-loading-spinner-overlay';
export default class RoutesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false, guestKey:false, tokenValue:null,imageUri:null,username:null,contactNum:null
    };
  }

  async componentDidMount() {
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
     }
    
    this.setState({isLoaded:true}) 
    this.hideSplashScreen()
    BackHandler.addEventListener('hardwareBackPress', this.handleAndroidBack)
  }
  componentWillUnmount(){
  BackHandler.removeEventListener('hardwareBackPress', this.handleAndroidBack)
  }
  handleAndroidBack(){
    console.log('back press'+Actions.currentScene)
    if (Actions.currentScene == "home2" || Actions.currentScene == "register" || Actions.currentScene == "_tab1" || Actions.currentScene == "newsignup") {
        console.log("home2")
      BackHandler.exitApp();
      return true;
    }
    return false;
  }
   ComponentWillMount(){
    Actions.refresh({key: 'eventsDetails', title: 'hi'});

  }
  hideSplashScreen(){
    setTimeout(()=>{SplashScreen.hide()},
         500
      )
  }

  handleSave = () =>{
    this.child.handlePress()
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
                key = "home"  
                component = {HomePage}
                title = "Church App" 
                type="reset"
                initial={false}
                tokenValue ={this.state.tokenValue}
                guestKey ={this.state.guestKey}
                imageUri={this.state.imageUri}
                contactNum={this.state.contactNum} 
                username={this.state.username}
                renderRightButton = {() => 
                  <View style={{flexDirection:"row"}}>
                <TouchableOpacity onPress={()=>{Actions.profile()}}>
                  <Icon name="account-circle" size={26} color="white" style={{paddingRight:20}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{Actions.settings()}}>
                  <Icon name="settings" size={26} color="white" style={{paddingRight:20}}/>
                </TouchableOpacity>
                </View>
                }
              />
              <Scene 
                key = "settings"  
                component = {Settings} 
                title="Settings"
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
              <Scene 
                key = "searchbar"  
                component = {Searchbar}  
                hideNavBar={true}
              />
              <Scene key = "profile"    
                component = {ProfilePage}        
                title = "Profile" 
                onRefSave={ref => (this.child = ref)}                
                titleStyle={styles.navbarTitle}
                renderRightButton = {() => 
                <TouchableOpacity onPress={this.handleSave}>
                  <Text style={styles.navbarTitleRight}>Save</Text>
                </TouchableOpacity>
                }
              />
              <Scene 
                key = "events"     
                component = {EventsPage}     
                tokenValue = {this.state.tokenValue}    
                title = "Events" 
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
                key = "startLive"       
                component = {StartLiveStream}     
                title = "Live Event"                 
              />
              <Scene 
                key = "songs"       
                component = {SongBookPage}    
                title = "Song Book"                
                titleStyle={styles.navbarTitle}
              />
              <Scene 
                key = "songLyrics"       
                component = {SongLyrics}       
                title = "SongLyrics"                 
              />
              <Scene 
                key = "contacts"   
                component = {ContactBookPage}    
                title = "Contact Book"                 
                tokenValue={this.state.tokenValue}
              />
              <Scene 
                key = "verse"      
                component = {VersePage}          
                title = "Verse of the Day" 
              />
              
              <Scene 
              key="home2" 
              type="reset"  
              hideNavBar={false}
              tokenValue={this.state.tokenValue}
              contactNum={this.state.contactNum} 
              username={this.state.username}
              activeBackgroundColor='#3F51B5'
              initial={this.state.guestKey || this.state.tokenValue!==null}
              showLabel={false} 
              swipeEnabled={false}
              lazyLoad={true}
              animationEnabled={false}
              tabBarStyle={styles.tabBar} 
              tabs={true} 
              tabBarPosition="bottom" 
                renderRightButton = {() => 
                  <View style={{flexDirection:"row",paddingRight:16}}>
                    <TouchableOpacity onPress={()=>{Actions.profile({tokenValue:this.state.tokenValue,contactNum:this.state.contactNum,username:this.state.username})}} style={{paddingRight:16}}>
                      <Icon name="account-circle" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{Actions.settings()}} style={{paddingRight:16}}>
                      <Icon name="settings" size={24} color="white"/>
                    </TouchableOpacity>
                  </View>
                }
               >
                <Scene
                  key="tab1"
                  title="Events"
                  icon={TabIcon}
                  iconName="eventbrite"
                  component={EventsPage}
                />
                <Scene 
                key="tab2" 
                title="Contact" 
                icon={TabIcon} 
                iconName="phone"
                component={ContactBookPage}
                />
                <Scene 
                key="tab3" 
                title="Song" 
                icon={TabIcon} 
                iconName="music-note"
                component={SongBookPage}
                />
                <Scene 
                key="tab4"  
                title="Verse" 
                icon={TabIcon}  
                iconName="book-open-page-variant"
                component={VersePage}
                />
                <Scene 
                key="tab5" 
                
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
        <Icon color={color} name={this.props.iconName || "circle"} size={24}/>
        {this.props.focused?<Text style={{color: color, fontSize: 12}}>{this.props.title}</Text>:null}
      </View>
    );
  }
}