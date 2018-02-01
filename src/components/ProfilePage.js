import React, {Component} from 'react'
import {View,Text,TouchableOpacity,Image,ScrollView, Platform,TextInput,AsyncStorage} from 'react-native'
import {Header, Card, Title, Left,Button,Right,Body,CheckBox,Item,Input,Icon} from 'native-base'
import ImagePicker from 'react-native-image-picker'
import { Actions } from 'react-native-router-flux'
import styles from '../style/styles.js'
import Config from 'react-native-config'
import axios from 'axios';

export default class ProfilePage extends Component{
	
	constructor(props){
		super(props)
		this.state = {
        isReady: false,
		    status: null,
        token: props.tokenValue,
        email: props.email,

        contact: props.contactNum,
        user: props.username,
        checkboxEmail: false,
        checkboxContact: false,
        
        newUser: props.username,
        newContact: props.contactNum,
        newcheckboxEmail: false,
        newcheckboxContact: false,

        showSaveProfile: false
	  	};
	}

  async handlePress( ){
    console.log("hello handle press")
      console.log(this.state.user);
      console.log(this.state.contact);
      console.log(this.state.token);
      Actions.pop({refresh:{username:this.state.user,imageUri:this.state.uri,contactNum:this.state.contact}})
      const user = this.state.user
      const contact = this.state.contact
      this.setState({user})
      this.setState({contact})
      await AsyncStorage.setItem('user',user);
      await AsyncStorage.setItem('contact',contact);
      let data = new FormData();
      data.append("first_name", this.state.user);
      data.append("contact_number", this.state.contact);
      data.append("contact_show",false)
      if(this.state.checkbox1==true || this.state.checkbox2==true){
        data.append("contact_show",true)
      }
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

  async componentDidMount() {
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
  }

  onBackButton(){
      if(this.state.showSaveProfile){
        alert("please save changes")
      }
      else{
        Actions.pop()
      }
    }

  checkSaveButtonVisibility(newUser, newContact, newCheckEmail, newCheckContact) {

    if (this.state.user!== newUser || this.state.contact !== newContact || 
        this.state.checkboxContact !== newCheckContact || this.state.checkboxEmail !== newCheckEmail) {
      
      this.setState({showSaveProfile:true});
    } else {
      this.setState({showSaveProfile:false});
    }
  }
  
	render(){
		return(
      <View style={{flex:1}}>

                    <Header>
                      <Left>
                        <Button transparent onPress={()=>{this.onBackButton()}}>
                          <Icon name='arrow-back'/>
                        </Button>
                      </Left>
                      <Body>
                        <Title style={{textAlign:"left"}}>Profile</Title>
                      </Body>
                      <Right>
                      {this.state.showSaveProfile ?  <TouchableOpacity onPress={()=>this.handlePress()}>
                          <Title>Save</Title>
                        </TouchableOpacity>: null}
                      </Right>                      
                    </Header>
        <ScrollView>
		        <View style={styles.profilePageContent}>
			        <View style={styles.profileView}>
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
				        <Text style={{marginTop:12}}>
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
                
                <Text style={{marginTop:12}}>Email</Text>
                <Text style={styles.customEmail}>{this.state.email}</Text>
                <View style={styles.shareContainer}>
                <View style={styles.checkboxContainer}>
                <CheckBox onPress={()=> {
                  this.checkSaveButtonVisibility(this.state.newUser, this.state.newContact, !this.state.newcheckboxEmail, this.state.newcheckboxContact)
                  this.setState({newcheckboxEmail: !this.state.newcheckboxEmail})
                }} 
                  checked={this.state.newcheckboxEmail} style={{margin:-8,padding:0,flexDirection:"row"}}/>
                  <Text style={styles.checkboxText}>Share email with church members</Text>
                </View>
                <View style={styles.checkboxContainer}>
                <CheckBox onPress={()=>{ 
                  this.checkSaveButtonVisibility(this.state.newUser, this.state.newContact, this.state.newcheckboxEmail, !this.state.newcheckboxContact);
                  this.setState({newcheckboxContact:!this.state.newcheckboxContact})
                }} 
                checked={this.state.newcheckboxContact} style={{margin:-8,padding:0,flexDirection:"row"}}/>
                  <Text style={styles.checkboxText}>Share contact with church members</Text>
                </View>
                </View>
					</View>
		  	</View>
      </ScrollView>
		</View>
			)
	}
} 

