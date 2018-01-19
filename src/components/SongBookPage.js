
// import React, {Component} from 'react'
// import {View,Text,ScrollView,TouchableOpacity,Image,Dimensions,TextInput} from 'react-native';
// import { Card,CardItem,Container, Header, Title, Content, H3,Item,Input, List, ListItem, Button, Footer, FooterTab, Left, Right, Body } from 'native-base';
// import {Actions} from 'react-native-router-flux'
// import songList from './songbookListDummy.json'
// import styles from '../style/styles.js'
// import Icon from 'react-native-vector-icons/MaterialIcons'

// export default class SongPage extends Component{

//  constructor(){
//         super()
//         this.state ={
//             data: [],
//             search:''
//           }
//           this.getData =this.getData.bind(this);
//     }

//     getData(){
//       const data = songList.songbooks
//       this.setState({data: data})  
//     }
//         componentDidMount() {
//         this.getData();
//     }
//     render() {
//       let FilteredData = this.state.data.filter(
//           (data) =>{
//             var songData = data.song_name.toLowerCase();
//             return data.song_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1;
//           }
//         )
//           return (
//                     <View style={{flex:1}}>
//                     <Header searchBar rounded>
//                       <Item>
//                         <Icon active name="search" size={24} style={{paddingLeft:4}}/>
//                         <Input placeholder="Search" onChangeText={ (text)=> this.setState({search: text})}/>
//                       </Item>
//                     </Header>
//                     <View style={styles.container}>
//                     <ScrollView>
//                        {FilteredData.map(item =>
//                         <Content key={item.song_name}>
//                         <TouchableOpacity  onPress={()=>{Actions.songLyrics({text:item.text,title:item.song_name})}}>
//                           <Card>
//                             <CardItem>
//                        	      <View key={item.id}>
//                                   <Text style={styles.tabTextSize}>{item.song_name}</Text>
//                                   <Text numberOfLines={2} ellipsizeMode='tail' style={styles.tabTextSize}>{item.text}</Text>
//                               </View>
//                             </CardItem>
//                           </Card>
//                         </TouchableOpacity>
//                         </Content>
//                         )}
//                     </ScrollView>   
//                     </View>
//                     </View>
//                 )

                                                                                                                                                                                                                                          
// }
// }


  

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    AsyncStorage,
    TouchableOpacity,
    TextInput,
    Dimensions,
    RefreshControl,
    NetInfo
} from 'react-native';
import { 
  Header, 
  Title,
  Item,
  Input, 
  Button
 
} from 'native-base';
import Config from 'react-native-config'
import axios from 'axios';
import AtoZList from 'react-native-atoz-list';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../style/styles.js'
import Toast, {DURATION} from 'react-native-easy-toast'

let SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'church_app_new.db', location: 'default'})

