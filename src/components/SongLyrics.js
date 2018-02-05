import React, {Component} from 'react'
import {Text,View, ScrollView,AsyncStorage,Dimensions} from 'react-native';
import styles from '../style/styles.js'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Actions} from 'react-native-router-flux'
import Config from 'react-native-config'
import YouTube from 'react-native-youtube';

export default class EventsDetail extends Component{

  constructor(props){
    super(props);
    this.state={
      videoId: null,
      title:this.props.title,
      songLyrics:this.props.songLyrics,
      songId:this.props.songId,
      playVideo: false,
    }
  }

  componentWillReceiveProps(nextProps){
    console.log("nextProps "+nextProps.videoId)
    this.setState({playVideo: false})

    if(nextProps.videoId !==null){  
      this.setState({videoId:nextProps.videoId})
    }
  }
  componentDidMount(){
     AsyncStorage.getItem('song_id_' + this.props.songId).then((value)=>{
      console.log("videoId"+value)
      if (value !== null) {
       this.setState({videoId:value})
    }
     })
  }
  render(){
      return (
        <View style={styles.songLyricsContainer}>
        {this.state.videoId !==null && this.state.playVideo ?
            <View style={{flexDirection:"column"}}>
              <YouTube
                apiKey={Config.YOUTUBE_API_KEY}
                videoId={this.state.videoId}   // The YouTube video ID
                play={true}             // control playback of video with true/false
                fullscreen={false}       // control whether the video should play in fullscreen or inline
                onReady={e => this.setState({ isReady: true })}
                controls={2}
                onChangeState={e => console.log('onChangeState'+e.state)}
                onChangeQuality={e => console.log('onChangeQuality'+e.quality)}
                onError={e => console.log('onError'+e.error)}
                style={{height: (Dimensions.get("window").width) * 0.5625}} />

                <Icon color={'#3F51B5'} 
                  onPress={() => {
                    this.removeVideo()
                  }}
                  name="delete" 
                  size={36} />
          </View>
          : 
          ( this.state.videoId !==null && !this.state.playVideo) ? 
          <View style={{backgroundColor:'black', height:(Dimensions.get("window").width) * 0.5625}}>
              <Icon color={'#3F51B5'} 
                  onPress={() => {
                    this.playVideoMethod()
                  }}
                  name="play" 
                  size={36} />
          </View>
          : null
          
           
        }

          <ScrollView style={styles.songLyricsScrollView} showsVerticalScrollIndicator={false}>

            <View>
              <Text style={styles.textSong}>{this.state.songLyrics + '\n\n\n\n'}</Text>
            </View>
          </ScrollView>

          <Icon color={'#cc181e'} 
            onPress={() => {
              this.setState({playVideo:false})
              Actions.youtubeSongSearch({title:this.state.title, songId:this.state.songId})
            }}
            name="youtube-play" 
            size={60} 
            style={styles.youtubeButton}/>
        </View>
      );
  }

  removeVideo() {
    try{
     AsyncStorage.removeItem('song_id_' + this.props.songId);
     this.setState({videoId:null})
    
    } catch (error) {
      console.error('AsyncStorage error: ' + error);
    }
  }

  playVideoMethod() {
    this.setState({playVideo:true})
  }
}