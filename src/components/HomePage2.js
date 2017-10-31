import React, {Component} from 'react'
import {View,Text,TouchableOpacity,Image,ScrollView, Platform,AsyncStorage,ActivityIndicator, BackHandler,ListView} from 'react-native'
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
export default class HomePage2 extends Component{

	render(){
		return (
		<View>
	      	<BottomNavigation
	        labelColor="white"
	        rippleColor="white"
	        style={{ height: 56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0 }}
	        onTabChange={(newTabIndex) => alert(`New Tab at position ${newTabIndex}`)}
	      	>
		        <Tab
		          barBackgroundColor="#37474F"
		          label="Movies & TV"
		          icon={<Icon size={24} color="white" name="tv" />}
		        />
		        <Tab
		          barBackgroundColor="#00796B"
		          label="Music"
		          icon={<Icon size={24} color="white" name="music-note" />}
		        />
        	</BottomNavigation>
        </View>
        )
	}
	
}



