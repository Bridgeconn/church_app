import React, {Component} from 'react'
import {View,Text,TouchableOpacity,Image,ScrollView, Platform,TextInput,AsyncStorage,Alert,BackHandler,StyleSheet, Button} from 'react-native'
import {Header, Card, Title, Left,Right,Body,CheckBox,Item,Input,Icon} from 'native-base'
import { Actions } from 'react-native-router-flux'
import {profilePageStyle} from '../style/styles.js'
import Config from 'react-native-config'
import axios from 'axios';
import * as AsyncStorageConstants from './AsyncStorageConstants';
import LocalEventEmitter from "./LocalEventEmitter"
import Spinner from 'react-native-loading-spinner-overlay';

// const profilePageStyle = StyleSheet.create(profilePage)

export default class ProfilePage extends Component{
	
	constructor(props){
		super(props)
     console.log("contact in profile page "+props.contactNum)
     console.log("token in profile page "+props.tokenValue)
		this.state = {
        token: props.tokenValue,
        email: props.email,
        contact: props.contactNum,
        user: props.username,
        checkboxEmail: props.showEmail,
        checkboxContact: props.showContact,
        
        newUser: props.username,
        newContact: props.contactNum,
        newcheckboxEmail: props.showEmail,
        newcheckboxContact: props.showContact,

        showSaveButton: false,

        isloading: false
	  	};
	}


  async saveToAsyncStorage(){
      await AsyncStorage.setItem(AsyncStorageConstants.UserName,this.state.newUser);
      await AsyncStorage.setItem(AsyncStorageConstants.UserContactNumber,this.state.newContact);
      await AsyncStorage.setItem(AsyncStorageConstants.UserCheckBoxEmail,JSON.stringify(this.state.newcheckboxEmail));
      await AsyncStorage.setItem(AsyncStorageConstants.UserCheckBoxContact,JSON.stringify(this.state.newcheckboxContact));
      // this.setState({isloading:false})
      Actions.pop()
      this.props.action([this.state.newUser,this.state.newContact,this.state.newcheckboxEmail,this.state.newcheckboxContact])
  }

  async saveProfileData(){
    if (this.state.isloading) {
      return
    }
    this.setState({isloading:true})
      let data = new FormData();
      data.append("first_name", this.state.newUser);
      data.append("contact_number", this.state.newContact);
      data.append("contact_show",this.state.newcheckboxContact)
      data.append("show_email", this.state.newcheckboxEmail);

      const config = { headers: {'Church-App-Id': Config.CHURCH_APP_ID, 'AUTH-TOKEN':this.state.token} }
      axios.defaults.headers.post[Config.HEADER_KEY_CONTENT_TYPE] = Config.CONTENT_TYPE;
      axios.post(Config.BASE_API_URL + Config.CONTACT_UPDATE_API_URL, data, config)
        .then((response) => { 
            console.log(response);
            this.saveToAsyncStorage()
      
        })
        .catch(function (error) {
          console.log("ERROR == "+error)
          this.setState({isloading:false})
          alert("Something went wrong. Profile data not updated")
        });

    }

    onBackPress(){
      console.log("in back buttion orifke")
      if(this.state.showSaveButton){
          Alert.alert(
            'Save changes',
            'Save changes',
            [
              {text: 'No', onPress: () => Actions.pop()},
              {text: 'Yes', onPress: () =>   {this.saveProfileData()}
              },
            ]

          )
      }
      else{
        Actions.pop()
      }
      
    }
  
  // componentDidUpdate(props){
  //     Actions.refresh({showProfileData:this.state.showSaveButton})

  //   }

  componentWillUnmount() { 
      LocalEventEmitter.rm('BackButtonPressProfile', 'ProfilePage') ;
    }
    
    componentDidMount() {
      Actions.refresh({right: this.renderRightButton})//,back:this.onBackPress()})
        // showProfileData:this.state.showSaveButton,onBackPress:this.onBackPress})
      LocalEventEmitter.on('BackButtonPressProfile', 'ProfilePage',  (data) => {
        console.log("in event receive")
        this.onBackPress()
      })
    }
    
