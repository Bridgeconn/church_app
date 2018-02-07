import React, {Component} from 'react'
import {View,Text,TouchableOpacity,Image,ScrollView, Platform,TextInput,AsyncStorage,Alert} from 'react-native'
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
        token: props.tokenValue,
        email: props.email,
        contact: "",
        user: "",
        checkboxEmail: false,
        checkboxContact: false,
        
        newUser: "",
        newContact: "",
        newcheckboxEmail: false,
        newcheckboxContact: false,
        showSaveProfile: false
	  	};
	}


  async saveToAsyncStorage(){

      await AsyncStorage.setItem('user_name',this.state.newUser);
      await AsyncStorage.setItem('user_contact_number',this.state.newContact);
      await AsyncStorage.setItem('user_show_email',this.state.newcheckboxEmail);
      await AsyncStorage.setItem('user_show_contact_number',this.state.newcheckboxContact);

      Actions.pop()
  }


  async saveProfileData(){
      
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
          alert("Something went wrong. Profile data not updated")
        });

    }

     componentDidMount() {
       AsyncStorage.getItem('token').then((value) => {
        this.setState({ token: value})
      })
       AsyncStorage.getItem('email').then((value) => {
        this.setState({email: value})
      })
       AsyncStorage.getItem('user_name').then((value) => {
        console.log("value "+value)
        this.setState({ user: value, newUser: value})
      })
       AsyncStorage.getItem('user_contact_number').then((value) => {
        this.setState({contact: value, newContact: value})
      })
       AsyncStorage.getItem('user_show_email').then((value) => {
        console.log("email_value "+value)
        this.setState({ checkboxEmail: value, newcheckboxEmail: value})
      })
       AsyncStorage.getItem('user_show_contact_number').then((value) => {
        this.setState({checkboxContact: value, newcheckboxContact: value})
      })
      console.log("newUser" +this.state.newUser)
      console.log("newcheckboxEmail"+this.state.newcheckboxEmail)
      console.log("newcheckboxContact"+this.state.newcheckboxContact)
    }

  onBackButton(){
      if(this.state.showSaveProfile){
          Alert.alert(
            'Save changes',
            'Save changes',
            [
              {text: 'Cancel', onPress: () => Actions.pop()},
              {text: 'OK', onPress: () =>   {this.saveProfileData()}
              },
            ]

          )
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
                      {this.state.showSaveProfile ?  <TouchableOpacity onPress={()=>this.saveProfileData()}>
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

