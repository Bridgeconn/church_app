import React, {Component} from 'react'
import {View,Text,TouchableOpacity,Image,ScrollView, Platform,TextInput} from 'react-native'
import {Header, Card, Title, Left,Button,Right,Icon,Body} from 'native-base'
import ImagePicker from 'react-native-image-picker'
import { Actions } from 'react-native-router-flux'
import styles from '../style/styles.js'

export default class ProfilePage extends Component{
	
	constructor(){
		super()
		this.state = {
		    avatarSource: null,
		    videoSource: null,
		    setImage:'',
		    isReady: false,
		    status: null,
	      	username: '',
      		contact: '',
	     	

	  	};
	  	
	}

	handlePress() {
     console.log(this.state.username);
     console.log(this.state.contact);
     Actions.home({username:this.state.username, contact:this.state.contact, image:this.state.avatarSource})
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

  

	render(){
		return(
			<ScrollView>
			<Header>
		          <Left>
		          <TouchableOpacity>
		           	<Title>Edit</Title>
		           </TouchableOpacity>
		          </Left>
		          <Right>
		            <TouchableOpacity onPress={() => this.handlePress()}>
		              <Title>Save</Title>
		            </TouchableOpacity>
		          </Right>
		        </Header>

		        <View style={styles.profilePageContent}>
			        <View style={[styles.avatarProfile, styles.avatarContainer, {marginBottom: 20}]}>
			          { this.state.avatarSource === null ? <Image style={styles.avatarProfile} source={require('../images/person_dummy.png')}>
			          	<TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} >
		       		 		<Icon name="create" style={styles.editIconProfile}/>
		        		</TouchableOpacity>
			          </Image> : <Image style={styles.avatarProfile} source={this.state.avatarSource}>
			          	<TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} >
		       		 		<Icon name="create" style={styles.editIconProfile}/>
		        		</TouchableOpacity>
			          </Image>
			          }
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

