
import React, {Component} from 'react'
import {View,StyleSheet,Text,ScrollView,TouchableHighlight,Image,Dimensions} from 'react-native';
import {ListItem,List} from 'native-base'
import {Actions} from 'react-native-router-flux'
import Panel from './EventsAccordion';
import eventsList from './eventListDummy.json'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class EventsPage extends Component{

 constructor(){
        super()
        this.state ={
            data: []   
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
  this.props.onRefTitleChange(this)
  }
  componentWillUnmount() {
    this.props.onRefTitleChange(null)
  }
    render() {
      let data = this.state.data;
      console.log("render "+data.events)
          return (  <ScrollView>
                    <View style={styles.container}>
                       {data.map(item =>
                        <List key={item.event_name}>
                        <ListItem  style={{borderBottomWidth: 0}}>
                          <Text style={{fontSize:20}}>{item.event_name}</Text></ListItem>
                        <ListItem  style={{borderBottomWidth: 0}}>
                          <TouchableHighlight onPress={()=>{Actions.eventsDetails({event_name:item.event_name,event_time_start:item.event_time_start,event_time_end:item.event_time_end,event_poster:item.event_poster_url,venue_latitude:item.venue_latitude,venue_longitude:item.venue_longitude})}}>
                            <Image source={{uri:item.event_poster_url}} style={styles.image}/>
                          </TouchableHighlight>
                        </ListItem>
                        </List>
                        )}
                    </View>
                    </ScrollView>
                
                )

                                                                                                                                                                                                                                          
}
}

var styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent:"center",
    alignItems:"center",
  },
  image:{
    width:width,
    height:height*0.33
  },
})
  
