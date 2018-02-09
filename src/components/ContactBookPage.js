
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
    ActivityIndicator
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
import styles from '../style/styles.js'
import Toast, {DURATION} from 'react-native-easy-toast'

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
         if(this.state.isLoading){
          return
        }
        this.setState({isRefreshing:true})
        this.fetchContacts(this.state.searchQuery.trim() == "" ? null : this.state.searchQuery.trim())
       

      }
     _renderCell(data) {
        console.log("dataaaaaaaaaa "+JSON.stringify(data))
        return (
            <View style={styles.cell}>
                <View style={{margin:10}}>
                <Text style={styles.name}>
                    {data.name} 
                </Text>
                <Text style={styles.name}>
                    {data.contact_number}
                </Text>
                <View style={{flexDirection:"row"}}>
                <TouchableOpacity onPress={()=>{this.redirectToApp('tel:+91${data.contact_num')}}><Icon name="phone" size={20} style={{margin:10,marginLeft:0}}/></TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.redirectToApp(`mailto:somethingemail@gmail.com?subject=abcdefg&body=body`)}}><Icon name="email" size={20} style={{margin:10}}/></TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.redirectToApp(`sms:number?body=yourMessage`)}}><Icon name="message" size={20} style={{margin:10}}/></TouchableOpacity>
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
           <View style={{flex:1}}>
             <Header searchBar rounded>
                <Item>
                  <Icon active name="search" size={24} style={{paddingLeft:4}}/>
                  <TextInput 
                    style={{width:Dimensions.get('window').width-80}}  
                    placeholder="Enter name or contact" 
                    onChangeText ={(text) => this.refreshResults(text)}
                    ref={ref => this.textInputRef = ref}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onSubmitEditing={(event) => this.SearchFilterFunction(event.nativeEvent.text)} />
                    {this.state.searchBoxText =="" ? null : <Icon name="clear" size={24} onPress={()=>this.clearInput()}/>}  
                  </Item>
              </Header>
              <View style={styles.container}>
              <ScrollView 
              contentContainerStyle={{flexGrow:1}}
                showsVerticalScrollIndicator={false}
                refreshControl={
                      <RefreshControl
                          onRefresh={() => this.onRefreshFunction()}
                          refreshing={this.state.isRefreshing}
                      />
                  }
                >
              {this.state.isLoading ? 
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                  <ActivityIndicator size={"large"} animating={ this.state.isRefreshing ? false :true } color="#3F51B5"/>
                  </View> : 
                  (this.state.dataContactDetail == null  && this.state.searchQuery.trim() == "") ? 
                    <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                      <Icon name="signal-wifi-off" size={48}/><Text>There is no internet connection</Text>
                    </View>
                    :
                      (this.state.searchQuery.trim() !== "" && this.state.searchedData == null) ?
                        <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                          <Icon name="search" size={48}/><Text>Sorry, no results were found </Text>
                        </View>
                        :
                          <View style={{flex:1}}>
                            <AtoZList
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






