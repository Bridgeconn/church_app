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
import EventsPage from './EventsPage'
import EventsDetail from './EventsDetail'
import LiveStreamPage from './LiveStreamPage'
import SongBookPage from './SongBookPage'
import SongLyrics from './SongLyrics'
import ContactBookPage from './ContactBookPage'
import VersePage from './VersePage'
import Searchbar from './Searchbar'
import styles from '../style/styles.js'
import SplashScreen from 'react-native-splash-screen'

export default class RoutesPage extends Component {
  constructor(props) {
    super(props)
    console.log("router"+ this.props.hasToken)
    this.state = { hasToken:false, isLoaded: false, guestKey:false, tokenValue:null,imageUri:null,username:null,contactNum:null};
  }

  async componentDidMount() {
    console.log('initial token '+this.state.hasToken)
    await AsyncStorage.getItem('token').then((auth_token) => {
      console.log('token1 '+auth_token)
      this.setState({tokenValue:auth_token})
      console.log("tokenValue"+this.state.tokenValue)
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
        this.setState({ imageUri:uri})
        console.log("hasUri"+this.state.imageUri)
      })
      await AsyncStorage.getItem('user').then((user) => {
        console.log("user"+user)
        console.log('user '+this.state.username)
        this.setState({ username:user})
        console.log("hasUser"+this.state.username)
      })
      await AsyncStorage.getItem('contact').then((contact) => {
        console.log("contact"+contact)
        console.log('contact '+this.state.contactNum)
        this.setState({contactNum:contact})
        console.log("contact"+this.state.contactNum)
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
    if (Actions.currentScene == "home2" || Actions.currentScene == "register" || Actions.currentScene == "_tab1") {
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
//     async checkUserSignedIn(){
//     try {
//       let value = await AsyncStorage.getItem('user_type');
       
//       if(value == 1){
//         Actions.home()
          
//       }
//       else if (value == 2){
//           Actions.register()
//        }

//     } catch (error) {
//       // Error retrieving data
//     }
// }
  
      render() {

        console.log("loader"+this.state.isLoaded)
        console.log("render image uri  "+this.state.imageUri)
        if (!this.state.isLoaded) {
          return (
          //   <ActivityIndicator />
          null
          )
         }
        else{
        return(
          // SplashScreen.hide()
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
                initial = {!this.state.guestKey && !this.state.hasToken}     
                hasToken={this.state.hasToken}
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
                hasToken ={this.state.hasToken}
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
                token = {this.state.tokenValue}    
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
                key = "songs"       
                component = {SongBookPage}       
                title = "SongBook"                
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
                title = "Contact"                 
                hasToken={this.state.hasToken}
              />
              <Scene 
                key = "verse"      
                component = {VersePage}          
                title = "Verse" 
              />
              
              <Scene 
              key="home2" 
              type="reset"  
              hideNavBar={true}  
              token ={this.state.tokenValue}
              activeBackgroundColor='#3F51B5'
              initial={this.state.guestKey || this.state.hasToken}
              showLabel={false} 
              swipeEnabled={false}
              lazyLoad={true}
              animationEnabled={false}
              tabBarStyle={styles.tabBar} 
              tabs={true} 
              tabBarPosition="bottom" 
                renderRightButton = {() => 
                  <View style={{flexDirection:"row",paddingRight:16}}>
                    <TouchableOpacity onPress={()=>{Actions.profile()}} style={{paddingRight:16}}>
                      <Icon name="account-circle" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{Actions.settings()}} style={{paddingRight:16}}>
                      <Icon name="settings" size={24} color="white"/>
                    </TouchableOpacity>
                  </View>
                  
                }
               >
                <Scene key="tab1" component={EventsPage} title="Events" icon={TabIcon} iconName="eventbrite" />
                    <Scene key="tab2" component={ContactBookPage} title="Contact" icon={TabIcon} iconName="phone"/>
                    <Scene key="tab3" component={SongBookPage} title="SongBook" icon={TabIcon} iconName="music-note"/>
                    <Scene key="tab4" component={VersePage} title="Verse" icon={TabIcon}  iconName="book-open-page-variant"/>
                    <Scene key="tab5" component={LiveStreamPage} title="Live Event" icon={TabIcon} iconName="video"/>
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