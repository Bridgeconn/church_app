import React, {Component} from 'react'
import {Text,View, ScrollView,AsyncStorage,Dimensions,Alert,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Actions} from 'react-native-router-flux'
import Config from 'react-native-config'
import YouTube from 'react-native-youtube';
import * as AsyncStorageConstants from './AsyncStorageConstants';
import {songLyricsPage as songLyricsPage} from '../style/styles.js'

const songLyricsPageStyle = StyleSheet.create(songLyricsPage)

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
     AsyncStorage.getItem(AsyncStorageConstants.SONG_ID + this.props.songId).then((value)=>{
      console.log("videoId"+value)
      if (value !== null) {
       this.setState({videoId:value})
    }
     })
  }
  render(){
      return (
        <View style={songLyricsPageStyle.songLyricsContainer}>
        {this.state.videoId !==null && this.state.playVideo ?
            <View style={songLyricsPageStyle.topYoutubeView}>
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
                style={songLyricsPageStyle.youtubeViewRatio} />
                <View style={songLyricsPageStyle.initialYoutubeColor}>
                <Icon color={'#fff'} 
                  onPress={() => {
                    this.removeVideo()
                  }}
                  name="delete" 
                  size={32}
                  style={songLyricsPageStyle.alignDeleteIcon} />
                </View>
          </View>
          : 
          ( this.state.videoId !==null && !this.state.playVideo) ? 
          <View style={songLyricsPageStyle.youtubePlay}>
              <Icon color={'#fff'} 
                  onPress={() => {
                    this.playVideoMethod()
                  }}
                  style={songLyricsPageStyle.playIconAlignment}
                  name="play" 
                  size={48} />
          </View>
          : null
        }
          <ScrollView style={songLyricsPageStyle.songLyricsScrollView} showsVerticalScrollIndicator={false}>

            <View>
              <Text style={songLyricsPageStyle.textSong}>{this.state.songLyrics + '\n\n\n\n'}</Text>
            </View>
          </ScrollView>

          <Icon color={'#cc181e'} 
            onPress={() => {
              this.setState({playVideo:false})
              Actions.youtubeSongSearch({title:this.state.title, songId:this.state.songId})
            }}
            name="youtube-play" 
            size={60} 
            style={songLyricsPageStyle.youtubeButton}/>
        </View>
      );
  }

  removeVideo() {
    Alert.alert(
  'Delete',
  'Are you sure !',
  [
    {text: 'Cancel', onPress: () => this.state.videoId},
    {text: 'OK', onPress: () =>   { 
      try{
        AsyncStorage.removeItem(AsyncStorageConstants.SONG_ID + this.props.songId); this.setState({videoId:null}) 
      }
      catch(error){
        console.log("AsyncStorage")
      } 
      } 
    },
  ]

)
    // try{
    // 
    //  this.setState({videoId:null})
    
    // } catch (error) {
    //   console.error('AsyncStorage error: ' + error);
    // }
  }

  playVideoMethod() {
    this.setState({playVideo:true})
  }
}