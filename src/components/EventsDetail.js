
import React, {Component} from 'react'
import {Text,View,Image,TouchableOpacity,TouchableHighlight, Animated,Dimensions,Button,Linking,Platform,ActivityIndicator,ScrollView} from 'react-native';
import {List, ListItem,Header,Left,Title,Right}  from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MapView from 'react-native-maps'
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import {Actions} from 'react-native-router-flux'
import styles from '../style/styles.js'
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
            latitudeDelta: 10,
            longitudeDelta: 5
            },
            event_time_start:this.props.event_time_start,
            event_time_end:this.props.event_time_end,
            event_topic:this.props.event_topic,
            event_speaker:this.props.event_speaker

        }
  }
 openGps(longitudeMap,latitudeMap){
      var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:'
      var url = scheme +longitudeMap+ ',' +latitudeMap
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
  addToCalendar(title, startDateUTC: moment,endDateUTC:moment ) {
  const eventConfig = {
    title,
    startDate: utcDateToLocalString(startDateUTC),
    endDate:utcDateToLocalString(endDateUTC),
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
      
      <View style={{flex:1}}>
      <ScrollView>
      <Image source={{uri:this.props.event_poster}} style={styles.eventDetailImage}/>
        
        <Text  style={styles.eventData}>Event Topic: {this.state.event_topic}</Text>
        <Text  style={styles.eventData}>Event Speaker: {this.state.event_speaker}</Text>
        <Text style={styles.eventData}>Start Date: {moment.utc(this.state.event_time_start).local().format('lll')}</Text> 
        <Text style={styles.eventData}>End Date: {moment.utc(this.state.event_time_end).local().format('lll')}</Text>
        <TouchableOpacity onPress={() => {
            this.addToCalendar(
              this.state.title, 
              this.state.event_time_start,
              this.state.event_time_end 
              );
          }}>
        <Text style={styles.eventCalendar}>Add event to calender <Icon name="calendar-plus" size={24}/></Text>
        </TouchableOpacity>
       <View>
        <MapView 
          style={ styles.EventMap }
          mapType={"standard"}
          region={this.state.region}
          zoomEnabled={true}
          scrollEnabled={true} 
          onPress={this.openGps.bind(this, this.props.venue_latitude , this.props.venue_longitude)}
        >
        <MapView.Marker
          coordinate={{latitude: this.props.venue_latitude,
          longitude: this.props.venue_longitude}}
        />
        </MapView>
        <View style={styles.mapTouchable}><Button onPress={this.openGps.bind(this, this.props.venue_latitude, this.props.venue_longitude)} title="directions" color="#3F51B5"/></View>
       </View>
      </ScrollView>
      </View>
   
      )
    }
  }

 