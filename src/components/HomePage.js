import React, {Component} from 'react'
import {View,Text,TouchableOpacity,Image,ScrollView, Platform,} from 'react-native'
import {Header, Card, Title, Left,Button,Right,Icon,Body} from 'native-base'
import ImagePicker from 'react-native-image-picker';
import styles from '../style/styles.js'
import {Actions} from 'react-native-router-flux'

export default class HomePage extends Component{
	goToProfile(){
		Actions.profile()
	}
	goToEvents(){
		Actions.events()
	}
	goToLive(){
		Actions.live()
	}
	goToSong(){
		Actions.songs()
	}
	goToContacts(){
		Actions.contacts()
	}
	goToVerse(){
		Actions.verse()
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
			           <Image style={styles.avatar} source={require('../images/person_dummy.png')}>
			          	<TouchableOpacity onPress={this.goToProfile.bind(this)} >
		       		 		<Icon name="create" style={styles.editIcon}/>
		        		</TouchableOpacity>
			          </Image>		
			        </View> 
			        <View style={styles.profileView}>
		        		<Text style={styles.customText}>Name</Text>
		        		<Text style={styles.customText}>Email</Text>
		        		<Text style={styles.customText}>Contact</Text>
		        	</View>
		 		</View>
		 		<View style={styles.titleView}>
		 			<TouchableOpacity onPress={this.goToEvents.bind(this)}>
		 				<Image source={require('../images/img_events_1.jpg')} style={styles.imageCustom}><Text style={styles.titlePage}>EVENTS</Text></Image>
		 			</TouchableOpacity>
		 		</View>
		 		<View style={styles.titleView}>
		 			<TouchableOpacity onPress={this.goToLive.bind(this)}>
		 				<Image source={require('../images/img_livestream_1.jpg')} style={styles.imageCustom}><Text style={styles.titlePage}>LIVE STREAM</Text></Image>
		 			</TouchableOpacity>
		 		</View>
		 		<View style={styles.titleView}>
		 			<TouchableOpacity onPress={this.goToSong.bind(this)}>
		 				<Image source={require('../images/img_songbook_2.jpg')} style={styles.imageCustom}><Text style={styles.titlePage}>SONG BOOK</Text></Image>
		 			</TouchableOpacity>
		 		</View>
		 		<View style={styles.titleView}>
		 			<TouchableOpacity onPress={this.goToContacts.bind(this)}>
		 				<Image source={require('../images/img_contacts_1.jpg')} style={styles.imageCustom}><Text style={styles.titlePage}>CONTACT BOOK</Text></Image>
		 			</TouchableOpacity>
		 		</View>
		 		<View style={styles.titleView}>
		 			<TouchableOpacity onPress={this.goToVerse.bind(this)}>
		 				<Image source={require('../images/img_verseotd_1.jpg')} style={styles.imageCustom}><Text style={styles.titlePage}>VERSE</Text></Image>
		 			</TouchableOpacity>
		 		</View>
			</ScrollView>
			)
	}
} 

