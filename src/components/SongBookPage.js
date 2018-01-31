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
    NetInfo,
    FlatList
} from 'react-native';
import { 
  Header, 
  Title,
  Item,
  Input, 
  Button
 
} from 'native-base';
import {Actions} from 'react-native-router-flux'
import Config from 'react-native-config'
import axios from 'axios';
import AtoZList from 'react-native-atoz-list';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../style/styles.js'
import Toast, {DURATION} from 'react-native-easy-toast'

let SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'church_app_new.db', location: 'default'})

export default class SongBookPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state ={
            songsList: [],
            isLoading:false,
            searchedSongsList:[],
            searchQuery:"",
            isRefreshing:false,
            searchBoxText:""
            
          }
    }


 fetchSongBooks(searchText){
  NetInfo.getConnectionInfo()
              .then((connectionInfo) => {
                switch(connectionInfo.type) {
                  case 'cellular': {
                  }
                  case 'wifi': {
                    this.setState({isLoading:true})
                      const config = { headers: {'Church-App-Id': Config.CHURCH_APP_ID, 'AUTH-TOKEN':this.props.tokenValue,} }
                      axios.defaults.headers.get[Config.HEADER_KEY_CONTENT_TYPE] = Config.CONTENT_TYPE;
                      var url = Config.BASE_API_URL + Config.GET_SONGS_API_URL + (searchText == null ? '' : '?search='+searchText);
                      axios.get(url, config)
                        .then((response) => { 
                           console.log("response contacts"+JSON.stringify(response.data.songs))
                           if (searchText == null) {
                              this.setState({songsList:response.data.songs})
                           } else {
                              this.setState({searchedSongsList:response.data.songs})
                              console.log("searched data"+this.state.searchedSongsList)
                           }
                            this.setState({isLoading:false,isRefreshing:false})
                         })
                         .catch(function (error) {
                            console.log(error)
                            console.log("something went wrong")
                             this.setState({isLoading:false,isRefreshing:false})
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

   doSearchSongBooks(param){
    console.log("text nativeEvent................"+param)
      var text = param.trim()
      if(text == ""){
        return
      }
      this.setState({searchQuery:param})
      this.fetchSongBooks(text);
  }
  
   async componentDidMount() {
        this.fetchSongBooks(null);
     }

       onRefreshFunction(){
        if(this.state.isLoading){
          return
        }
        this.setState({isRefreshing:true})
        this.fetchSongBooks(this.state.searchQuery.trim() == "" ? null : this.state.searchQuery.trim())

      }

    refreshResults(text) {
      this.setState({searchBoxText:text});
      console.log("refress called  : "+text)
      // this.setState({searchQuery:text})
      if (text.trim() == "") {
        console.log("empty search data");
        this.setState({searchedSongsList:[]})
        this.setState({searchQuery:""})

      }
    }


    clearInput = () => {
      this.textInputRef.clear();
      this.refreshResults("");
  
    }

    render() {
      console.log("searched data render"+this.state.searchedSongsList.length == 0 ? true :false)
          return (
           <View style={{flex:1}}>
             <Header searchBar rounded>
                <Item>
                  <Icon active name="search" size={24} style={{paddingLeft:4}}/>
                  <TextInput 
                    style={{width:Dimensions.get('window').width-80}}  
                    placeholder="Enter text" 
                    onChangeText ={(text) => this.refreshResults(text)}
                    ref={ref => this.textInputRef = ref}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onSubmitEditing={(event) => this.doSearchSongBooks(event.nativeEvent.text)} />
                    {this.state.searchBoxText =="" ? null : <Icon name="clear" size={24} onPress={()=>this.clearInput()}/>}  
                </Item>
              </Header>
              <ScrollView 
              contentContainerStyle={{flex:1}}
              showsVerticalScrollIndicator={false}
              refreshControl={
                    <RefreshControl
                        onRefresh={() => this.onRefreshFunction()}
                        refreshing={this.state.isRefreshing}
                    />
                }
              >

              {this.state.isLoading ? 
                <Spinner size={"large"} visible={ this.state.isRefreshing ? false : true } color={"#3F51B5"} style={styles.spinnerCustom}/> : 
                  (this.state.songsList.length == 0  && this.state.searchQuery.trim() == "") ? 
                    <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                      <Icon name="signal-wifi-off" size={48}/><Text>There is no internet connection</Text>
                    </View>
                    :
                      (this.state.searchQuery.trim() !== "" && this.state.searchedSongsList.length == 0) ?
                        <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                          <Icon name="search" size={48}/><Text>Sorry, no results were found </Text>
                        </View>
                        :
                          <View style={{flex:1}}>
                           
                              <FlatList
                              data={(this.state.searchedSongsList.length == 0) ? this.state.songsList : this.state.searchedSongsList}
                              renderItem={({item})=>
                               <View style={styles.cell}>
                               <TouchableOpacity onPress={()=>{Actions.songLyrics({songTitle:item.title,songLyrics:item.lyrics})}}>
                                <View style={{margin:10}}>
                                  <Text style={styles.songTitleText}>
                                      {item.title}  
                                  </Text>
                                  <Text numberOfLines={2} ellipsizeMode='tail' style={styles.songLyricsText}>
                                      {item.lyrics}
                                  </Text>
                                </View>
                                </TouchableOpacity>
                              </View>
                              }
                              />
                          </View>
                }
              </ScrollView>
              </View>
           )
  }
}






