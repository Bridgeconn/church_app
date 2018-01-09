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
    console.log("props=" + this.props.username + "  " + this.props.contactNum + "  "+ this.props.tokenValue+ " "+this.props.email);
		this.state = {
		    avatarSource: null,
		    videoSource: null,
		    setImage:'',
        checkboxEmail:false,
        checkboxContact:false,
		    isReady: false,
		    status: null,
      	user: this.props.username,
    		uri:this.props.uri, 
        contact:this.props.contactNum,
        token: this.props.tokenValue,
        email: this.props.email,
        newUser:this.props.username,
        newContact:this.props.contactNum,
        newcheckboxEmail:false,
        newcheckboxContact:false,
        showSaveProfile:false
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
  // componentWillUnmount() {
  //   this.props.onRefSave(null)  
  // }

  checkSaveVisibility=(valueName, valueContact, valueCheckEmail, valueCheckContact)=>{
    if (valueName !== null) {
      this.setState({newUser:valueName})
      if (this.state.user !== valueName) {
        this.setState({showSaveProfile:true})
        return;
      }
    }
    if (valueContact !== null) {
      this.setState({newContact:valueContact})
      if (this.state.contact !== valueContact) {
        this.setState({showSaveProfile:true})
        return;
      }
    }
    if (valueCheckEmail !== null) {
      this.setState({newcheckboxEmail:valueCheckEmail})
      if (this.state.checkboxEmail !== valueCheckEmail) {
        this.setState({showSaveProfile:true})
        return;
      }
    }
    if (valueCheckContact !== null) {
      this.setState({newcheckboxContact:valueCheckContact})
      if (this.state.checkboxContact !== valueCheckContact) {
        this.setState({showSaveProfile:true})
        return;
      }
    }

    this.setState({showSaveProfile:false});
    
    if(this.state.user !== valueName || 
      this.state.contact !==valueContact || 
      this.state.checkboxEmail  !==valueCheckEmail ||
      this.state.checkboxContact !==valueCheckContact ){
        this.setState({showSaveProfile:true})
        this.checkSaveVisible(true)
    } else{
        this.setState({showSaveProfile:false})
        this.checkSaveVisible(false)
    }
  }
  
	render(){
		return(
      <View style={{flex:1}}>
                    <Header>
                      <Left>
                        <Button transparent onPress={()=>{Actions.pop()}}>
                          <Icon name='arrow-back'/>
                        </Button>
                      </Left>
                      <Body>
                        <Title style={{textAlign:"left"}}>Profile</Title>
                      </Body>
                      <Right>
                      {this.state.showSaveProfile==true ?  <TouchableOpacity onPress={()=>this.handlePress()}>
                          <Title>Save</Title>
                        </TouchableOpacity>: null}
                      </Right>                      
                    </Header>
		        <View style={styles.profilePageContent}>
			        <View style={styles.profileView}>
		        		<Text>
				          Name
				        </Text>
				        <TextInput
				          placeholder="Enter Name"
				          returnKeyLabel = {"next"}
				          onChangeText={(changeValue) => this.checkSaveVisibility(changeValue,null,null,null)}
                  value={this.state.newUser}
				        />
				        <Text style={{marginTop:12}}>
				          Contact Number
				        </Text>
				        <TextInput
				          placeholder="Enter Contact"
				          returnKeyLabel = {"next"}
				          onChangeText={(changeValue) => this.checkSaveVisibility(null,changeValue,null,null)}
                  value={this.state.newContact}
                  keyboardType="numeric"
				        />
                
                <Text style={{marginTop:12}}>Email</Text>
                <Text style={styles.customEmail}>{this.state.email}</Text>
                <View style={styles.shareContainer}>
                <View style={styles.checkboxContainer}>
                <CheckBox onPress={()=> {
                  this.checkSaveVisibility(null,null,!this.state.newcheckboxEmail,null)
                }} 
                  checked={this.state.newcheckboxEmail} style={{margin:-8,padding:0,flexDirection:"row"}}/>
                  <Text style={styles.checkboxText}>Share email with church members</Text>
                </View>
                <View style={styles.checkboxContainer}>
                <CheckBox onPress={()=>{ 
                  this.checkSaveVisibility(null,null,null,!this.state.newcheckboxContact)
                }} checked={this.state.newcheckboxContact} style={{margin:-8,padding:0,flexDirection:"row"}}/>
                  <Text style={styles.checkboxText}>Share contact with church members</Text>
                </View>
                </View>
					</View>
		  	</View>
		</View>
			)
	}
} 

