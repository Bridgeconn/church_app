import React, {Component} from 'react'
import {View,Text,ScrollView,TouchableOpacity,Image,Dimensions,ActivityIndicator, AsyncStorage,RefreshControl} from 'react-native';
import {Card,CardItem,Content} from 'native-base'
import {Actions} from 'react-native-router-flux'
import eventsList from './eventListDummy.json'
import styles from '../style/styles.js'
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios';
import Config from 'react-native-config'
import * as AsyncStorageConstants from './AsyncStorageConstants';

export default class EventsPage extends Component{

 constructor(props){
        super(props)
        console.log('props value of token on event page '+this.props.tokenValue)
        this.state = {
          tokenValue: this.props.tokenValue,
          data: [],
          isloading:false,
          isRefreshing:false
        }
    }

    fetchEventsData(){
      this.setState({isloading:true})
      const config = { headers: {'Church-App-Id': Config.CHURCH_APP_ID, 'AUTH-TOKEN':this.state.tokenValue} }
      axios.defaults.headers.get[Config.HEADER_KEY_CONTENT_TYPE] = Config.CONTENT_TYPE;
      axios.get(Config.BASE_API_URL + Config.EVENTS_API_URL, config)
        .then((response) => { 
       console.log("response "+JSON.stringify(response.data.events))
       this.setState({data:response.data.events})
       this.setState({isloading:false,isRefreshing:false})
     })
      .catch((error) => { 
        console.log("something went wrong")
       this.setState({isloading:false,isRefreshing:false})
     })
    }

     onRefreshFunction(){
        // if(this.state.isloading){
        //   return
        // }
        this.setState({isRefreshing:true})
        this.fetchEventsData()
      }
   componentDidMount() {
        // this.setState({tokenValue:auth_token})
        this.fetchEventsData();
  }

    render() {
      let data = this.state.data;
      // console.log("render "+data)
      // if (this.state.showProgress) {
      //   return(
      //   <View style={{flex:1,justifyContent:"center"}}>
      //     <ActivityIndicator animating={this.state.isRefreshing ? false : true} style={{alignItems:"center"}} color="#3F51B5" size="large"/>
      //   </View>
      // )
      // }
          return (  
           <View style={styles.container}>
              <ScrollView 
              // contentContainerStyle={styles.container}
              showsVerticalScrollIndicator={false}
              refreshControl={
                    <RefreshControl
                        onRefresh={() => this.onRefreshFunction()}
                        refreshing={this.state.isRefreshing}
                    />
                }
              >

              {this.state.isLoading ? 
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                  <ActivityIndicator size={"large"} animating={ this.state.isRefreshing ? false :true } color="#3F51B5"/>
                </View> : 
                  (this.state.data.length == 0) ? 
                    <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                      <Icon name="signal-wifi-off" size={48}/><Text>There is no internet connection</Text>
                    </View>
                    :
                    data.map(item =>
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





              