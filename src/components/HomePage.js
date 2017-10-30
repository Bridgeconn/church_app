import React, {Component} from 'react'
import {View,Text,TouchableOpacity,Image,ScrollView, Platform,AsyncStorage,ActivityIndicator, BackHandler} from 'react-native'
import {Header, Card, Title, Left,Button,Right,Icon,Body} from 'native-base'
import ImagePicker from 'react-native-image-picker';
import styles from '../style/styles.js'
import {Actions} from 'react-native-router-flux'
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from'react-native-linear-gradient'

export default class HomePage extends Component{
	constructor(props){
		super(props)
		console.log("props contact"+this.props.contactNum)
		console.log("props image uri "+ this.props.imageUri)
		console.log("props value hastoken"+ this.props.hasToken)
		this.state = {
		    ImageOption: null,
		    isLoggedIn:false,
		    hasUri:false,
		    imageUri:this.props.imageUri,
		    username:this.props.username,
		   	contactNum:this.props.contactNum,
		   	itemList:[
		   	{	name:'event',
		   		imagePath:require('../images/img_events_1.jpg'),
		   		Func: () => {
		   			Actions.events()
		   		}
		   	},
		   	{	name:'live',
		   		imagePath:require('../images/img_livestream_1.jpg'),
		   		Func: () => {
		   			Actions.live()
		   		}
		   	},
		   	{	name:'song',
		   		imagePath:require('../images/img_songbook_2.jpg'),
		   		Func:() => {
		   			Actions.songs()
		   		}
		   	},
		   {	name:'verse',
		   		imagePath:require('../images/img_verseotd_1.jpg'),
		   		Func:()=>{
		   			Actions.verse()
		   		}
		   	},
		   	{	name:'contacts',
		   		imagePath:require('../images/img_contacts_1.jpg'),
		   		Func:()=>{
		   			Actions.contacts()
		   		}
		   	},

		   	]
	  	}
	}
	
  	componentWillReceiveProps(props) {
  		console.log("componentWillReceivePropscallback : imageURI=" + props.imageUri)
  		console.log("componentWillReceivePropscallback : imageUSER=" + props.username)
  		this.setState({imageUri:props.imageUri})
  		this.setState({username:props.username})
  		this.setState({contactNum:props.contactNum})
  	}
 	render(){
         	return(
         	<View style={styles.container}>
		        <ScrollView>
		        <View style={{flex:1}}>
		        {
		        	this.state.itemList.map(item => 
		        		<View style={{flex:1}}>
		        		<Text>{item.name}</Text>
		        		<TouchableOpacity onPress={item.Func}>
		        			<Image key={item.name} source={item.imagePath} style={{width:400,height:400}}/>
		        		<LinearGradient  colors={["transparent", "#474747"]} locations={[0.7, 1]} style={styles.linearGradient}>
					   		<Text style={styles.titlePage}>{item.name}</Text>
					    </LinearGradient>
		        		</TouchableOpacity>
		        		</View>
		        	)
		        	
		        }
		        </View>
		        {/*this.props.token || this.props.hasToken==true? <View style={styles.profileContent}>
			        <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
			          	<TouchableOpacity   onPress={()=>{Actions.profile({uri:this.state.imageUri,user:this.state.username,contact:this.state.contactNum})}}>
			          	<Image style={styles.avatar} source={this.state.imageUri==null?require('../images/person_dummy.png'):{uri:this.state.imageUri}}/>
		       		 		<Icon name="create" style={styles.editIcon} />
		        		</TouchableOpacity>
			        </View> 
			        <View style={styles.profileView}>
		        		<Text>{this.state.username}</Text>
		        		<Text>{this.state.contactNum}</Text>
		        	</View>
		 		</View> : null*/}
			</ScrollView>
		</View>
			)
		
	}
} 
