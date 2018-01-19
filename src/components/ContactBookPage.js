
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
    RefreshControl
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
      this.setState({showProgress:true})
      const config = { headers: {'Church-App-Id': Config.CHURCH_APP_ID, 'AUTH-TOKEN':this.state.tokenValue} }
      axios.defaults.headers.get[Config.HEADER_KEY_CONTENT_TYPE] = Config.CONTENT_TYPE;
      axios.get(Config.BASE_API_URL + Config.GET_CONTACTS_API_URL, config)
        .then((response) => { 
           console.log("response contacts"+JSON.stringify(response.data.contacts))
           this.setState({dataContactDetail:response.data.contacts})
           let newnames = _.groupBy(this.state.dataContactDetail, (name) => name.name[0].toUpperCase());
           this.setState({dataContactDetail:newnames})
            this.setState({showProgress:false,isRefreshing:false})
         })
         .catch(function (error) {
            console.log(error)
            console.log("something went wrong")
             // this.refs.toast.show('hello world!');
             this.setState({showProgress:false,isRefreshing:false})
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
      axios.get(Config.BASE_API_URL + Config.GET_CONTACTS_API_URL +'?search='+text , config)
      .then((response) =>{
          console.log("response "+JSON.stringify(response.data))
          this.setState({searchedData:response.data.contacts})
          let newnames = _.groupBy(this.state.searchedData, (name) => name.name[0].toUpperCase());
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
        // this.setState({isRefreshing:true})
        // const config = { headers: {'Church-App-Id': Config.CHURCH_APP_ID, 'AUTH-TOKEN':this.state.tokenValue} }
        // axios.defaults.headers.get[Config.HEADER_KEY_CONTENT_TYPE] = Config.CONTENT_TYPE;
        // axios.get(Config.BASE_API_URL + Config.GET_CONTACTS_API_URL, config)
        // .then((response) => { 
        //    console.log("response contacts"+JSON.stringify(response.data.contacts))
        //    this.setState({dataContactDetail:response.data.contacts})
        //    let newnames = _.groupBy(this.state.dataContactDetail, (name) => name.name[0].toUpperCase());
        //    this.setState({dataContactDetail:newnames})
        //     this.setState({isRefreshing:false})
        //  })
        //  .catch(function (error) {
        //     console.log(error)
        //     console.log("something went wrong")
        //      // this.refs.toast.show('hello world!');
        //      this.setState({isRefreshing:false})
        //   })     
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
      console.log("refreshing   "+this.state.isRefreshing)
      console.log("show loader progress "+this.state.showProgress)
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
                        onRefresh={this.onRefreshFunction.bind(this)}
                        refreshing={this.state.isRefreshing}
                    />
                }
              >
              {this.state.showProgress ? 
                <Spinner size={"large"} visible={ this.state.isRefreshing ? false :true} color={"#3F51B5"} style={styles.spinnerCustom}/> : 
                  (this.state.dataContactDetail == ''  && this.state.searchQuery.trim() == "") ? 
                    <View><Text>Network Error</Text></View> :
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






