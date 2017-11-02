
import React, {Component} from 'react'
import {View,Text,ScrollView,TouchableHighlight,Image,Dimensions,ActivityIndicator} from 'react-native';
import {ListItem,List} from 'native-base'
import {Actions} from 'react-native-router-flux'
import eventsList from './eventListDummy.json'
import styles from '../style/styles.js'

export default class EventsPage extends Component{

 constructor(){
        super()
        this.state ={
            data: [],
             loading:true,  
          }
          this.getData =this.getData.bind(this);
    }

    getData(){

      const data = eventsList.events
      this.setState({data: data})  
      console.log("data"+data)
    }
  componentDidMount() {
  this.getData();
  }
  
    render() {
      let data = this.state.data;
      console.log("render "+data.events)
          return (  <ScrollView>
                    <View style={styles.eventContainer}>
                       {data.map(item =>
                        <List key={item.event_name}>
                        <ListItem  style={{borderBottomWidth: 0}}>
                          <Text style={{fontSize:20,marginLeft:8}}>{item.event_name}</Text></ListItem>
                        <ListItem  style={{borderBottomWidth: 0}}>
                          <TouchableHighlight onPress={()=>{Actions.eventsDetails({title:item.event_name, event_name:item.event_name,event_time_start:item.event_time_start,event_time_end:item.event_time_end,event_poster:item.event_poster_url,venue_latitude:item.venue_latitude,venue_longitude:item.venue_longitude,event_speaker:item.event_speaker,event_topic:item.event_topic})}}>
                            <Image source={{uri:item.event_poster_url}} style={styles.eventImage} onLoadEnd={ ()=>{ this.setState({ loading: false }) }}><ActivityIndicator animating={ this.state.loading } style={{flex:1,justifyContent:'center',alignItems:'center',alignSelf:'center'}}/></Image>
                          </TouchableHighlight>
                        </ListItem>
                        </List>
                        )}
                    </View>
                    </ScrollView>
                
                )
                                                                                                                                                                                                                                       
}
}

