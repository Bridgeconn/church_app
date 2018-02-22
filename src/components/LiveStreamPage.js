import React, {Component} from 'react'
import {View,Text,TouchableOpacity,Image,ScrollView, Platform,StyleSheet} from 'react-native'
import {Header, Card, Title, Left,Button,Right,Icon,Body,Content,CardItem} from 'native-base'
import YouTube, {  YouTubeStandaloneIOS,  YouTubeStandaloneAndroid,} from 'react-native-youtube';
import Config from 'react-native-config'
import {liveStreamStyle} from '../style/styles.js'


export default class LiveStreamPage extends Component{
	constructor(props){
		super(props)
		console.log("prop videoId"+this.props.videoId)
		this.state = {
		    avatarSource: null,
		    videoSource: null,
		    duration: 0,
		    currentTime: 0,
		    fullscreen: true,
	  	}
	  	
	}
	
	render(){
		return(
			<View style={{backgroungColor:"#000"}}>
		 			<YouTube
		          ref={component => {
		            this._youTubeRef = component;
		          }}
		          apiKey="AIzaSyBsUeJYvXWnxUDhd0GX03D5jknGPaV41Tw"
		          videoId={this.props.videoId}
		          play={this.state.isVideoPlaying}
		          loop={this.state.isLooping}
		          fullscreen={true}
		          controls={1}
		          style={liveStreamStyle.liveStreamVideo}
		          onError={e => this.setState({ error: e.error })}
		          onReady={e => this.setState({ isReady: true })}
		          onChangeState={e => this.setState({ status: e.state })}
		          onChangeQuality={e => this.setState({ quality: e.quality })}
		          onProgress={
		            Platform.OS === 'ios'
		              ? e =>
		                  this.setState({
		                    duration: e.duration,
		                    currentTime: e.currentTime,
		                  })
		              : undefined
		          }
        		/>
        	</View>
			)
	}
	
} 

