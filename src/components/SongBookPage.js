import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Dimensions,
    RefreshControl,
    NetInfo,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { 
  Header, 
  Title,
  Item,
  Input, 
  Button,
  Content,
  Card,
  CardItem
 
} from 'native-base';
import {Actions} from 'react-native-router-flux'
import Config from 'react-native-config'
import axios from 'axios';
import AtoZList from 'react-native-atoz-list';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Spinner from 'react-native-loading-spinner-overlay';
import {tabStyle} from '../style/styles.js'

let SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'church_app_new.db', location: 'default'})

export default class SongBookPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state ={
            songsListData: [],
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
                              this.setState({songsListData:response.data.songs})
                           } else {
                              this.setState({searchedSongsList:response.data.songs})
                              console.log("searched data"+this.state.searchedSongsList)
                           }
                            this.setState({isLoading:false,isRefreshing:false})
                         })
                         .catch((error) =>{
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
  
    componentDidMount() {
        this.fetchSongBooks();

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
      let displayData = (this.state.searchedSongsList.length == 0) ? this.state.songsListData : this.state.searchedSongsList;
      console.log("searched data render"+this.state.searchedSongsList.length == 0 ? true :false)
          return (
           <View style={tabStyle.containerFlexValue}>
             <Header searchBar rounded>
                <Item>
                  <Icon active name="search" size={24} style={tabStyle.searchIconPadding}/>
                  <TextInput 
                    style={tabStyle.searchText}  
                    placeholder="Enter text" 
                    onChangeText ={(text) => this.refreshResults(text)}
                    ref={ref => this.textInputRef = ref}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onSubmitEditing={(event) => this.doSearchSongBooks(event.nativeEvent.text)} />
                    {this.state.searchBoxText =="" ? null : <Icon name="clear" size={24} onPress={()=>this.clearInput()}/>}  
                </Item>
              </Header>
              <ScrollView 
              contentContainerStyle={tabStyle.scrollViewContainer}
              showsVerticalScrollIndicator={false}
              refreshControl={
                    <RefreshControl
                        onRefresh={() => this.onRefreshFunction()}
                        refreshing={this.state.isRefreshing}
                    />
                }
              >
              {this.state.isLoading ? 
                <View style={tabStyle.centerView}>
                  <ActivityIndicator size={"large"} animating={ this.state.isRefreshing ? false :true } color="#3F51B5"/>
                </View> : 
                  (this.state.songsListData.length == 0  && this.state.searchQuery.trim() == "") ? 
                    <View  style={tabStyle.centerView}>
                      <Icon name="signal-wifi-off" size={48}/><Text>There is no internet connection</Text>
                    </View>
                    :
                      (this.state.searchQuery.trim() !== "" && this.state.searchedSongsList.length == 0) ?
                        <View  style={tabStyle.centerView}>
                          <Icon name="search" size={48}/><Text>Sorry, no results were found </Text>
                        </View>
                        :
                        <View  style={tabStyle.tabBounderyMargin}>
                        {displayData.map(item =>
                          <Content key={item.added_date}>
                             <TouchableOpacity onPress={()=>{ console.log("songId "+item.added_date); Actions.songLyrics({title:item.title,songLyrics:item.lyrics,songId:item.added_date})}}>
                              <Card>
                              <CardItem style={tabStyle.songCardItem}>
                                <Text style={tabStyle.songTitleText}>
                                    {item.title}  
                                </Text>
                                <Text numberOfLines={2} ellipsizeMode='tail' style={tabStyle.songLyricsText}>
                                    {item.lyrics}
                                </Text>
                              </CardItem>
                              </Card>
                              </TouchableOpacity>
                          </Content>
                          )}</View> 
                        
                }
              </ScrollView>
              </View>
           )
  }
}






