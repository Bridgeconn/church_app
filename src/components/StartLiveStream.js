import React, {Component} from 'react'
import {View,Text,TouchableOpacity,Image,ScrollView, Platform,} from 'react-native'
import {Header, Card, Title, Left,Button,Right,Icon,Body,Content,CardItem} from 'native-base'
import {Actions} from 'react-native-router-flux'
import styles from '../style/styles.js'
import Config from 'react-native-config'
import axios from 'axios';
let SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'church_app_new.db', location: 'default'})

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
       console.log("response versePage "+JSON.stringify(response.data.video_list))
       this.setState({liveStreamData:response.data.video_list})

	})
	}
	componentDidMount(){
		this.fetchLiveStream()
	}
	render(){
		// console.log("url  live "+this.state.liveStreamData[0].url)
		return(
		<View style={styles.container}>
            <ScrollView>
              	<Content>
              	{
              		this.state.liveStreamData.map(item =>
              			<Card key={item.added_date}>
	              		<CardItem>
	              			<TouchableOpacity onPress={() =>{Actions.live({url:item.url})}} style={{flexDirection:"row"}}>
	              				<Text style={styles.tabTextSize}>{item.title}</Text>   
	              			</TouchableOpacity>
	              		</CardItem>
	              	</Card>
              		)
              	}
	              	
              	</Content>        
            </ScrollView>
          </View>

			)


	}


	
} 

