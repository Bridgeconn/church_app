import React, {Component} from 'react'
import {View,Text,TouchableOpacity,Image,ScrollView, Platform,TextInput,AsyncStorage} from 'react-native'
import {Header, Card, Title, Left,Button,Right,Icon,Body} from 'native-base'
import ImagePicker from 'react-native-image-picker'
import { Actions } from 'react-native-router-flux'
import styles from '../style/styles.js'

export default class ProfilePage extends Component{
	
	constructor(props){
		super(props)
		this.state = {
		    avatarSource: null,
		    videoSource: null,
		    setImage:'',
		    isReady: false,
		    status: null,
	      	username: '',
      		contact: '',  
      		uri:this.props.uri  	
	  	};
	}
	handlePress(){
		console.log("hello handle press")
     	console.log(this.state.username);
     	console.log(this.state.contact);
     	Actions.home({username:this.state.username, contact:this.state.contact, image:this.state.avatarSource,imageUri:this.state.uri})

  	}
  	saveUrl(item, selectedValue) {
    try {
     AsyncStorage.setItem(item, selectedValue);
      console.log("saved")
    } catch (error) {
      console.error('AsyncStorage error: ' + error);
    }
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
        console.log("source"+source)
        let uri = source.uri;
        this.setState({
          avatarSource: source,
          uri: uri
        });
       
       this.saveUrl('uri', uri)
        console.log(uri+"uri")
      }
    });
  }
	render(){
		return(
			<ScrollView>
		        <View style={styles.profilePageContent}>
			        <View style={[styles.avatarProfile, styles.avatarContainer, {marginBottom: 20}]}>
			          	<Image style={styles.avatarProfile} source={this.state.uri === null ? require('../images/person_dummy.png'):{uri:this.state.uri}}>
			          	<TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} >
		       		 		<Icon name="create" style={styles.editIconProfile}/>
		        		</TouchableOpacity>
			          </Image> 			          
			          	<TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} >
		       		 		<Icon name="create" style={styles.editIconProfile}/>
		        		</TouchableOpacity>	
			        </View> 
			        <View style={styles.profileView}>
		        		<Text>
				          Name
				        </Text>
				        <TextInput
				          style={styles.textInputStyle}
				          placeholder="Enter Name"
				          returnKeyLabel = {"next"}
				          onChangeText={(text) => this.setState({username:text})}
				        />
				        <Text>
				          Contact
				        </Text>
				        <TextInput
				          style={styles.textInputStyle}
				          placeholder="Enter Contact"
				          returnKeyLabel = {"next"}
				          onChangeText={(text) => this.setState({contact:text})}
				        />
					</View>
				</View>
			</ScrollView>
			)
	}
} 

