
// import React, {Component} from 'react'
// import {View,Text,ScrollView,TouchableOpacity,Image,Dimensions,ActivityIndicator} from 'react-native';
// import {Card,CardItem,Content} from 'native-base'
// import {Actions} from 'react-native-router-flux'
// import eventsList from './eventListDummy.json'
// import styles from '../style/styles.js'
// import moment from 'moment';

// export default class EventsPage extends Component{

//  constructor(){
//         super()
//         this.state ={
//             data: [],
//              loading:true,  
//           }
//           this.getData =this.getData.bind(this);
//     }

//     getData(){

//       const data = eventsList.events
//       this.setState({data: data})  
//       console.log("data"+data)
//     }
//   componentDidMount() {
//   this.getData();
//   }
  
//     render() {
//       let data = this.state.data;
//       console.log("render "+data.events)
//           return (  
//             <View style={styles.container}>
//               <ScrollView>
//                        {data.map(item =>
//                         <Content key={item.event_name}>
//                         <TouchableOpacity onPress={()=>{Actions.eventsDetails({title:item.event_name, event_name:item.event_name,event_time_start:item.event_time_start,event_time_end:item.event_time_end,event_poster:item.event_poster_url,venue_latitude:item.venue_latitude,venue_longitude:item.venue_longitude,event_speaker:item.event_speaker,event_topic:item.event_topic})}}>
//                           <Card key={item.id} style={{flexDirection:'row',justifyContent: 'space-between',}}>
//                             <CardItem style={{flexDirection:'column'}}>
//                               <Text style={styles.tabTextSize}>{item.event_name}</Text>
//                              <Text style={styles.tabTextSize}>{moment.utc(item.event_time_start).local().format('lll')}</Text> 
//                             </CardItem>
//                             <CardItem>                              
//                                 <Image source={{uri:item.event_poster_url}} style={styles.eventImage} onLoadEnd={ ()=>{ this.setState({ loading: false }) }}><ActivityIndicator animating={ this.state.loading } style={{flex:1,justifyContent:'center',alignItems:'center',alignSelf:'center'}}/></Image>
//                             </CardItem>
//                           </Card>
//                         </TouchableOpacity>
//                         </Content>
//                         )}     
//               </ScrollView>
//             </View>    
//                 )
                                                                                                                                                                                                                                       
// }
// }


import React, {Component} from 'react'
import {View,Text,ScrollView,TouchableOpacity,Image,Dimensions,ActivityIndicator, AsyncStorage} from 'react-native';
import {Card,CardItem,Content} from 'native-base'
import {Actions} from 'react-native-router-flux'
import eventsList from './eventListDummy.json'
import styles from '../style/styles.js'
import moment from 'moment';
import axios from 'axios';
import Config from 'react-native-config'
import Spinner from 'react-native-loading-spinner-overlay';
export default class EventsPage extends Component{

 constructor(props){
        super(props)
        console.log('props value of token on event page '+this.props.tokenValue)
        this.state = {
          tokenValue: this.props.tokenValue,
          data: [],
          showProgress:true
        }
    }

    DataEvents(){
      this.setState({showProgress:true})
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
        })      
    }

  async componentDidMount() {
    this.setState({showProgress:true})
    await AsyncStorage.getItem('token').then((auth_token) => {
      console.log('token1 '+auth_token)
      if (auth_token !== null) {
        this.setState({tokenValue:auth_token})
        this.DataEvents();
        this.setState({showProgress:false})
      }
    })
  }

    render() {
      let data = this.state.data;
      console.log("render "+data)
      if (data.length == 0) {
       <Spinner visible={this.state.showProgress} size={"large"} color={"#3F51B5"} style={styles.spinnerCustom}/>
      }
          return (  
            <View style={styles.container}>
             <Spinner visible={this.state.showProgress} size={"large"} color={"#3F51B5"} style={styles.spinnerCustom}/>
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
                                  style={{flex:1,justifyContent:'center',alignItems:'center',alignSelf:'center'}}/>
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

