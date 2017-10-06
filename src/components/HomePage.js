import React, {Component} from 'react'
import {View,Text,TouchableOpacity,Image,ScrollView, Platform,AsyncStorage,ActivityIndicator, BackHandler} from 'react-native'
import {Header, Card, Title, Left,Button,Right,Icon,Body} from 'native-base'
import ImagePicker from 'react-native-image-picker';
import styles from '../style/styles.js'
import {Actions} from 'react-native-router-flux'

export default class HomePage extends Component{
	constructor(props){
		super(props)
		console.log("props image uri "+ this.props.imageUri)
		console.log("props value hastoken"+ this.props.hasToken)
		this.state = {
		    ImageOption: null,
		    isLoggedIn:false,
		    hasUri:false,
		    imageUri:this.props.imageUri
	  	}
	  	this.userLogout = this.userLogout.bind(this)
	}
	async userLogout(){
    try {
    await AsyncStorage.removeItem('token');
    await  AsyncStorage.removeItem('guest');
    await  AsyncStorage.removeItem('uri')
    console.log('remove loginkey')
      Actions.user({hasToken:false, guestKey:false});  
      alert('Logout Success!');
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  	}

	render(){
         	return(
         	<View style={styles.container}>
				<Header>
		          <Left>
		           <Title>Church App</Title>
		          </Left>
		          <Right>
		            	<TouchableOpacity onPress={this.userLogout.bind(this)}>
		              		<Text>logout</Text>
		              	</TouchableOpacity>
		          </Right>
		        </Header>
		        <ScrollView>
		        {this.props.token || this.props.hasToken==true? <View style={styles.profileContent}>
			        <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>

			           <Image style={styles.avatar} source={this.state.imageUri==null?require('../images/person_dummy.png'):{uri:this.state.imageUri}}>
			          	<TouchableOpacity onPress={()=>{Actions.profile({uri:this.state.imageUri})}}>
		       		 		<Icon name="create" style={styles.editIcon}/>
		        		</TouchableOpacity>
			          	</Image>    
			          	
			        </View> 

			        <View style={styles.profileView}>
		        		<Text>Name: {this.props.username}</Text>
		        		<Text>{this.props.token}</Text>
		        		<Text>Contact: {this.props.contact}</Text>
		        	</View>
		 		</View> : null}
		 		<View style={styles.titleView}>
		 			<TouchableOpacity onPress={()=>{Actions.events()}}>
		 				<Image source={require('../images/img_events_1.jpg')} style={styles.imageCustom}>
		 				<Text style={styles.titlePage}>EVENTS</Text></Image>
		 			</TouchableOpacity>
		 		</View>
		 		<View style={styles.titleView}>
		 			<TouchableOpacity onPress={()=>{Actions.live()}}>
		 				<Image source={require('../images/img_livestream_1.jpg')} style={styles.imageCustom}><Text style={styles.titlePage}>LIVE STREAM</Text></Image>
		 			</TouchableOpacity>
		 		</View>
		 		<View style={styles.titleView}>
		 			<TouchableOpacity onPress={()=>{Actions.songs()}}>
		 				<Image source={require('../images/img_songbook_2.jpg')} style={styles.imageCustom}><Text style={styles.titlePage}>SONG BOOK</Text></Image>
		 			</TouchableOpacity>
		 		</View>
		 		<View style={styles.titleView}>
		 			<TouchableOpacity onPress={()=>{Actions.contacts()}}>
		 				<Image source={require('../images/img_contacts_1.jpg')} style={styles.imageCustom}><Text style={styles.titlePage}>CONTACT BOOK</Text></Image>
		 			</TouchableOpacity>
		 		</View>
		 		<View style={styles.titleView}>
		 			<TouchableOpacity onPress={()=>{Actions.verse()}}>
		 				<Image source={require('../images/img_verseotd_1.jpg')} style={styles.imageCustom}><Text style={styles.titlePage}>VERSE</Text></Image>
		 			</TouchableOpacity>
		 		</View>
			</ScrollView>
		</View>
			)
		
	}
} 
