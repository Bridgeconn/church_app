
//import libararies
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
    
  /**
  *@funtion fetchContacts 
  * Fetch contacts from api    
  * @param {string} searchText 
  * searchText is the text enter in searchbar to search matched data from contact api  
  * 
  * @function NetInfo 
  * get type of internet used and give info about internet if it is present or not 
  */  
  //Fetch contacts from api 
  fetchContacts(searchText){
      NetInfo.getConnectionInfo()
              .then((connectionInfo) => {
                switch(connectionInfo.type) {
                  case 'cellular': {
                  }
                  case 'wifi': {
                    //set state value of laoder as true (show loader) until data is fetching from api
                  this.setState({isLoading:true})
                  const config = { headers: {'Church-App-Id': Config.CHURCH_APP_ID, 'AUTH-TOKEN':this.props.tokenValue} }
                  axios.defaults.headers.get[Config.HEADER_KEY_CONTENT_TYPE] = Config.CONTENT_TYPE;
                  let url = Config.BASE_API_URL + Config.GET_CONTACTS_API_URL + (searchText == null ? '' : '?search='+searchText);
                  axios.get(url, config)
                      //get response data from url
                    .then((response) => { 
                      console.log("response contacts "+response.data.contacts)
                         let newnames = _.groupBy(response.data.contacts, (name) => name.name[0].toUpperCase());
                      //if searched text is null do not search 
                      if (searchText == null) {
                         this.setState({dataContactDetail:newnames})

                      }
                      else {
                        if (response.data.contacts.length > 0) {
                          this.setState({searchedData:newnames})
                        }
                      }
                          this.setState({isLoading:false,isRefreshing:false})
                     })
                     .catch((error) =>{
                      console.log(error)
                       this.setState({isLoading:false,isRefreshing:false})
                      })

                    break;
                  }
                  // if connection if unknown
                  default : {
                    console.log("conenction none or unknown")
                    this.setState({isRefreshing:false})

                    break;
                  }
                }

            })
    }
    /**
    *@function filterSeachedData
    *filter search data 
    *
    *param {string} searchInput 
    *pass textInput value as param to search filter onSubmitEdit function
    *
    *@return 
    *if text input is empty return   
    */
   filterSeachedData(searchInput){
    console.log("text nativeEvent................"+searchInput)
      var text = searchInput.trim()
      if(text == ""){
        return
      }
      this.setState({searchQuery:searchInput})
      this.fetchContacts(searchInput);
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

    /**
    * Linking app or interact with external app for sending e-mail , making call and messaging 
    * @param {string} url
    * open this url for email, call or sms
    *
    * @return
    * return corresponding app link for that url
    */
    redirectToApp = (url) =>{
      //To start the corresponding activity for a link for email, call , message 
      // check if any installed app can handle a given URL
      Linking.canOpenURL(url).then(supported => {
      // if not supported  
      if (!supported) {
        alert("no App found to perform action")
        console.log('Can\'t handle url: ' + url);
      } else {
        //else open linked url 
        return Linking.openURL(url);
      }
      })
      .catch(err => console.error('An error occurred', err));
    }

    /**
    *@function onRefreshFunction 
    *@ var isRefreshing 
    * needs to be set to true in the onRefreshfunction to show refresh indicator  
    *
    *function fetchContacts
    * call fetchContacts inside onRefreshFunction to reload data 
    */
      onRefreshFunction(){
        // if loader is there than return 
         if(this.state.isLoading){
          return
        }
        this.setState({isRefreshing:true})
        // pass value of searchQuery as null if it is empty  else pass value 
        this.fetchContacts(this.state.searchQuery.trim() == "" ? null : this.state.searchQuery.trim())
      }

    /**
    *@function refreshResults 
    *call when input field data changes
    * 
    *@param text
    *input text in inputfield 
    */
      refreshResults(text) {
        this.setState({searchBoxText:text});
        console.log("refress called  : "+text)
        if (text.trim() == "") {
        console.log("empty search data");
        this.setState({searchedData:null})
        this.setState({searchQuery:""})
        }
      }
    /**
    *@function clearInput 
    *clear input field data 
    */
    clearInput = () => {
      this.textInputRef.clear();
      this.refreshResults("");
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
                    onSubmitEditing={(event) => this.filterSeachedData(event.nativeEvent.text)} />
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
              {this.state.isLoading? 
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
                        :<View>
                            <AtoZList
                              style={{borderWidth: 0}}
                              sectionHeaderHeight={35}
                              cellHeight={95}
                              data={(this.state.searchedData == null) ? this.state.dataContactDetail : this.state.searchedData}
                              renderCell={this._renderCell}
                              renderSection={this._renderHeader}
                              />
                        </View>
                }
                </ScrollView>
                </View>
              </View>
        )
    }

}






