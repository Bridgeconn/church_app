import React, {Component} from 'react'
import {View,Text,TouchableOpacity,Image,ScrollView, Platform,} from 'react-native'
import {Header, Card, Title, Left,Button,Right,Icon,Body} from 'native-base'

import Sound from 'react-native-sound';	
import styles from '../style/styles.js'

export default class SongBookPage extends Component{
	constructor(){
		super()
		this.state = {
	      	isSongPlaying: false,
	      	songLength: 0,
	      	interval: null,
	     	

	  	};
	  	this.playSong = this.playSong.bind(this);
  		this.tick = this.tick.bind(this);
	}
	

  
	playSong() {
	   this.state.song.play();
	    this.setState({
	      isSongPlaying: !this.state.isSongPlaying
	    })
	    if(this.state.isSongPlaying == false){
	    	this.state.song.pause();
	    	this.setState({
	      	isSongPlaying: !this.state.isSongPlaying
	    })
	    }
	    
	    
	}

	
  	
  	tick() {
    this.state.song.getCurrentTime((seconds) => {
      this.setState({
        currentTime: seconds
      })
    })
  	}
   	componentWillMount() {
    var song = new Sound('frog.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        this.setState({
          error:error.message
        })
      } else { // loaded successfully
        console.log('duration in seconds: ' + song.getDuration() +
            'number of channels: ' + song.getNumberOfChannels());
        this.setState({
          volume: .5,
          song: song,
          isSongPlaying: false,
          songLength: song.getDuration(),
          currentTime: 0,
          interval: null,
          error: null
        })
      }
    })
  }
     
  

	render(){
		return(
			<ScrollView>
				    
		 		<View style={styles.eventsView}>
		 		<Right>
		 			<TouchableOpacity onPress={this.playSong}>{this.state.isSongPlaying ? <Icon name="ios-play"/> : <Icon name="ios-pause" />}</TouchableOpacity> 
		 		</Right>
		 		</View>
			</ScrollView>
			)
	}
} 

