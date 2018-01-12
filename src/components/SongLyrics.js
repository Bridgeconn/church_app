import React, {Component} from 'react'
import {Text,View,Image,TouchableOpacity, ScrollView, ActivityIndicator,Dimensions, StyleSheet} from 'react-native';
import {Button}  from 'native-base'
import styles from '../style/styles.js'
import Config from 'react-native-config'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import PopupDialog, { DialogTitle, DialogButton } from 'react-native-popup-dialog';
import YouTube from 'react-native-youtube';

const queryString = 'Beautiful Garden of Prayer';

export default class EventsDetail extends Component{

  constructor(props){
    super(props);
    console.log("title_name "+this.props.song_name)
    this.state = {
        title:this.props.song_name,
        isLoading: false,
        data: [],
        startPlay: false,
        playVideoId:""
    }
  }

  render(){
      return (
        <View style={styles.container}>
          <TouchableOpacity 
                onPress={() =>{this.callFetchLib();}}
                style={styles.TouchableOpacityFloatingButtonStyle} >
                  <Icon color={'#cc181e'} name="youtube-play" size={48} style={styles.youtubeButton}/>
          </TouchableOpacity>

          <ActivityIndicator animating={ this.state.isLoading } 
                                  style={styles.loaderYoutubeSearch}/>


          <ScrollView style={styles.songLyricsScrollView} showsVerticalScrollIndicator={false}>
            <View>
              <Text style={styles.textSong}>{this.props.text}</Text>
            </View>
          </ScrollView>

          <PopupDialog 
            dialogTitle={<DialogTitle title="Search Results" />}
            haveOverlay={false}
            width={0.9}
            height={0.7}
            dismissOnTouchOutside={false}
            actions={[
              <DialogButton
                text="CANCEL"
                align="left"
                onPress={() => {
                  this.popupDialog.dismiss();
                }}
                key="button-cancel"
              />,
              
            ]}
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}>

              {this.state.startPlay &&
                <View style={{margin:StyleSheet.hairlineWidth, height:300, backgroundColor:'black',flexDirection:'column'}}>

                  <Icon onPress={() => {this.stopPlay();}} color={'white'} name="close-circle" size={24} style={{justifyContent:'flex-end',alignSelf:'flex-end'}}/>
                  <YouTube
                    apiKey={Config.YOUTUBE_API_KEY}
                    videoId={this.state.playVideoId}   // The YouTube video ID
                    play={true}             // control playback of video with true/false
                    fullscreen={false}       // control whether the video should play in fullscreen or inline
                    onReady={e => this.setState({ isReady: true })}
                    controls={2}
                    onChangeState={e => console.log('onChangeState'+e.state)}
                    onChangeQuality={e => console.log('onChangeQuality'+e.quality)}
                    onError={e => console.log('onError'+e.error)}
                    style={{ alignSelf: 'stretch', height: 250, margin:4 }} />
                </View>

              }


              <ScrollView>
                {this.state.data.map(item =>
                  <View style={{flexDirection:'row', marginBottom:8}} >
                    <TouchableOpacity onPress={() => {this.setStartPlay(item.id.videoId);}}>
                      <Image style={{width:120, height:90}}
                          source={{uri:item.snippet.thumbnails.default.url}} >
                        <Icon color={'white'} name="play" size={24} style={{alignItems:'center',justifyContent:'center',position:'absolute',right:0,bottom:0}}/>
                      </Image>
                    </TouchableOpacity>
                    <View style={{height:90, width:Dimensions.get('window').width-160, marginLeft:8}}>
                      <Text numberOfLines={2} ellipsizeMode='tail' style={{marginBottom:8, fontSize:14}}>{item.snippet.title}</Text>
                      <Text numberOfLines={3} ellipsizeMode='tail' style={{fontSize:12}}>{item.snippet.description}</Text>
                    </View>
                  </View>
                )}
              </ScrollView>
          </PopupDialog>

        </View>
      );
  }

  setStartPlay(videoId) {
    this.setState({playVideoId:videoId, startPlay:true});
  }

  stopPlay() {
   this.setState({playVideoId:"", startPlay:false}); 
  }

  async saveVideo(item, selectedValue) {
    this.saveItem('token', tokenValue)
    try {
      AsyncStorage.setItem('song_video_id', this.props.song_id+' '+this.state.playVideoId);
    } catch (error) {
      console.error('AsyncStorage error: ' + error);
    }
  }

  callFetchLib() {
    if (this.state.isLoading) {
      return;
    }
    this.setState({isLoading:true})
    let formattedString = queryString.replace(/ /g,'+');

    fetch('https://www.googleapis.com/youtube/v3/search?key='+ Config.YOUTUBE_API_KEY +
      '&part=snippet,id&maxResults=5&type=video&videoDefinition=any&q='+ formattedString)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({isLoading:false})
        console.log("response in fetch : " + JSON.stringify(responseJson));
        this.setState({data:responseJson.items})
        this.popupDialog.show();
      })
      .catch((error) => {
        this.setState({isLoading:false})
        console.log("error in fetch : "+error);
      });
  }

}