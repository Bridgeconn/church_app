import React, {Component} from 'react'
import {Text,View,Image,TouchableOpacity, ScrollView, ActivityIndicator,Dimensions, StyleSheet} from 'react-native';
import {Button, Content, List, ListItem}  from 'native-base'
import styles from '../style/styles.js'
import Config from 'react-native-config'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import PopupDialog, { DialogTitle, DialogButton } from 'react-native-popup-dialog';
import YouTube from 'react-native-youtube';
import {Actions} from 'react-native-router-flux'
import Spinner from 'react-native-loading-spinner-overlay';

export default class YoutubeSongSearch extends Component{

  constructor(props){
    super(props);
    this.state = {
        title:this.props.title,
        isLoading: false,
        data: [],
        startPlay: false,
        playVideoId:""
    }
  }

  componentDidMount(){
  	this.callFetchLib();
  }


  render(){
  	if (this.state.data.length == 0) {
  		return (
  			<Spinner visible={this.state.isLoading} size={"large"} color={"#3F51B5"} style={styles.spinnerCustom}/>
  		)
  	} else {
      return (
        <View style={styles.container}>

        	<PopupDialog 
            dialogTitle={<DialogTitle title="Search Results" />}
            haveOverlay={false}
            width={1}
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
              <DialogButton
                text="SAVE"
                align="right"
                onPress={() => {
                  Actions.pop()
                }}
                key="button-save"
              />
              
            ]}
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}>

              {
                <View style={{margin:StyleSheet.hairlineWidth, height:300, backgroundColor:'black',flexDirection:'column'}}>

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
              </PopupDialog>

              <ScrollView>
                {this.state.data.map(item =>
                  <Content key={item.id.videoId}>
                      <TouchableOpacity style={{flexDirection:'row', marginBottom:8}}  onPress={() => {this.setStartPlay(item.id.videoId);}}>
                        <Image style={{width:120, height:90}}
                            source={{uri:item.snippet.thumbnails.default.url}} >
                          <Icon color={'white'} name="play" size={24} style={{alignItems:'center',justifyContent:'center',position:'absolute',right:0,bottom:0}}/>
                        </Image>
                        
                        <View style={{height:90, width:Dimensions.get('window').width-160, marginLeft:8}}>
                          <Text numberOfLines={2} ellipsizeMode='tail' style={{marginBottom:8, fontSize:14}}>{item.snippet.title}</Text>
                          <Text numberOfLines={3} ellipsizeMode='tail' style={{fontSize:12}}>{item.snippet.description}</Text>
                        </View>
                        </TouchableOpacity>
                  </Content>
                )}
              </ScrollView>

        </View>
      );
  	}
  }

  setStartPlay(videoId) {
    this.setState({playVideoId:videoId, startPlay:true});
    this.popupDialog.show();
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
  	var str = this.props.title;
  	console.log('title --- ' + str)
  	var formatStr = str.replace(/ /g,'+');
    this.setState({isLoading:true})

    fetch('https://www.googleapis.com/youtube/v3/search?key='+ Config.YOUTUBE_API_KEY +
      '&part=snippet,id&maxResults=5&type=video&videoDefinition=any&q='+ formatStr)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({isLoading:false})
        console.log("response in fetch : " + JSON.stringify(responseJson));
        this.setState({data:responseJson.items})
        // this.popupDialog.show();
      })
      .catch((error) => {
        this.setState({isLoading:false})
        console.log("error in fetch : "+error);
      });
  }

}