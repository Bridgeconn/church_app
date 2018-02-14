import React, {Component} from 'react'
import {View,Text,TouchableOpacity,Image,ScrollView, Platform,RefreshControl,StyleSheet} from 'react-native'
import {Header, Card, Title, Left,Button,Right,Body,Content,CardItem} from 'native-base'
import {Actions} from 'react-native-router-flux'
import {homeTab as homeTab} from '../style/style2.js'
import Config from 'react-native-config'
import Icon from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios';
import Timestamp from 'react-timestamp'
let SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'church_app_new.db', location: 'default'})
const tabStyle = StyleSheet.create(homeTab)
export default class LiveStreamPage extends Component{
	constructor(props){
		super(props)
		console.log("key on start live"+this.props.tokenValue)
		this.state = {
			liveStreamData : [] 
		}
	}

	fetchLiveStream(){
	console.log("on vesre start page")
	const config = { headers: {'Church-App-Id': Config.CHURCH_APP_ID, 'AUTH-TOKEN':this.props.tokenValue} }
      axios.defaults.headers.get[Config.HEADER_KEY_CONTENT_TYPE] = Config.CONTENT_TYPE;
      axios.get(Config.BASE_API_URL + Config.GET_VIDEO_API_URL, config)
        .then((response) => { 
       console.log("response livestream ...."+JSON.stringify(response))
       this.setState({liveStreamData:response.data.video_list})

	})
	}
	componentDidMount(){
		this.fetchLiveStream()
	}
	render(){
		// console.log("url  live "+this.state.liveStreamData[0].url)
		return(
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
                  <ActivityIndicator size={"large"} animating={ this.state.isRefreshing ? false:true } style={tabStyle.alignItemsloader} color="#3F51B5"/>
                  </View>
                  : 
                  (this.state.liveStreamData == null) ? 
                  <View  style={tabStyle.centerView}>
                      <Icon name="signal-wifi-off" size={48}/><Text>There is no Internet Connection</Text>
                    </View>
                    :
                  (this.state.liveStreamData.length == 0) ? 
                    <View  style={tabStyle.centerView}>
                      <Icon name="signal-wifi-off" size={48}/><Text>No liveStream  Found</Text>
                    </View>
                    :
                    <View  style={tabStyle.tabBounderyMargin}>
                   { this.state.liveStreamData.map(item =>
                        <Content key={item.name}>
                        <TouchableOpacity 
                        onPress={()=>{
                          Actions.live({
                            title:item.name, 
                          })
                        }}>
                          <Card  style={tabStyle.flexRow}>
                            <CardItem style={tabStyle.flexColContent}>
                              <Text style={tabStyle.tabContentText}>{item.title}</Text>
                               <Timestamp time={item.added_date} utc={false} component={Text} format='ago' style={{fontSize:16,alignSelf:"flex-start"}}/>
                            </CardItem>
                            <CardItem>                              
                                <Icon name="live-tv" size={60} color={'#cc181e'} />
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

