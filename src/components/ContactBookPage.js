
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import { 
  Header, 
  Title,
  Item,
  Input, 
 
} from 'native-base';
import Config from 'react-native-config'
import axios from 'axios';
import AtoZList from 'react-native-atoz-list';
import Icon from 'react-native-vector-icons/MaterialIcons'
let SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'church_app_new.db', location: 'default'})

export default class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state ={
            tokenValue:this.props.tokenValue,
            dataContactDetail: [],
            showProgress:true,
            searchedData:'',
            text:''
          }
        this._renderCell = this._renderCell.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
    }


 dataContacts(){
      const config = { headers: {'Church-App-Id': Config.CHURCH_APP_ID, 'AUTH-TOKEN':this.state.tokenValue} }
      axios.defaults.headers.get[Config.HEADER_KEY_CONTENT_TYPE] = Config.CONTENT_TYPE;
      axios.get(Config.BASE_API_URL + Config.GET_CONTACTS_API_URL, config)
        .then((response) => { 
       console.log("response contacts"+JSON.stringify(response.data.contacts))
       console.log("response name"+JSON.stringify(response.data.contacts[0].name))
       this.setState({dataContactDetail:response.data.contacts})
       let newnames = _.groupBy(this.state.dataContactDetail, (name) => name.name[0].toUpperCase());
       console.log("new name "+newnames)
       this.setState({dataContactDetail:newnames})

        this.setState({showProgress:false})
     })
     .catch(function (error) {
          console.log(error)
          console.log("something went wrong")
          alert('Some error occurred. Please try again later'); 
           this.setState({showProgress:false})
        })     
    }


   SearchFilterFunction(text){
    console.log("text ................"+text)
      const config = { headers: {'Church-App-Id': Config.CHURCH_APP_ID, 'AUTH-TOKEN':this.state.tokenValue} }
      axios.defaults.headers.get[Config.HEADER_KEY_CONTENT_TYPE] = Config.CONTENT_TYPE;
      axios.get(Config.BASE_API_URL + Config.GET_CONTACTS_API_URL +'?search='+text , config)
      .then((response) =>{
        const newData = response.data.contacts.filter(function(item){
          console.log("item   newData"+item.name)
          const itemData = item.name.toUpperCase()
          const textData = text.toUpperCase()
          console.log("textData  "+textData)
          console.log("itemData  "+itemData)
          console.log("search text " +this.state.searchedData)
          // return itemData.indexOf(textData) > -1
        
     })
          this.setState({searchedData:newData})
          console.log("searchedData   "+this.state.searchedData)
        
        
  })

}

   async componentDidMount() {
    await AsyncStorage.getItem('token').then((auth_token) => {
      console.log('token1 '+auth_token)
      if (auth_token !== null) {
        this.setState({tokenValue:auth_token})
        this.dataContacts();
        this.setState({showProgress:false})
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

    render() {
      if (this.state.dataContactDetail.length == 0) {
        console.log("render a to z list in if part")
        return null;
      } else {
        console.log("render a to z list in else part")
        return (
           <View style={{flex:1}}>
                    <Header searchBar rounded>
                      <Item>
                        <Icon active name="search" size={24} style={{paddingLeft:4}}/>
                        <Input placeholder="Search" onChangeText={(text) => this.SearchFilterFunction(text)} />
                      </Item>
                    </Header>
            <View style={{flex:1}}>
              <AtoZList
                sectionHeaderHeight={35}
                cellHeight={95}
                data={this.state.dataContactDetail}
                renderCell={this._renderCell}
                renderSection={this._renderHeader}
                />
            </View>
            </View>
        );
      }
    }
}






const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: '#fff',
    },
    swipeContainer: {
    },
    alphabetSidebar: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderCircle: {
        width: 50,
        height: 50,
        backgroundColor: '#ccc',
        borderRadius: 25,
        marginRight: 10,
        marginLeft: 5,
    },
    name: {
        fontSize: 15,
    },
    cell: {
        height: 95,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
});