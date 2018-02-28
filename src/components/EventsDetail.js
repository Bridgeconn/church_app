
import React, {Component} from 'react'
import {Text,View,Image,TouchableOpacity,TouchableHighlight, Animated,Dimensions,Button,Linking,Platform,ActivityIndicator,ScrollView,StyleSheet} from 'react-native';
import {List, ListItem,Header,Left,Title,Right}  from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MapView from 'react-native-maps'
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import {Actions} from 'react-native-router-flux'
import {eventDetailStyle} from '../style/styles.js'
import moment from 'moment';

const utcDateToLocalString = (momentInUTC: moment): string => {
  return moment(momentInUTC).local().format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
};


export default class EventsDetail extends Component{
  constructor(props){
    super(props)
    console.log("props" +this.props.title)
    this.state = {
            title:this.props.title,
            region:{
            latitude:this.props.venue_latitude,
            longitude: this.props.venue_longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
            },
            event_time_start:this.props.event_time_start,
            event_time_end:this.props.event_time_end,
            event_topic:this.props.event_topic,
            event_speaker:this.props.event_speaker

        }
  }

 openGps = (latitude,longitude) =>{
      // var scheme = Platform.android === 'ios' ? 'http://maps.apple.com/?ll=' : 'geo:'
      var url = 'https://www.google.com/maps/search/?api=1&query='+latitude+','+longitude;
      this.openExternalApp(url)
    }
  
  openGpsFromName = (venue) =>{
      // var scheme = Platform.android === 'ios' ? 'http://maps.apple.com/?ll=' : 'geo:'
      var url = 'https://www.google.com/maps/search/?api=1&query='+venue;
      this.openExternalApp(url)
    }

  openExternalApp = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert(
          'ERROR',
          'Unable to open: ' + url,
          [
            {text: 'OK'},
          ]
        );
      }
    });
  }

  addToCalendar(title, startDateUTC: string,endDateUTC:string ) {
    const eventConfig = {
      title,
      startDate: utcDateToLocalString(1507631844000),
      endDate:utcDateToLocalString(1507631844000),
    };

    AddCalendarEvent.presentNewCalendarEventDialog(eventConfig)
      .then(eventId => {
        //handle success (receives event id) or dismissing the modal (receives false)
        if (eventId) {
          console.warn(eventId);
        } else {
          console.warn('dismissed');
        }
      })
      .catch((error: string) => {
        // handle error such as when user rejected permissions
        console.warn(error);
      });
  }

  render(){
    return (
      
      <View style={eventDetailStyle.flexOne}>
      <ScrollView>
        <Image source={{uri:this.props.event_poster}} style={eventDetailStyle.eventDetailImage}/>
        <Text  style={eventDetailStyle.eventData}><Icon name="map-marker" size={24}/> {this.state.event_topic}</Text>
        <Text  style={eventDetailStyle.eventData}><Icon name="microphone-variant" size={24}/> {this.state.event_speaker}</Text>
        <Text style={eventDetailStyle.eventData}><Icon name="clock" size={24}/> {this.state.event_time_start}</Text> 
        <View style={eventDetailStyle.centerView}>
            <View style={{alignItems:"center"}} >
              <Icon name="calendar-clock" size={36} color="#3F51B5" style={eventDetailStyle.calendarMargin} onPress={() => {
                  this.addToCalendar(
                    this.state.title, 
                    this.state.event_time_start,
                    this.state.event_time_end 
                    );
                }}/>
                <Text style={eventDetailStyle.iconTitle}>Add to calender</Text>
            </View>
            <View style={{alignItems:"center"}}>
              <Icon name="navigation" 
                onPress={this.openGpsFromName.bind(this, this.props.event_topic)} 
                size={36}  color="#3F51B5" style={eventDetailStyle.calendarMargin}/>
              <Text style={eventDetailStyle.iconTitle}>Go to map</Text>
            </View>
          </View>
          
         <View>
          <MapView 
            style={ eventDetailStyle.eventMap }
            mapType={"standard"}
            region={this.state.region}
            zoomEnabled={true}
            scrollEnabled={true} 
          >
            <MapView.Marker
              coordinate={{
                latitude: this.props.venue_latitude,
                longitude: this.props.venue_longitude
              }}
            />
          </MapView>

        </View>
      </ScrollView>
      </View>
   
      )
    }
  }