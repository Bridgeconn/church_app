import React, {Component} from 'react'
import {View,Text,ScrollView,TouchableOpacity,Image,Dimensions,ActivityIndicator, StyleSheet, AsyncStorage,RefreshControl,NetInfo} from 'react-native';
import {Card,CardItem,Content} from 'native-base'
import {Actions} from 'react-native-router-flux'
import {homeTab as homeTab} from '../style/style2.js'
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios';
import Config from 'react-native-config'
import * as AsyncStorageConstants from './AsyncStorageConstants';

const tabStyle = StyleSheet.create(homeTab)
export default class EventsPage extends Component{

 constructor(props){
        super(props)
        console.log('props value of token on event page '+this.props.tokenValue)
        this.state = {
          tokenValue: this.props.tokenValue,
          data: [],
          isLoading:false,
          isRefreshing:false
        }
    }

    fetchEventsData(){
      NetInfo.getConnectionInfo()
              .then((connectionInfo) => {
                switch(connectionInfo.type) {
                  case 'cellular': {
                  }
                  case 'wifi': {
                    this.setState({isLoading:true})
                      var url = Config.BASE_API_URL + Config.EVENTS_API_URL;
                      const config = { headers: {'Church-App-Id': Config.CHURCH_APP_ID, 'AUTH-TOKEN':this.state.tokenValue}}
                          axios.defaults.headers.get[Config.HEADER_KEY_CONTENT_TYPE] = Config.CONTENT_TYPE;
                          axios.get(url, config)
                        .then((response) => { 
                          console.log("hi i am in fetchEventsData ------")
                           console.log("response "+JSON.stringify(response))
                           if (response.data.success) {
                             this.setState({data:response.data.events})
                           } else {
                            this.setState({data: null})
                           }
                           this.setState({isLoading:false,isRefreshing:false})
                         })
                         .catch((error) =>{
                            console.log(error)
                            console.log("something went wrong")
                             this.setState({data:null, isLoading:false,isRefreshing:false})
                          })  
                          break;   
                        }
                    default : {
                    console.log("conenction none or unknoisw")
                    this.setState({isRefreshing:false})

                    break;
                  }
                  }
                })
      }

     onRefreshFunction(){
        if(this.state.isLoading){
          return
        }
        this.setState({isRefreshing:true})
        this.fetchEventsData()
      }
   componentDidMount() {
        // this.setState({tokenValue:auth_token})
        this.fetchEventsData();
  }

    render() {
          return (  
              <ScrollView 
              contentContainerStyle={tabStyle.scrollViewContainer}
              showsVerticalScrollIndicator={false}
              refreshControl={
                    <RefreshControl
                        onRefresh={() => this.onRefreshFunction()}
                        refreshing={this.state.isRefreshing}
                    />
                }
              >

              {this.state.isLoading ? 
                <View style={tabStyle.centerView}>
                  <ActivityIndicator size={"large"} animating={ this.state.isRefreshing ? false:true } color="#3F51B5"/>
                  </View>
                  : 
                  (this.state.data == null) ? 
                  <View  style={tabStyle.centerView}>
                      <Icon name="signal-wifi-off" size={48}/><Text>There is no Internet Connection</Text>
                    </View>
                    :
                  (this.state.data.length == 0) ? 
                    <View  style={tabStyle.centerView}>
                      <Icon name="signal-wifi-off" size={48}/><Text>No Events Found</Text>
                    </View>
                    :
                    <View style={tabStyle.tabBounderyMargin}>
                   { this.state.data.map(item =>
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
                          <Card style={tabStyle.flexRow}>
                            <CardItem style={tabStyle.flexCol}>
                              <Text style={tabStyle.tabContentText}>{item.name}</Text>
                              <Text style={tabStyle.tabContentText}>
                                {item.start_date}
                             </Text> 
                            </CardItem>
                            <CardItem>                              
                                <Image 
                                  source={{uri:'http://www.mannaexpressonline.com/wp-content/uploads/2014/09/early-morning-prayer_edited.jpg'}} 
                                  style={tabStyle.eventImage} 
                                  onLoadEnd={ ()=>{ this.setState({ loading: false }) }}>
                                  <ActivityIndicator animating={ this.state.loading } 
                                  />
                                </Image>
                            </CardItem>
                          </Card>
                        </TouchableOpacity>

                        </Content>
                        )
                    }
                    </View>
                    }
              </ScrollView>
              
                )
                                                                                                                                                                                                                                       
}
}





              