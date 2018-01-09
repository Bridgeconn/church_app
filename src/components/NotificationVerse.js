import React, {Component} from 'react'
import axios from 'axios';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Actions} from 'react-native-router-flux'
import Spinner from 'react-native-loading-spinner-overlay';
import {Card,CardItem,Body,Header,Tab,Tabs} from 'native-base';
import styles from '../style/styles.js'

export default class NotificationVerse extends Component {
  constructor(props){
    super(props)
    console.log("props body"+this.props.notif.title)
    this.state ={
    		data:this.props.notif
    }
  }
 
  render() {
    return (
      <View style={{flex:1}}>
        <Tabs initialPage={0}  tabBarUnderlineStyle={{borderBottomWidth:2}} style={{backgroundColor:"#caced1"}}>
        <Tab heading="Notifications"  textStyle={{color: '#000'}} tabStyle={{backgroundColor: '#caced1'}} activeTabStyle={{backgroundColor:'#0d192b',borderRadius:30,margin:5}} >
         <View style={{flexDirection:"row",backgroundColor:"#000"}}>
            <Image source={{uri:this.state.data.large_icon}} style={{height:50,width:50}}/>
            <Text style={{margin:5,fontSize:18,color:"#fff"}}>{this.state.data.sub_text}</Text>
        </View>
        <View style={{flex:1,backgroundColor:"#2c4f66"}}>
        <View style={[styles.container,{marginTop:20,backgroundColor:"#2c4f66"}]}>
      <ScrollView>
      <View>   
            <Text style={{margin:5,fontWeight:"bold",fontSize:2,color:"#fff"}}>Notification</Text>
            <Text style={{margin:5,fontSize:18,color:"#fff"}}>{this.state.data.title}</Text>
            <Text style={{margin:5,fontSize:18,color:"#fff"}}>{this.state.data.body}</Text>
            <TouchableOpacity onPress={()=>{Actions.pop()}}>
            <Icon name='open-in-new' size={28} color="#fff" style={{alignSelf:"center",margin:28}}/>
            </TouchableOpacity>
      </View>
       <View
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            marginBottom:20
          }}
        />
        <View>
          <View style={{flexDirection:"row"}}> 
            <Icon name='book-multiple' size={28} color="#fff"/>
            <Text style={{margin:5,fontSize:18,color:"#fff"}}>{this.state.data.title}</Text>
      </View>
        </View>
        <View
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            marginBottom:20,
            marginTop:20
          }}
        />
        </ScrollView>
      </View>
      </View>
      </Tab>
        <Tab heading="Verse of the day"  textStyle={{color: '#000'}} tabStyle={{backgroundColor: '#caced1'}} activeTabStyle={{backgroundColor:'#0d192b',borderRadius:30,margin:5}}>
        <View style={{flexDirection:"row",backgroundColor:"#000"}}>
            <Image source={{uri:this.state.data.large_icon}} style={{height:50,width:50}}/>
            <Text style={{margin:5,fontSize:18,color:"#fff"}}>{this.state.data.sub_text}</Text>
        </View>
        <View style={{flex:1,backgroundColor:"#2c4f66"}}>
        <View style={[styles.container,{marginTop:20,backgroundColor:"#2c4f66"}]}>
      <ScrollView>
      
      <View>   
            <Text style={{margin:5,fontWeight:"bold",fontSize:2,color:"#fff"}}>Notification</Text>
            <Text style={{margin:5,fontSize:18,color:"#fff"}}>{this.state.data.title}</Text>
            <Text style={{margin:5,fontSize:18,color:"#fff"}}>{this.state.data.body}</Text>
            <TouchableOpacity onPress={()=>{Actions.pop()}}>
            <Icon name='open-in-new' size={28} color="#fff" style={{alignSelf:"center",margin:28}}/>
            </TouchableOpacity>
      </View>
       <View
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            marginBottom:20
          }}
        />
        <View>
          <View style={{flexDirection:"row"}}> 
            <Icon name='book-multiple' size={28} color="#fff"/>
            <Text style={{margin:5,fontSize:18,color:"#fff"}}>{this.state.data.title}</Text>

      </View>
        </View>
        <View
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            marginBottom:20,
            marginTop:20
          }}
        />
        </ScrollView>
      </View>
      </View>
        </Tab>
      </Tabs>
      
      </View>
    );
  
  }
}
