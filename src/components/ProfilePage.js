import React, {Component} from 'react'
import {View,Text,TouchableOpacity,Image,ScrollView, Platform,TextInput,AsyncStorage} from 'react-native'
import {Header, Card, Title, Left,Button,Right,Icon,Body,CheckBox} from 'native-base'
import ImagePicker from 'react-native-image-picker'
import { Actions } from 'react-native-router-flux'
import styles from '../style/styles.js'
import Config from 'react-native-config'
import axios from 'axios';

export default class ProfilePage extends Component{
	
	constructor(props){
		super(props)
    console.log("props=" + this.props.username + "  " + this.props.contactNum + "  "+ this.props.tokenValue+ " "+this.props.email);
		this.state = {
		    avatarSource: null,
		    videoSource: null,
		    setImage:'',
        checkbox1:false,
        checkbox2:false,
		    isReady: false,
		    status: null,
	      	user: this.props.username,
      		uri:this.props.uri, 
          contact:this.props.contactNum,
          token: this.props.tokenValue,
          email: this.props.email
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
      console.log(this.state.token);
      Actions.pop({refresh:{username:this.state.user,imageUri:this.state.uri,contactNum:this.state.contact,email:this.state.email}})
      const user = this.state.user
      const contact = this.state.contact
      this.setState({user})
      this.setState({contact})
      await AsyncStorage.setItem('user',user);
      await AsyncStorage.setItem('contact',contact);
      await AsyncStorage.setItem('email',email);

      let data = new FormData();
      data.append("first_name", this.state.user);
      data.append("contact_number", this.state.contact);
      data.append("email_address", this.state.email);
      data.append("contact_show", true);
      data.append("last_name", "");
      const config = { headers: {'Church-App-Id': Config.CHURCH_APP_ID, 'AUTH-TOKEN':this.state.token} }
      axios.defaults.headers.post[Config.HEADER_KEY_CONTENT_TYPE] = Config.CONTENT_TYPE;
      axios.post(Config.BASE_API_URL + Config.CONTACT_UPDATE_API_URL, data, config)
        .then((response) => { 
            console.log(response);
        })
        .catch(function (error) {
          console.log("ERROR == "+error)
        });

    }
  selectPhotoTapped() {
    const options = {
      title: 'Select Profile Picture',
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
     }
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = '+JSON.stringify({options}))
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
        }) 
       this.saveUrl('uri', uri)
        console.log(uri+"uri")
      }
    });
    
  }


  async componentDidMount() {
    this.props.onRefSave(this)
    await AsyncStorage.getItem('token').then((auth_token) => {
      console.log('token1 '+auth_token)
      if (auth_token !== null) {
        this.setState({token:auth_token})
      }
    });
    await AsyncStorage.getItem('user').then((user_name) => {
      console.log('user1 '+user_name)
      if (user_name !== null) {
        this.setState({user:user_name})
      }
    });
    await AsyncStorage.getItem('contact').then((contact_num) => {
      console.log('contact1 '+contact_num)
      if (contact_num !== null) {
        this.setState({contact:contact_num})
      }
    });
    await AsyncStorage.getItem('email').then((email) => {
      console.log('email '+email)
      if (email !== null) {
        this.setState({email:email})
      }
    });
  }
  componentWillUnmount() {
    this.props.onRefSave(null)
  }
  
	render(){
		return(
			<ScrollView>
		        <View style={styles.profilePageContent}>
			        <View style={[styles.avatarProfile, styles.avatarContainer, {marginBottom: 20}]}>
			          	  <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <Image style={styles.avatarProfile} source={require('../images/person_dummy.png')}/>
		       		 		      <Icon name="create"  style={styles.editIconProfile}/>
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
				          onChangeText={(user) => this.setState({user:user})}
                  value={this.state.user}
				        />
				        <Text>
				          Contact Number
				        </Text>
				        <TextInput
				          style={styles.textInputStyle}
				          placeholder="Enter Contact"
				          returnKeyLabel = {"next"}
				          onChangeText={(user) => this.setState({contact:user})}
                  value={this.state.contact}
                  keyboardType="numeric"
				        />
                <View style={styles.checkboxContainer}>
                <CheckBox onPress={()=> {this.setState({checkbox1: !this.state.checkbox1})}} checked={this.state.checkbox1}/>
                <Body>
                  <Text style={styles.checkboxText}>{this.state.email}</Text>
                </Body>
                </View>
                <View style={styles.checkboxContainer}>
                <CheckBox  onPress={()=>{ this.setState({checkbox2: !this.state.checkbox2})}} checked={this.state.checkbox2}/>
                <Body>
                  <Text style={styles.checkboxText}>{this.state.contact}</Text>
                </Body>
                </View>
                <View style={styles.infoContainer}>
                    <Icon name="information-circle"/>
                    <Text style={styles.infoText}>This contact information will be shared with other members of the church</Text>
                </View>
					</View>
				</View>
			</ScrollView>
			)
	}
} 

