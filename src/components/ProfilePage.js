import React, {Component} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Image,PixelRatio,ScrollView,Dimensions, Platform,} from 'react-native'
import {Header, Card, Title, Left,Button,Right,Icon,Body} from 'native-base'
import YouTube, {  YouTubeStandaloneIOS,  YouTubeStandaloneAndroid,} from 'react-native-youtube';
import ImagePicker from 'react-native-image-picker';
import Sound from 'react-native-sound';	


export default class ProfilePage extends Component{
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
	      	isPlaying: false,
	      	songLength: 0,
	      	interval: null,
	     	

	  	};
	  	this.playSong = this.playSong.bind(this);
    	this.pauseSong = this.pauseSong.bind(this);
  		this.tick = this.tick.bind(this);
	}
	

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        this.setState({
          avatarSource: source
        });
      }
    });
  }
	playSong() {
	    this.state.song.play();
	    this.setState({
	      isPlaying: true,
	      interval: setInterval(this.tick, 1000)
	    })
	  }

	pauseSong() {
	    this.state.song.pause();
	    this.setState({
	      isPlaying: false,
	      interval: clearInterval(this.state.interval)
	    })
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
          isPlaying: false,
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

		        <View style={styles.profileContent}>
			        <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
			          { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
			            <Image style={styles.avatar} source={this.state.avatarSource} />
			          }
			          	<TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} >
		       		 		<Icon name="create" style={styles.editIcon}/>
		        		</TouchableOpacity>
		        		
			        </View> 
			        <View style={styles.profileView}>
		        		<Text style={styles.customText}>Name</Text>
		        		<Text style={styles.customText}>Email</Text>
		        		<Text style={styles.customText}>Contact</Text>
		        	</View>
		 		</View>
		 		<View style={styles.eventsView}>
		 			<Image source={require('../images/Events.jpg')} style={styles.imageCustom}/>
		 		</View>
		 		<View style={styles.eventsView}>
		 			<YouTube
		          ref={component => {
		            this._youTubeRef = component;
		          }}
		          apiKey="AIzaSyBsUeJYvXWnxUDhd0GX03D5jknGPaV41Tw"
		          videoId="EKyirtVHsK0"
		          play={this.state.isPlaying}
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
		 		<View style={styles.eventsView}>
		 			<TouchableOpacity onPress={this.playSong}><Text>play song</Text></TouchableOpacity>
  					<TouchableOpacity onPress={this.pauseSong}><Text>pause song</Text></TouchableOpacity>
  					{this.state.isPlaying ? <Icon name="ios-pause"/> : <Icon name="ios-play" />}
		 		</View>
		 		<View style={styles.eventsView}>
		 			<Image source={require('../images/Events.jpg')} style={styles.imageCustom}/>
		 		</View>
			</ScrollView>
			)
	}
} 

const styles = StyleSheet.create({
	container:{
		flex:1,
		margin:10
	},
	avatarContainer: {
	marginTop:10,
	marginLeft:10,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    
    
  },
  profileContent:{
  	flexDirection:"row",
  	margin:10
  },
  profileView:{
  	margin:20,
  },
  avatar: {
    width: 170,
    height: 170
  },
  editIcon:{
  	justifyContent:"flex-end",
  	alignItems:"flex-end",
  	marginTop:100,
  	marginLeft:100

  },
  customText:{
  	fontSize:18
  },
  imageCustom:{
  	height:200,
  	width:400,
  },
  eventsView:{
  	justifyContent:'center',
  	alignItems:'center',
  	marginVertical: 10

  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
  },
  buttonTextSmall: {
    fontSize: 15,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  player: {
    height: PixelRatio.roundToNearestPixel(
      Dimensions.get('window').width / (16 / 9),
    ),
    alignSelf: 'stretch',
    marginVertical: 10,
  },

})



 