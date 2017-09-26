import React, {Component} from 'react'
import {StyleSheet,Text,View,Image,TouchableOpacity,TouchableHighlight, Animated,Dimensions} from 'react-native';
import {List, ListItem}  from 'native-base'
import MapView from 'react-native-maps';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class EventsDetail extends Component{
  constructor(props){
    super(props)
    this.state = {
            region:{
            latitude:this.props.venue_latitude,
            longitude: this.props.venue_longitude,
            latitudeDelta: 10,
            longitudeDelta: 5
            }
        }
  }
  render(){

    return (
      <View style={styles.container}>
      <Image source={{uri:this.props.event_poster}} style={styles.image}/>
       <Text>{this.props.event_name}</Text>
       <Text>{this.props.event_time_start}</Text>
       <Text>{this.props.event_time_end}</Text>
       <View>
        <MapView 
          style={ styles.map }
          mapType={"standard"}
          region={this.state.region}
          zoomEnabled={true}
          scrollEnabled={true}
          showsScale={true}
        >
        <MapView.Marker
          coordinate={{latitude: this.props.venue_latitude,
          longitude: this.props.venue_longitude}}
          title={"New Delhi"}
          description={"Heart Of India"}
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
    justifyContent:"flex-start",
    alignItems:"flex-start",
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
  
