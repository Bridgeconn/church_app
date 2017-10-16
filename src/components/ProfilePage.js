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
	      	user: this.props.user,
      		uri:this.props.uri, 
          contact:this.props.contact 	
	  	};
	}
	
  	saveUrl(item, selectedValue) {
    try {
     AsyncStorage.setItem(item, selectedValue);
      console.log("saved")
    } catch (error) {
      console.error('AsyncStorage error: ' + error);
    }
  }
  async handlePress(){
    console.log("hello handle press")
      console.log(this.state.user);
      console.log(this.state.contact);
      Actions.pop({refresh:{username:this.state.user,imageUri:this.state.uri,contactNum:this.state.contact}})
      const user = this.state.user
      const contact = this.state.contact
      this.setState({user})
      this.setState({contact})
      await AsyncStorage.setItem('user',user);
      await AsyncStorage.setItem('contact',contact);
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
  componentDidMount() {
    this.props.onRefSave(this)
  }
  componentWillUnmount() {
    this.props.onRefSave(null)
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
			          	
			        </View> 
			        <View style={styles.profileView}>
		        		<Text>
				          Name
				        </Text>
				        <TextInput
				          style={styles.textInputStyle}
				          placeholder="Enter Name"
				          returnKeyLabel = {"next"}
				          onChangeText={(user) => this.setState({user:user})}
                  value={this.state.user}
				        />
				        <Text>
				          Contact
				        </Text>
				        <TextInput
				          style={styles.textInputStyle}
				          placeholder="Enter Contact"
				          returnKeyLabel = {"next"}
				          onChangeText={(user) => this.setState({contact:user})}
                  value={this.state.contact}
				        />
					</View>
				</View>
			</ScrollView>
			)
	}
} 

