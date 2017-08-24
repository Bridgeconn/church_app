import React, {Component} from 'react'
import {View,Text,TouchableOpacity,Image,ScrollView, Platform,} from 'react-native'
import {Header, Card, Title, Left,Button,Right,Icon,Body} from 'native-base'
import YouTube, {  YouTubeStandaloneIOS,  YouTubeStandaloneAndroid,} from 'react-native-youtube';
import styles from '../style/styles.js'


export default class LiveStreamPage extends Component{
	constructor(){
		super()
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
			<ScrollView>
				<Header>
		          <Left>
		           <Title>Church App</Title>
		          </Left>
		          <Right>
		            <Button>
		              <Icon name="settings" />
		            </Button>
		          </Right>
		        </Header>
		 		<View style={styles.eventsView}>
		 			<YouTube
		          ref={component => {
		            this._youTubeRef = component;
		          }}
		          apiKey="AIzaSyBsUeJYvXWnxUDhd0GX03D5jknGPaV41Tw"
		          videoId="EKyirtVHsK0"
		          play={this.state.isVideoPlaying}
		          loop={this.state.isLooping}
		          fullscreen={this.state.fullscreen}
		          controls={1}
		          style={styles.player}
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
			          	<View style={styles.buttonGroup}>
			            <TouchableOpacity
			              style={styles.button}
			              onPress={() => this.setState({ fullscreen: true })}
			            >
			             <Text style={styles.buttonText}>Set Fullscreen</Text>
			            </TouchableOpacity>
			          	</View>}
		 		</View>
			</ScrollView>
			)
	}
} 

