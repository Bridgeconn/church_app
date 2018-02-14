import React, {Component} from 'react'
import {View,Text,TouchableOpacity,Image,ScrollView, Platform,StyleSheet} from 'react-native'
import {Header, Card, Title, Left,Button,Right,Icon,Body,Content,CardItem} from 'native-base'
import YouTube, {  YouTubeStandaloneIOS,  YouTubeStandaloneAndroid,} from 'react-native-youtube';
import Config from 'react-native-config'
import {liveStream as liveStream} from '../style/style2.js'

const liveStreamStyle = StyleSheet.create(liveStream)

export default class LiveStreamPage extends Component{
	constructor(props){
		super(props)
		
		this.state = {
		    avatarSource: null,
		    videoSource: null,
		    setImage:'',
		    isReady: false,
		    status: null,
		    quality: null,
		    error: null,
		    isLooping: true,
		    duration: 0,
		    currentTime: 0,
		    fullscreen: false,
		    volume: .5,
	      	isVideoPlaying: false,
	  	};
	  	
	}
	
	render(){
		return(
		<View style={liveStreamStyle.container}>
			<ScrollView>
			<Content>
			<Card>
		 		<View style={liveStreamStyle.liveStreamView}>
		 			<YouTube
		          ref={component => {
		            this._youTubeRef = component;
		          }}
		          apiKey="AIzaSyBsUeJYvXWnxUDhd0GX03D5jknGPaV41Tw"
		          videoId={this.props.watchId}
		          play={this.state.isVideoPlaying}
		          loop={this.state.isLooping}
		          fullscreen={this.state.fullscreen}
		          controls={1}
		          style={liveStreamStyle.liveStreamVideo}
		          onError={e => this.setState({ error: e.error })}
		          onReady={e => this.setState({ isReady: true })}
		          onChangeState={e => this.setState({ status: e.state })}
		          onChangeQuality={e => this.setState({ quality: e.quality })}
		          onChangeFullscreen={e =>
		            this.setState({ fullscreen: e.isFullscreen })}
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
        			{!this.state.fullscreen &&
			          	<View>
			            <TouchableOpacity
			              style={liveStreamStyle.button}
			              onPress={() => this.setState({ fullscreen: true })}
			            >
			             <Text style={liveStreamStyle.buttonText}>Set Fullscreen</Text>
			            </TouchableOpacity>
			          	</View>}
		 		</View>
		 		
		 		</Card>
		 		<Card>
				
		 		</Card>
		 	</Content>
			
			</ScrollView>
		</View>
			)
	}
	
} 

