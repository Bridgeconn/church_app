import React, {Component} from 'react'
import {Text,View,Image,TouchableOpacity, ScrollView, ActivityIndicator,Dimensions, StyleSheet,AsyncStorage} from 'react-native';
import {Button, Content, List, ListItem}  from 'native-base'
import styles from '../style/styles.js'
import Config from 'react-native-config'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Modal from 'react-native-simple-modal';
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
        playVideoId:null,
        open: false
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
         <ScrollView>
                {this.state.data.map(item =>
                  <Content key={item.id.videoId}>
                      <TouchableOpacity style={{flexDirection:'row', marginBottom:8}}  onPress={() => {this.setStartPlay(item.id.videoId,item.snippet.title);}}>
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
        	    <Modal
    				overlayBackground={'rgba(0, 0, 0, 0)'}
			        open={this.state.open}
			        modalDidOpen={() => console.log('modal did open')}
			        modalDidClose={() => this.setState({open: false})}
			        closeOnTouchOutside={true}
					containerStyle={{
					   justifyContent: 'center'
					}}
					modalStyle={{
					   borderRadius: 2,
					   margin:5,
					   padding: 5,paddingTop:0,
					   backgroundColor: '#F5F5F5'
					}}
			        >
	         		<View style={{flexDirection:"column"}}>
	         		<Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize:18,margin:10}}>{this.state.title}</Text>
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
	                    style={{ height: (Dimensions.get("window").width) * 0.5625}} />
	                <View style={{flexDirection:"row",justifyContent:"flex-end"}}>
	                <TouchableOpacity
			            style={{margin: 5,marginRight:20,alignItems:"flex-end",}}
			            onPress={() => this.setState({open: false})}
			            >
			            <Text style={{fontSize:20}}>Cancel</Text>
		          	</TouchableOpacity>
		          	<TouchableOpacity
			            style={{margin: 5,alignItems:"flex-end"}}
			            onPress={()=>{this.refreshOnSave()}} 
			            >
			            <Text style={{fontSize:20}}>Save</Text>
		          	</TouchableOpacity>
		          	</View>
	                </View>	
				</Modal>
                
        </View>
      );
  	}
  }
 refreshOnSave(){
	this.saveVideo();
 	Actions.pop({refresh:{videoId: this.state.playVideoId} }) 

 }
  setStartPlay(videoId,searchTitle) {
    this.setState({playVideoId:videoId, startPlay:true,open:true,title:searchTitle});

  }

  stopPlay() {
   this.setState({playVideoId:"", startPlay:false}); 
  }

  async saveVideo() {
    try {
      AsyncStorage.setItem('song_id_' + this.props.songId, this.state.playVideoId);
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
      })
      .catch((error) => {
        this.setState({isLoading:false})
        console.log("error in fetch : "+error);
      });
  }

}