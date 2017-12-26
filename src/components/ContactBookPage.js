
// import React, {Component} from 'react'
// import {View,Text,ScrollView,TouchableHighlight,Image,Dimensions,TouchableOpacity} from 'react-native';
// import {Card,CardItem,Content} from 'native-base'
// import {Actions} from 'react-native-router-flux'
// import contactList from './contactListDummy.json'
// import styles from '../style/styles.js'
// import Communications from 'react-native-communications';
// import Icon from 'react-native-vector-icons/MaterialIcons'

// export default class ContactPage extends Component{

//  constructor(){
//         super()
//         this.state ={
//             data: []   
//           }
//           this.getData =this.getData.bind(this);
//     }

//     getData(){
//       const data = contactList.contacts
//       this.setState({data: data})  
      
//     }
//         componentDidMount() {
//         this.getData();
//     }
//     onPressCall() {
//     const url = 'telprompt:5551231234';
//     Linking.canOpenURL(url)
//       .then((supported) => {
//         if (supported) {
//           return Linking.openURL(url)
//             .catch(() => null);
//         }
//       });
// }
//     render() {
//       const data = this.state.data;
//           return (
//           	<View style={styles.container}>
//             <ScrollView>
//              {data.map(item =>
//               <Content>
//               <Card key={item.contact_name}>
//               <CardItem>
//                 <Text style={styles.tabTextSize}>{item.contact_name}</Text>
//               </CardItem>
//               <CardItem >
//               <TouchableOpacity onPress={() => Communications.phonecall(item.contact_number, true)} style={{flexDirection:"row"}}>
//               <Icon name="call" size={24} style={{paddingRight:20}}/>
//               <Text style={styles.tabTextSize}>{item.contact_number}</Text>   
//               </TouchableOpacity>
//               </CardItem>
//               </Card>
//               </Content>
//               )}
//             </ScrollView>
//           </View>
//                 )

                                                                                                                                                                                                                                          
// }
// }


import React, {Component} from 'react'
import {View,Text,ScrollView,Linking,AsyncStorage,TouchableHighlight,Image,Dimensions,TouchableOpacity} from 'react-native';
import { Card,CardItem,Container, Header, Title, Content, H3,Item,Input, List, ListItem, Button, Footer, FooterTab, Left, Right, Body } from 'native-base';
import {Actions} from 'react-native-router-flux'
import contactList from './contactListDummy.json'
import styles from '../style/styles.js'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Config from 'react-native-config'
import axios from 'axios';
let SQLite = require('react-native-sqlite-storage')

import Spinner from 'react-native-loading-spinner-overlay';

export default class ContactPage extends Component{

 constructor(props){
        super(props)
        this.state ={
          tokenValue:this.props.tokenValue,
            dataContactDetail: [],
            showProgress:true   
          }
        let db = SQLite.openDatabase({name: 'test.db', createFromLocation : "~contactDB.db"}, this.openCB, this.errorCB, this.successCB); 
        db.transaction((tx) => {
        tx.executeSql('SELECT * FROM contactDetail', [], (tx, results) => {
           let rows = results.rows.raw();
            rows.map(row => console.log(` email: ${row.email}, name: ${row.name}`));
            this.setState({rows});
        })
      
      })
    }

    dataContacts(){
      const config = { headers: {'Church-App-Id': Config.CHURCH_APP_ID, 'AUTH-TOKEN':this.state.tokenValue} }
      axios.defaults.headers.get[Config.HEADER_KEY_CONTENT_TYPE] = Config.CONTENT_TYPE;
      axios.get(Config.BASE_API_URL + Config.GET_CONTACTS_API_URL, config)
        .then((response) => { 
       console.log("response contacts"+JSON.stringify(response.data.contacts))
       console.log("response contact_name"+JSON.stringify(response.data.contacts.name))
       this.setState({dataContactDetail:response.data.contacts})
        this.setState({showProgress:false})
     })
     .catch(function (error) {
          console.log(error)
          console.log("something went wrong")
          alert('Some error occurred. Please try again later'); 
           this.setState({showProgress:false})
        })     
    }
  async componentDidMount() {
    await AsyncStorage.getItem('token').then((auth_token) => {
      console.log('token1 '+auth_token)
      if (auth_token !== null) {
        this.setState({tokenValue:auth_token})
        // this.dataContacts();
       this.setState({dataContactDetail:contactList.contacts})

        this.setState({showProgress:false})
      }
    })
  }

    callNumber = (url) =>{
       Linking.canOpenURL(url).then(supported => {
       if (!supported) {
        console.log('Can\'t handle url: ' + url);
       } else {
        return Linking.openURL(url);
       }
     }).catch(err => console.error('An error occurred', err));
    }
    render() {
      let data = this.state.dataContactDetail;
      console.log("render "+data)
       if (data.length == 0) {
        return(
       <Spinner visible={this.state.showProgress} size={"large"} color={"#3F51B5"} style={styles.spinnerCustom}/>
      )
      }
          return (
          <View style={{flex:1}}>
                    <Header searchBar rounded>
                      <Item>
                        <Icon active name="search" size={24} style={{paddingLeft:4}}/>
                        <Input placeholder="Search" onChangeText={ (text)=> this.setState({search: text})}/>
                      </Item>
                    </Header>
            <View style={styles.container}>
            <ScrollView>
             {data.map(item =>
              <Content key={item.name}>
              <Card>
              <CardItem>
                <Text style={styles.tabTextSize}>{item.name}</Text>
              </CardItem>
              <CardItem >
              <TouchableOpacity onPress={()=> this.callNumber(`tel:+91${item.contact_number}`)} style={{flexDirection:"row"}}>
              <Icon name="call" size={24} style={{paddingRight:20}}/>
              <Text style={styles.tabTextSize}>{item.contact_number}</Text>   
              </TouchableOpacity>
              </CardItem>
              </Card>
              </Content>
              )}
            </ScrollView>
          </View>
          </View>
                )

                                                                                                                                                                                                                                          
}
}