  checkSaveButtonVisibility(newUser, newContact, newCheckEmail, newCheckContact) {
    console.log("new check email type of object "+typeof newcheckboxEmail)
      console.log("newUser "+newUser+" newContact "+newContact+" newcheckboxContact "+newCheckContact+" newcheckboxEmail "+newCheckEmail)
    if (this.state.user!== newUser || this.state.contact !== newContact || 
        this.state.checkboxContact !== newCheckContact || this.state.checkboxEmail !== newCheckEmail) {
        this.setState({showSaveButton:true});
            Actions.refresh({right: this.renderRightButton, showSaveMenu:true})

    } else {
      this.setState({showSaveButton:false});
      Actions.refresh({right: this.renderRightButton, showSaveMenu:false})
    }
  }

renderRightButton = (props)=>{
  console.log("renderRightButton")
  // console.log("showSaveButton in renderRightButton"+JSON.stringify(show.showProfileData))
  return(
      <View>
       {props.showSaveMenu ? <TouchableOpacity onPress={this.saveProfileData.bind(this)} style={profilePageStyle.RightButton}>
          <Text style={profilePageStyle.RightButtonText} >Save</Text>
        </TouchableOpacity> :null}
      </View>
    )
}
  
	render(){
		return(
      <View style={profilePageStyle.profileContainer}>
        <Spinner visible={this.state.isloading} size={"large"} color={"#3F51B5"} style={profilePageStyle.spinnerCustom}/>
        <ScrollView>
		        <View style={profilePageStyle.profilePageContent}>
			        <View style={profilePageStyle.profileView}>
		        		<Text>
				          Name
				        </Text>
				        <TextInput
				          placeholder="Enter Name"
				          returnKeyLabel = {"next"}
				          onChangeText={(changeValue) => {
                    this.checkSaveButtonVisibility(changeValue, this.state.newContact, this.state.newcheckboxEmail, this.state.newcheckboxContact);
                    this.setState({newUser:changeValue});
                  }}
                  value={this.state.newUser}
				        />
				        <Text style={profilePageStyle.contactField}>
				          Contact Number
				        </Text>
				        <TextInput
				          placeholder="Enter Contact"
				          returnKeyLabel = {"next"}
				          onChangeText={(changeValue) => {
                    this.checkSaveButtonVisibility(this.state.newUser, changeValue, this.state.newcheckboxEmail, this.state.newcheckboxContact)
                    this.setState({newContact: changeValue})
                  }}
                  value={this.state.newContact}
                  keyboardType="numeric"
				        />
                
                <Text style={profilePageStyle.emailField}>Email</Text>
                <Text style={profilePageStyle.customEmail}>{this.state.email}</Text>
                <View style={profilePageStyle.shareContainer}>
                <View style={profilePageStyle.checkboxContainer}>
                <CheckBox onPress={()=> {
                  this.checkSaveButtonVisibility(this.state.newUser, this.state.newContact, !this.state.newcheckboxEmail, this.state.newcheckboxContact)
                  this.setState({newcheckboxEmail: !this.state.newcheckboxEmail})
                }} 
                  checked={this.state.newcheckboxEmail} style={profilePageStyle.checkBoxFiled}/>
                  <Text style={profilePageStyle.checkboxText}>Share email with church members</Text>
                </View>
                <View style={profilePageStyle.checkboxContainer}>
                <CheckBox onPress={()=>{ 
                  this.checkSaveButtonVisibility(this.state.newUser, this.state.newContact, this.state.newcheckboxEmail, !this.state.newcheckboxContact);
                  this.setState({newcheckboxContact:!this.state.newcheckboxContact})
                }} 
                checked={this.state.newcheckboxContact} style={profilePageStyle.checkBoxFiled}/>
                  <Text style={profilePageStyle.checkboxText}>Share contact with church members</Text>
                </View>
                </View>
					</View>
		  	</View>
      </ScrollView>
		</View>
			)
	}
} 

