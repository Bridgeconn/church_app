import React, {Component} from 'react'
import {View,Text,TouchableOpacity,Image,ScrollView, Platform,} from 'react-native'
import {Header, Card, Title, Left,Button,Right,Icon,Body,Content,CardItem} from 'native-base'
import {Actions} from 'react-native-router-flux'
import styles from '../style/styles.js'

export default class LiveStreamPage extends Component{
	constructor(){
		super()
		
	}
	render(){
		return(
		<View style={styles.container}>
            <ScrollView>
              	<Content>
	              	<Card>
	              		<CardItem >
	              			<TouchableOpacity onPress={() =>{Actions.live()}} style={{flexDirection:"row"}}>
	              				<Text style={styles.tabTextSize}>Start Live Streaming</Text>   
	              			</TouchableOpacity>
	              		</CardItem>
	              	</Card>
              	</Content>        
            </ScrollView>
          </View>
			)
	}
} 

