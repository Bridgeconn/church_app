
import React, {Component} from 'react'
import {View,Text,ScrollView,TouchableOpacity,Image,Dimensions,ActivityIndicator} from 'react-native';
import {Card,CardItem,Content} from 'native-base'
import {Actions} from 'react-native-router-flux'
import eventsList from './eventListDummy.json'
import styles from '../style/styles.js'
import Timestamp from 'react-timestamp';
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
          return (  
            <View style={styles.container}>
              <ScrollView>
                       {data.map(item =>
                        <Content key={item.event_name}>
                        <TouchableOpacity onPress={()=>{Actions.eventsDetails({title:item.event_name, event_name:item.event_name,event_time_start:item.event_time_start,event_time_end:item.event_time_end,event_poster:item.event_poster_url,venue_latitude:item.venue_latitude,venue_longitude:item.venue_longitude,event_speaker:item.event_speaker,event_topic:item.event_topic})}}>
                          <Card key={item.id} style={{flexDirection:'row',justifyContent: 'space-between',}}>
                            <CardItem style={{flexDirection:'column'}}>
                              <Text>{item.event_name}</Text>
                              <Timestamp time={item.event_time_start} component={Text}  utc={true} format='full' />
                            </CardItem>
                            <CardItem>                              
                                <Image source={{uri:item.event_poster_url}} style={styles.eventImage} onLoadEnd={ ()=>{ this.setState({ loading: false }) }}><ActivityIndicator animating={ this.state.loading } style={{flex:1,justifyContent:'center',alignItems:'center',alignSelf:'center'}}/></Image>
                            </CardItem>
                          </Card>
                        </TouchableOpacity>
                        </Content>
                        )}     
              </ScrollView>
            </View>    
                )
                                                                                                                                                                                                                                       
}
}

