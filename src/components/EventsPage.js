import React, {Component} from 'react'
import {View,Text,ScrollView,TouchableOpacity,Image,Dimensions,ActivityIndicator, AsyncStorage} from 'react-native';
import {Card,CardItem,Content} from 'native-base'
import {Actions} from 'react-native-router-flux'
import eventsList from './eventListDummy.json'
import styles from '../style/styles.js'
import moment from 'moment';
import axios from 'axios';
import Config from 'react-native-config'
export default class EventsPage extends Component{

 constructor(props){
        super(props)
        console.log('props value of token on event page '+this.props.tokenValue)
        this.state = {
          tokenValue: this.props.tokenValue,
          data: [],
          showProgress:false
        }
    }

    DataEvents(){
      const config = { headers: {'Church-App-Id': Config.CHURCH_APP_ID, 'AUTH-TOKEN':this.state.tokenValue} }
      axios.defaults.headers.get[Config.HEADER_KEY_CONTENT_TYPE] = Config.CONTENT_TYPE;
      axios.get(Config.BASE_API_URL + Config.EVENTS_API_URL, config)
        .then((response) => { 
       console.log("response "+JSON.stringify(response.data.events))
       this.setState({data:response.data.events})
       this.setState({showProgress:false})
     })
     .catch(function (error) {
          console.log(error)
          console.log("something went wrong")
          alert('Some error occurred. Please try again later'); 
          this.setState({showProgress:false})
        })      
    }

  async componentDidMount() {
    await AsyncStorage.getItem('token').then((auth_token) => {
      console.log('token1 '+auth_token)
      if (auth_token !== null) {
        this.setState({tokenValue:auth_token})
        this.setState({showProgress:true})
        this.DataEvents();
      }
    })
  }

    render() {
      let data = this.state.data;
      console.log("render "+data)
      if (this.state.showProgress) {
        return(
           <View style={{flex:1,justifyContent:"center"}}>
       <ActivityIndicator animating={true} style={{alignItems:"center"}} color="#3F51B5" size="large"/>
        </View>
      )
      }
          return (  
            <View style={styles.container}>
              <ScrollView>
                       {data.map(item =>
                        <Content key={item.name}>
                        <TouchableOpacity 
                        onPress={()=>{
                          Actions.eventsDetails({
                            title:item.name, 
                            event_name:item.name,
                            event_time_start:item.start_date,
                            event_time_end:item.end_date,
                            event_poster:'http://www.mannaexpressonline.com/wp-content/uploads/2014/09/early-morning-prayer_edited.jpg',
                            venue_latitude:28.244197,
                            venue_longitude:76.968456,
                            event_speaker:item.speaker_name,
                            event_topic:item.event_venue_name
                          })
                        }}>
                          <Card style={{flexDirection:'row'}}>
                            <CardItem style={{flexDirection:'column'}}>
                              <Text style={styles.tabTextSize}>{item.name}</Text>
                              <Text style={styles.tabTextSize}>
                                {item.start_date}
                             </Text> 
                            </CardItem>
                            <CardItem>                              
                                <Image 
                                  source={{uri:'http://www.mannaexpressonline.com/wp-content/uploads/2014/09/early-morning-prayer_edited.jpg'}} 
                                  style={styles.eventImage} 
                                  onLoadEnd={ ()=>{ this.setState({ loading: false }) }}>
                                  <ActivityIndicator animating={ this.state.loading } 
                                  />
                                </Image>
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