export default class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state ={
            tokenValue:this.props.tokenValue,
            dataContactDetail: [],
            showProgress:false,
            searchedData:[],
            searchQuery:"",
            isRefreshing:false
            
          }
        this._renderCell = this._renderCell.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
    }


 dataContacts(){
  NetInfo.getConnectionInfo()
              .then((connectionInfo) => {
                console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
                console.log('type of connection info type -- ' + typeof connectionInfo.type)
                switch(connectionInfo.type) {
                  case 'cellular': {
                  }
                  case 'wifi': {
                    this.setState({showProgress:true,isRefreshing:true})
                      const config = { headers: {'Church-App-Id': Config.CHURCH_APP_ID, 'AUTH-TOKEN':this.state.tokenValue} }
                      axios.defaults.headers.get[Config.HEADER_KEY_CONTENT_TYPE] = Config.CONTENT_TYPE;
                      axios.get(Config.BASE_API_URL + Config.GET_SONGS_API_URL, config)
                        .then((response) => { 
                           console.log("response contacts"+JSON.stringify(response.data.songs))
                           this.setState({dataContactDetail:response.data.songs})
                           let newnames = _.groupBy(this.state.dataContactDetail, (title) => title.title[0].toUpperCase());
                           this.setState({dataContactDetail:newnames})
                            this.setState({showProgress:false,isRefreshing:false})
                         })
                         .catch(function (error) {
                            console.log(error)
                            console.log("something went wrong")
                             this.setState({showProgress:false,isRefreshing:false})
                          })  
                          break;   
                        }
                    default : {
                    console.log("conenction none or unknoisw")
                    this.setState({isRefreshing:false})

                    break;
                  }
                  }
                })
      
    }

   SearchFilterFunction(param){
    console.log("text nativeEvent................"+param)
      var text = param.trim()
      if(text == ""){
        return
      }
      this.setState({showProgress:true})
      const config = { headers: {'Church-App-Id': Config.CHURCH_APP_ID, 'AUTH-TOKEN':this.state.tokenValue} }
      axios.defaults.headers.get[Config.HEADER_KEY_CONTENT_TYPE] = Config.CONTENT_TYPE;
      axios.get(Config.BASE_API_URL + Config.GET_SONGS_API_URL +'?search='+text , config)
      .then((response) =>{
          console.log("response "+JSON.stringify(response.data))
          this.setState({searchedData:response.data.songs})
          let newnames = _.groupBy(this.state.searchedData, (title) => title.title[0].toUpperCase());
          this.setState({searchedData:newnames})
          console.log("new data list = " + JSON.stringify(this.state.searchedData));
          console.log("new data = " + this.state.searchedData.length);
          console.log("new data len = " + (this.state.searchedData==''));
          this.setState({showProgress:false})
      })
     .catch(function (error) {
        console.log("")
        this.setState({showProgress:false})
      })

  }
  
   async componentDidMount() {
    await AsyncStorage.getItem('token').then((auth_token) => {
      console.log('token1 '+auth_token)
      if (auth_token !== null) {
        this.setState({tokenValue:auth_token})
        this.dataContacts();
      }
    })
  }
    _renderHeader(data) {
      console.log("data in renderCell"+JSON.stringify(data))
        return (
            <View style={{ height: 35, justifyContent: 'center', backgroundColor: '#eee', paddingLeft: 10 }}>
                <Text>{data.sectionId}</Text>
            </View>
        )
    }
     redirectToApp = (url) =>{
       Linking.canOpenURL(url).then(supported => {
       if (!supported) {
        console.log('Can\'t handle url: ' + url);
       } else {
        return Linking.openURL(url);
       }
     }).catch(err => console.error('An error occurred', err));
    }
       onRefreshFunction(){
        if(this.state.showProgress){
          return
        }
        this.setState({isRefreshing:true})
        this.dataContacts()
      }
     _renderCell(data) {
        console.log("dataaaaaaaaaa "+JSON.stringify(data))
        return (
            <View style={styles.cell}>
                <View style={{margin:10}}>
                <Text style={styles.tabTextSize}>
                    {data.title}  
                </Text>
                <Text numberOfLines={2} ellipsizeMode='tail'>
                    {data.lyrics}
                </Text>
                </View>
              </View>
        );
    }

    refreshResults(text) {
      console.log("refress called  : "+text)
      this.setState({searchQuery:text})
      if (text.trim() == "") {
        console.log("empty search data");
        this.setState({searchedData:[]})
      }
    }
    clearInput = () => {
    this.textInputRef.clear();
  }
    render() {
      
          return (
           <View style={{flex:1}}>
             <Header searchBar rounded>
                <Item>
                  <Icon active name="search-web" size={24} style={{paddingLeft:4}}/>
                  <TextInput 
                    style={{width:Dimensions.get('window').width-80}}  
                    placeholder="Enter name or contact" 
                    onChangeText ={(text) => this.refreshResults(text)}
                    ref={ref => this.textInputRef = ref}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onSubmitEditing={(event) => this.SearchFilterFunction(event.nativeEvent.text)} />
                    <Icon name="close" size={24} onPress={()=>this.clearInput()}/>
                </Item>
              </Header>
              <ScrollView 
              showsVerticalScrollIndicator={false}
              refreshControl={
                    <RefreshControl
                        onRefresh={() => this.onRefreshFunction()}
                        refreshing={this.state.isRefreshing}
                    />
                }
              >
              {this.state.showProgress ? 
                <Spinner size={"large"} visible={this.state.isRefreshing ? false :true} color={"#3F51B5"} style={styles.spinnerCustom}/> : 
                  (this.state.dataContactDetail == ''  && this.state.searchQuery.trim() == "") ? 
                    <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}><Icon name="wifi-off" size={48}/><Text>Network Error</Text></View> :
                      (this.state.dataContactDetail == ''  && this.state.searchQuery.trim() ==! "" && this.state.searchedData == '') ?
                        <View><Text>Network Error</Text></View> :
                          <View style={{flex:1}}>
                            <AtoZList
                              sectionHeaderHeight={35}
                              cellHeight={95}
                              data={(this.state.searchedData == '') ? this.state.dataContactDetail : this.state.searchedData}
                              renderCell={this._renderCell}
                              renderSection={this._renderHeader}
                              />
                          </View>
                }
              </ScrollView>
              </View>
           )
  }
}






