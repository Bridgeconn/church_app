import React, {Component} from 'react'
import { Router, Scene,  Schema, Animations, Actions } from 'react-native-router-flux'
import ProfilePage from './ProfilePage'
import HomePage from './HomePage'
import EventsPage from './EventsPage'
import LiveStreamPage from './LiveStreamPage'
import SongBookPage from './SongBookPage'
import ContactBookPage from './ContactBookPage'
import VersePage from './VersePage'

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
  	<Scene key = "home"       component = {HomePage}           title = "HomePage" initial={HomePage}/>
    <Scene key = "profile"    component = {ProfilePage}        title = "ProfilePage"/>
   	<Scene key = "events"     component = {EventsPage}         title = "EventsPage"/>
   	<Scene key = "live"       component = {LiveStreamPage}     title = "LiveStreamPage"/>
   	<Scene key = "songs"   	  component = {SongBookPage}       title = "SongBookPage"/>
   	<Scene key = "contacts"   component = {ContactBookPage}    title = "ContactBookPage"/>
   	<Scene key = "verse"      component = {VersePage}          title = "VersePage"/>
  </Scene>
);
