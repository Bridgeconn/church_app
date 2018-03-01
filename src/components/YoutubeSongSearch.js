import React, {Component} from 'react'
import {Text,View,Image,TouchableOpacity, ScrollView, ActivityIndicator,Dimensions, StyleSheet,AsyncStorage} from 'react-native';
import {Button, Content, List, ListItem}  from 'native-base'
import Config from 'react-native-config'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-simple-modal';
import YouTube from 'react-native-youtube';
import {Actions} from 'react-native-router-flux'
import Spinner from 'react-native-loading-spinner-overlay';
import * as AsyncStorageConstants from './AsyncStorageConstants';
import {youtubeSongSearchStyle} from '../style/styles.js'


export default class YoutubeSongSearch extends Component{

  constructor(props){
    super(props);
    this.state = {
        title:this.props.title,
        isLoading: false,
        data: [],
        startPlay: false,
        playVideoId:null,
        open: false
    }
  }
  /**
  *function refreshOnSave
  *save selected video 
  *onBack refresh videoId on songLyrics page  
  */
  refreshOnSave(){
  this.saveVideo();
  Actions.pop({refresh:{videoId: this.state.playVideoId} }) 

 }

/**
*function setStartPlay 
*open modal to play video onclick 
*
*param {string} videoId searchTitle
*get videoId searchTitle from response data 
*set state value of videoId to playVideoId
*set state value of title to searchTitle 
*/
  setStartPlay(videoId,searchTitle) {
    this.setState({playVideoId:videoId, startPlay:true,open:true,title:searchTitle});
  }
/**
*function stopPlay
*set state value of startPLay as false to stop video play
*set state of playVideoId to empty
*/
  stopPlay() {
   this.setState({playVideoId:"", startPlay:false}); 
  }

/**
*function savevideo 
*save song id to asyncStorage (local storage)
*/
  async saveVideo() {
    try {
      AsyncStorage.setItem(AsyncStorageConstants.SONG_ID+ this.props.songId, this.state.playVideoId);
    } catch (error) {
      console.error('AsyncStorage error: ' + error);
    }
  }
/**
*function callfetchLib 
*fetch youtube search title video 
*/
  callFetchLib() {
    var str = this.props.title;
    console.log('title --- ' + str)
    var formatStr = str.replace(/ /g,'+');
    //show loader until data fetch
    this.setState({isLoading:true})

    fetch('https://www.googleapis.com/youtube/v3/search?key='+ Config.YOUTUBE_API_KEY +
      '&part=snippet,id&maxResults=5&type=video&videoDefinition=any&q='+ formatStr)
      .then((response) => response.json())
      //response data 
      .then((responseJson) => {
        this.setState({isLoading:false})
        console.log("response in fetch : " + JSON.stringify(responseJson));
        this.setState({data:responseJson.items})
      })
      .catch((error) => {
        this.setState({isLoading:false})
        console.log("error in fetch : "+error);
      });
  }
  componentDidMount(){
  	this.callFetchLib();
  }


  render(){
  	if (this.state.data.length == 0) {
  		return (
  			<Spinner visible={this.state.isLoading} size={"large"} color={"#3F51B5"} style={youtubeSongSearchStyle.spinnerCustom}/>
  		)
  	} else {
      return (
        <View style={youtubeSongSearchStyle.youtubeContainer}>
         <ScrollView>
                {this.state.data.map(item =>
                  <Content key={item.id.videoId}>
                      <TouchableOpacity style={youtubeSongSearchStyle.imageContainer}  onPress={() => {this.setStartPlay(item.id.videoId,item.snippet.title);}}>
                        <Image style={youtubeSongSearchStyle.imageCustom}
                            source={{uri:item.snippet.thumbnails.default.url}} >
                          <Icon color={'white'} name="play" size={24} style={youtubeSongSearchStyle.playIconAlignment}/>
                        </Image>
                        <View style={youtubeSongSearchStyle.youtubeTextCustom}>
                          <Text numberOfLines={2} ellipsizeMode='tail' style={youtubeSongSearchStyle.youtubeTextTitle}>{item.snippet.title}</Text>
                          <Text numberOfLines={3} ellipsizeMode='tail' style={youtubeSongSearchStyle.youtubeDescription}>{item.snippet.description}</Text>
                        </View>
                        </TouchableOpacity>
                  </Content>
                )}
             </ScrollView>
        	    <Modal
    				  overlayBackground={'rgba(0, 0, 0, 0)'}
			        open={this.state.open}
			        modalDidOpen={() => console.log('modal did open')}
			        modalDidClose={() => this.setState({open: false})}
			        closeOnTouchOutside={true}
    					containerStyle={youtubeSongSearchStyle.modalContainer}
    					modalStyle={youtubeSongSearchStyle.modal}
			        >
	         		<View style={youtubeSongSearchStyle.modalConent}>
	         		<Text numberOfLines={1} ellipsizeMode='tail' style={youtubeSongSearchStyle.modalConentTitle}>{this.state.title}</Text>
	                  <YouTube
	                    apiKey={Config.YOUTUBE_API_KEY}
	                    videoId={this.state.playVideoId}   
	                    play={true}             
	                    fullscreen={false}       
	                    onReady={e => this.setState({ isReady: true })}
	                    controls={2}
	                    onChangeState={e => console.log('onChangeState'+e.state)}
	                    onChangeQuality={e => console.log('onChangeQuality'+e.quality)}
	                    onError={e => console.log('onError'+e.error)}
	                    style={youtubeSongSearchStyle.youtubeViewRatio} />
	                <View style={youtubeSongSearchStyle.modalOpen}>
	                <TouchableOpacity
			            style={youtubeSongSearchStyle.modalClose}
			            onPress={() => this.setState({open: false})}
			            >
			            <Text style={youtubeSongSearchStyle.modalText}>Cancel</Text>
		          	</TouchableOpacity>
		          	<TouchableOpacity
			            style={youtubeSongSearchStyle.modalSave}
			            onPress={()=>{this.refreshOnSave()}} 
			            >
			            <Text style={youtubeSongSearchStyle.modalText}>Save</Text>
		          	</TouchableOpacity>
		          	</View>
	                </View>	
				</Modal>
                
        </View>
      );
  	}
  }
 

}