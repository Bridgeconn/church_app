
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
import {View,Text,ScrollView,AsyncStorage,TouchableHighlight,Image,Dimensions,TouchableOpacity} from 'react-native';
import {Card,CardItem,Content} from 'native-base'
import {Actions} from 'react-native-router-flux'
import contactList from './contactListDummy.json'
import styles from '../style/styles.js'
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Config from 'react-native-config'
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
export default class ContactPage extends Component{

 constructor(props){
        super(props)
        this.state ={
          tokenValue:this.props.tokenValue,
            dataContactDetail: [],
            showProgress:true,   
          }
         
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
        this.dataContacts();
        this.setState({showProgress:false})
      }
    })
  }
    onPressCall() {
    const url = 'telprompt:5551231234';
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url)
            .catch(() => null);
        }
      });
}
    render() {
      let data = this.state.dataContactDetail;
      console.log("render "+data)
      if (data.length == 0) {
        <Spinner visible={this.state.showProgress} size={"large"} color={"#3F51B5"} style={styles.spinnerCustom}/>
      }
          return (
            <View style={styles.container}>
            <Spinner visible={this.state.showProgress} size={"large"} color={"#3F51B5"} style={styles.spinnerCustom}/>
            <ScrollView>
             {data.map(item =>
              <Content key={item.name}>
              <Card>
              <CardItem>
                <Text style={styles.tabTextSize}>{item.name}</Text>
              </CardItem>
              <CardItem >
              <TouchableOpacity onPress={() => Communications.phonecall(item.contact_number, true)} style={{flexDirection:"row"}}>
              <Icon name="call" size={24} style={{paddingRight:20}}/>
              <Text style={styles.tabTextSize}>{item.contact_number}</Text>   
              </TouchableOpacity>
              </CardItem>
              </Card>
              </Content>
              )}
            </ScrollView>
          </View>
                )

                                                                                                                                                                                                                                          
}
}

