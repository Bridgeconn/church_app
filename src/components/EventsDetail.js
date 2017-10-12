import React, {Component} from 'react'
import {StyleSheet,Text,View,Image,TouchableOpacity,TouchableHighlight, Animated,Dimensions,Button} from 'react-native';
import {List, ListItem,Header,Left,Title,Right}  from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MapView from 'react-native-maps'
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import {Actions} from 'react-native-router-flux'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

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
            event_time_end:this.props.event_time_end

        }
  }
  
  static addToCalendar = (title: string, startDateUTC: moment, endDateUTC: moment) => {
  const eventConfig = {
    title,
    startDate: utcDateToLocalString(startDateUTC),
    endDate: utcDateToLocalString(endDateUTC)
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
    const nowUTC = moment.utc();
    console.log("notNOWWW UTC "+nowUTC)
    return (
      <View style={styles.container}>
      <Image source={{uri:this.props.event_poster}} style={styles.image}/>
       <Text style={{fontSize:16}}>{this.props.event_name}</Text>
       <Text  style={{fontSize:16}}>{this.props.event_time_start}</Text>
       <Text  style={{fontSize:16}}>{this.props.event_time_end}</Text>
        <TouchableOpacity onPress={() => {
            EventsDetail.addToCalendar(this.state.title, this.state.event_time_start, this.state.event_time_end);
          }}>
        <Text style={{fontSize:20,fontWeight:"700",color:"#3F51B5"}}>Add To Calendar</Text>
        </TouchableOpacity>
       <View>
        <MapView 
          style={ styles.map }
          mapType={"standard"}
          region={this.state.region}
          zoomEnabled={true}
          scrollEnabled={true}
          showsScale={true}
          onPress={this.handleGetDirections}
          title="getDirections"
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

  var styles = StyleSheet.create({
  container: {
    flex : 1,
  },
  image:{
    width:width,
    height:height*0.40,
  },
  map: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  height:height*0.35,
  width:width
},
  containerMaps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
    flex: 1,
    alignItems: 'center'
  },
})
  
