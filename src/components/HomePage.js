import React, {Component} from 'react'
import {View,Text,TouchableOpacity,Image,ScrollView, Platform,AsyncStorage,ActivityIndicator, BackHandler,ListView} from 'react-native'
import ImagePicker from 'react-native-image-picker';
import styles from '../style/styles.js'
import {Actions} from 'react-native-router-flux'
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class HomePage extends Component{
	constructor(props){
		super(props)
		console.log("props contact"+this.props.contactNum)
		console.log("props image uri "+ this.props.imageUri)
		console.log("props value hastoken home"+ this.props.hasToken)
		console.log("props value token home"+ this.props.token)
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		const ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
		    ImageOption: null,
		    isLoggedIn:false,
		    hasUri:false,
		    imageUri:this.props.imageUri,
		    username:this.props.username,
		   	contactNum:this.props.contactNum,
		   	dataSource: ds.cloneWithRows([{	
		   		name:'Events',
		   		imagePath:require('../images/img_events_1.jpg'),
		   		goToFunc: () => {
		   			Actions.events()
		   		}
		   	},
		   	{	name:'Livestream',
		   		imagePath:require('../images/img_livestream_1.jpg'),
		   		goToFunc: () => {
		   			Actions.live()
		   		}
		   	},
		   	{	name:'Songbook',
		   		imagePath:require('../images/img_songbook_2.jpg'),
		   		goToFunc:() => {
		   			Actions.songs()
		   		}
		   	},
		   {	name:'Verse of the day',
		   		imagePath:require('../images/img_verseotd_1.jpg'),
		   		goToFunc:()=>{
		   			Actions.verse()
		   		}
		   	},
		   	

			]),
			dataSource2: ds2.cloneWithRows([
		   	{	name:'Contacts',
		   		imagePath:require('../images/img_contacts_1.jpg'),
		   		goToFunc:()=>{
		   			Actions.contacts()

		   		}
		   	},

			])
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
         	<View style={{flex:1}}>
		        <ScrollView>
		        <View style={styles.container}>
		        <ListView
			        contentContainerStyle={styles.listView}
			        dataSource={this.state.dataSource}
			        renderRow={(data) => 
			        	<View style={styles.card}>
		        		<TouchableOpacity onPress={data.goToFunc}>
		        			<Image source={data.imagePath} style={styles.imageCustom}/>
		        		<LinearGradient  colors={["transparent", "#474747"]} locations={[0.7, 1]} style={styles.linearGradient}>
					   		<Text style={styles.titlePage}>{data.name}</Text>
					    </LinearGradient>
		        		</TouchableOpacity>
		        		</View>
			        }
			    />
			    { this.props.token || this.props.hasToken==true? 
			    <ListView
			        contentContainerStyle={styles.listView}
			        dataSource={this.state.dataSource2}
			        renderRow={(data) => 
			        	<View style={styles.card}>
		        		<TouchableOpacity onPress={data.goToFunc}>
		        			<Image source={data.imagePath} style={styles.imageCustom}/>
		        		<LinearGradient  colors={["transparent", "#474747"]} locations={[0.7, 1]} style={styles.linearGradient}>
					   		<Text style={styles.titlePage}>{data.name}</Text>
					    </LinearGradient>
		        		</TouchableOpacity>
		        		</View>
			        }
			    /> :null}
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
