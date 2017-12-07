
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
export default class ContactPage extends Component{

 constructor(props){
        super(props)
        this.state ={
          tokenValue:this.props.tokenValue,
            data: []   
          }
         
    }

    DataContacts(){
      const config = { headers: {'Church-App-Id': Config.CHURCH_APP_ID, 'AUTH-TOKEN':this.state.tokenValue} }
      axios.defaults.headers.get[Config.HEADER_KEY_CONTENT_TYPE] = Config.CONTENT_TYPE;
      axios.get(Config.BASE_API_URL + Config.CONTACTS_API_URL, config)
        .then((response) => { 
       console.log("response contacts"+JSON.stringify(response.data.contacts))
       console.log("response contact_name"+JSON.stringify(response.data.contacts.name))
       this.setState({data:response.data.contacts})
     })
     .catch(function (error) {
          console.log(error)
          console.log("something went wrong")
          alert('Some error occurred. Please try again later'); 
        })     
    }
  async componentDidMount() {
    await AsyncStorage.getItem('token').then((auth_token) => {
      console.log('token1 '+auth_token)
      if (auth_token !== null) {
        this.setState({tokenValue:auth_token})
        this.DataContacts();
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
      let data = this.state.data;
      console.log("render "+data)
      if (data.length == 0) {
        return null;
      }
          return (
            <View style={styles.container}>
            <ScrollView>
             {data.map(item =>
              <Content>
              <Card key={item.name}>
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

