import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class RightButton extends Component{
	render(){
		return(
			<View style={{flex:1}}>
				<View style={{flexDirection:"row"}}>
	                <TouchableOpacity onPress={()=>{Actions.profile()}}>
	                	<Icon name="account-circle" size={26} color="white" style={{paddingRight:20}}/>
	                </TouchableOpacity>
	                <TouchableOpacity onPress={()=>{Actions.settings()}}>
	                	<Icon name="settings" size={26} color="white" style={{paddingRight:20}}/>
	                </TouchableOpacity>
	            </View>
            </View>
			)
	}
    }

export default RightButton