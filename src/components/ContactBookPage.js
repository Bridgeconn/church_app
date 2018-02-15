

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
    ActivityIndicator,
    Linking
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
import Icon from 'react-native-vector-icons/MaterialIcons'
import Spinner from 'react-native-loading-spinner-overlay';
import {tabStyle} from '../style/styles.js'

let SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'church_app_new.db', location: 'default'})

export default class App extends Component {
    constructor(props ) {
        super(props);

        this.state ={
            dataContactDetail: null,
            isLoading:false,
            searchedData:null,
            searchQuery:"",
            isRefreshing:false,
            searchBoxText:""
          }
        this._renderCell = this._renderCell.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
    }

  fetchContacts(searchText){
      NetInfo.getConnectionInfo()
              .then((connectionInfo) => {
                switch(connectionInfo.type) {
                  case 'cellular': {
                  }
                  case 'wifi': {
                  this.setState({isLoading:true})
                  const config = { headers: {'Church-App-Id': Config.CHURCH_APP_ID, 'AUTH-TOKEN':this.props.tokenValue} }
                  axios.defaults.headers.get[Config.HEADER_KEY_CONTENT_TYPE] = Config.CONTENT_TYPE;
                  let url = Config.BASE_API_URL + Config.GET_CONTACTS_API_URL + (searchText == null ? '' : '?search='+searchText);
                  axios.get(url, config)
                    .then((response) => { 
                      console.log("response contacts "+response.data.contacts)
                         let newnames = _.groupBy(response.data.contacts, (name) => name.name[0].toUpperCase());
                      
                      if (searchText == null) {
                         this.setState({dataContactDetail:newnames})
                      } else {
                        if (response.data.contacts.length >0) {
                          this.setState({searchedData:newnames})
                        }
                      }
                          this.setState({isLoading:false,isRefreshing:false})
                     })
                     .catch((error) =>{
                        console.log(error)
                       this.setState({isLoading:false})
                       this.setState({isRefreshing:false})
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
      this.setState({searchQuery:param})
      this.fetchContacts(param);
  }
  
    componentDidMount() {
        this.fetchContacts(null);
  }
    _renderHeader(data) {
      console.log("data in renderCell"+JSON.stringify(data))
        return (
            <View style={tabStyle.contactList}>
                <Text>{data.sectionId}</Text>
            </View>
        )
    }
    redirectToApp = (url) =>{
      Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        alert("no App found to perform action")
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
      }).catch(err => console.error('An error occurred', err));
    }
      onRefreshFunction(){
         if(this.state.isLoading){
          return
        }
        this.setState({isRefreshing:true})
        this.fetchContacts(this.state.searchQuery.trim() == "" ? null : this.state.searchQuery.trim())
       

      }
     _renderCell(data) {
        console.log("dataaaaaaaaaa "+JSON.stringify(data))
        return (
            <View style={tabStyle.contactBookView}>
                <View style={tabStyle.contactData}>
                <Text>
                    {data.name} 
                </Text>
                <Text>
                    {data.contact_number}
                </Text>
                <View style={{flexDirection:"row"}}>
                <TouchableOpacity onPress={()=>{this.redirectToApp('tel:'+data.contact_number)}}>{data.contact_info_public ? <Icon name="phone" size={20} style={tabStyle.contactPhoneIcon}/> : null}</TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.redirectToApp('mailto:'+data.email)}}>{data.show_email ? <Icon name="email" size={20} style={tabStyle.contactEmailIcon}/> : null}</TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.redirectToApp('sms:'+data.contact_number)}}>{data.contact_info_public ? <Icon name="message" size={20} style={tabStyle.contactSMSIcon}/> : null}</TouchableOpacity>
                </View>
                </View>
              </View>
        );
    }

    refreshResults(text) {
      this.setState({searchBoxText:text});
      console.log("refress called  : "+text)
      if (text.trim() == "") {
        console.log("empty search data");
        this.setState({searchedData:null})
        this.setState({searchQuery:""})
      }
    }

    clearInput = () => {
      this.textInputRef.clear();
      this.refreshResults("");
  }

    render() {
        return (
           <View style={tabStyle.contactView}>
             <Header searchBar rounded>
                <Item>
                  <Icon active name="search" size={24} style={tabStyle.searchIconPadding}/>
                  <TextInput 
                    style={tabStyle.searchText}  
                    placeholder="Enter name or contact" 
                    onChangeText ={(text) => this.refreshResults(text)}
                    ref={ref => this.textInputRef = ref}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onSubmitEditing={(event) => this.SearchFilterFunction(event.nativeEvent.text)} />
                    {this.state.searchBoxText =="" ? null : <Icon name="clear" size={24} onPress={()=>this.clearInput()}/>}  
                  </Item>
              </Header>
              <View style={tabStyle.container}>
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
                  (this.state.dataContactDetail == null  && this.state.searchQuery.trim() == "") ? 
                    <View  style={tabStyle.centerView}>
                      <Icon name="signal-wifi-off" size={48}/><Text>There is no internet connection</Text>
                    </View>
                    :
                      (this.state.searchQuery.trim() !== "" && this.state.searchedData == null) ?
                        <View  style={tabStyle.centerView}>
                          <Icon name="search" size={48}/><Text>Sorry, no results were found </Text>
                        </View>
                        :
                            <AtoZList
                              style={{borderWidth: 0}}
                              sectionHeaderHeight={35}
                              cellHeight={95}
                              data={(this.state.searchedData == null) ? this.state.dataContactDetail : this.state.searchedData}
                              renderCell={this._renderCell}
                              renderSection={this._renderHeader}
                              />
                }
                </ScrollView>
                </View>
              </View>
        )
    }

}






