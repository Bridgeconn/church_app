import React, {Component} from 'react'
import {Text,View,Image,TouchableOpacity,TouchableHighlight, Animated,Dimensions,Button,Linking} from 'react-native';
import {List, ListItem,Header,Left,Title,Right}  from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MapView from 'react-native-maps'
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import {Actions} from 'react-native-router-flux'
import styles from '../style/styles.js'
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
            event_time_end:this.props.event_time_end

        }
  }
  redirectToMap() {
    Linking.canOpenURL("google.navigation:q=American Century Investments&mode=").then(supported => {
        if (supported) {
            Linking.openURL("google.navigation:q=American Century Investments&mode=");
        } else {
            console.log('Don\'t know how to go');
        }
    }).catch(err => console.error('An error occurred', err));
}


  addToCalendar(title, startDateUTC, endDateUTC) {
  const eventConfig = {
    title,
    startDate: this.prettyTime(new Date(startDateUTC)),
    endDate: this.prettyTime(new Date(endDateUTC))
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


  getTimezone(date) {
    var offset = date.getTimezoneOffset();
    var minutes = Math.abs(offset);
    var hours = Math.floor(minutes / 60);
    var prefix = offset < 0 ? "+" : "-";
    var formatHours, formatMin;
    console.log("time=" + hours + "  min=" + minutes)
    if (hours < 10) {
      formatHours = '0' + hours;
    } else {
      formatHours = '' + hours;
    }
    minutes = minutes%60;
    if (minutes < 10) {
      formatMin = '0' + minutes;
    } else {
      formatMin = '' + minutes;
    }

    return prefix+formatHours+''+formatMin;
}


  prettyTime(date) {
var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            var hours, minutes, seconds, milliseconds, ampm, dateofMonth, month;

            // eg. 5 Nov 12, 1:37pm
            
            if (date.getMonth() < 9) {
                month = '0' + (date.getMonth()+1);
            } else {
                month = '' + (date.getMonth()+1);
            }

            if (date.getDate() < 10) {
                dateofMonth = '0' + date.getDate();
            } else {
                dateofMonth = '' + date.getDate();
            }


            if (date.getHours() < 10) {
                hours = '0' + date.getHours();
            } else {
                hours = '' + date.getHours();
            }

            if (date.getMinutes() < 10) {
                minutes = '0' + date.getMinutes();
            } else {
                minutes = '' + date.getMinutes();
            }

            if (date.getSeconds() < 10) {
                seconds = '0' + date.getSeconds();
            } else {
                seconds = '' + date.getSeconds();
            }

            if (date.getMilliseconds() < 10) {
                milliseconds = '00' + date.getMilliseconds();
            } else if (date.getMilliseconds() < 100) {
              milliseconds = '0' + date.getMilliseconds();
            } else {
                milliseconds = '' + date.getMilliseconds();
            }            

            if (date.getHours() > 11) {
                ampm = 'pm';
            } else {
                ampm = 'am';
            }

            var day = this.props.includeDay ? DAYS[date.getDay()] + ', ' : '';

            switch (this.props.format) {
                case 'date':
                    return '' + day + date.getDate() + ' ' + MONTHS[date.getMonth()] + ' ' + date.getFullYear();
                
                case 'time':
                    return hours + ':' + minutes + ampm;
                
                case 'full':
                  return '' + day + date.getDate() + ' ' + MONTHS[date.getMonth()] + ' ' + date.getFullYear() + ', ' + hours + ':' + minutes + ampm;
                
                default:
                  return '' + date.getFullYear() + '-' + month + '-' + 
                    dateofMonth + 'T' +  
                    hours + ':' + minutes + ':' + seconds + '.'+ milliseconds+
                    this.getTimezone(date);
            }
        }

  render(){
    return (
      <View style={styles.container}>
      <Image source={{uri:this.props.event_poster}} style={styles.eventDetailImage}/>
        <Text style={styles.eventData}>
          Event Name: {this.props.event_name}</Text>
        <Text  style={styles.eventData}>
          Start Time: {this.prettyTime(new Date(this.state.event_time_start))}
        </Text>
        <Text  style={styles.eventData}>
          End Time: {this.prettyTime(new Date(this.state.event_time_end))} 
        </Text>
        <TouchableOpacity onPress={() => {
            this.addToCalendar(
              this.state.title, 
              this.state.event_time_start, 
              this.state.event_time_end
              );
          }}>
        <Text style={styles.eventCalendar}>Add To Calendar</Text>
        </TouchableOpacity>
       <View>
        <MapView 
          style={ styles.EventMap }
          mapType={"standard"}
          region={this.state.region}
          zoomEnabled={true}
          scrollEnabled={true}
          showsScale={true}
          onPress={this.redirectToMap}
        >
        <MapView.Marker
          coordinate={{latitude: this.props.venue_latitude,
          longitude: this.props.venue_longitude}}
        />
        </MapView>
       </View>
      
      </View>
      )
    }
  }

 
