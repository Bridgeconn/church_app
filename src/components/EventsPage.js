import React, {Component} from 'react'
import {View,Text,TouchableOpacity,Image,ScrollView, Platform,} from 'react-native'
import {Header, Card, Title, Left,Button,Right,Icon,Body} from 'native-base'
import ImagePicker from 'react-native-image-picker';
import styles from '../style/styles.js'
import {Actions} from 'react-native-router-flux'

export default class HomePage extends Component{
 
  render(){
    return(
      <ScrollView>
        <Header>
              <Left>
               <Title>Church App</Title>
              </Left>
              <Right>
                <Button>
                  <Icon name="settings" />
                </Button>
              </Right>
            </Header>

            
        <View style={styles.titleView}>
          <TouchableOpacity>
            <Image source={require('../images/img_events_1.jpg')} style={styles.imageCustom}><Text style={styles.titlePage}>EVENTS</Text></Image>
          </TouchableOpacity>
        </View>
       
      </ScrollView>
      )
  }
} 

