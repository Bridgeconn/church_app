
import React, {Component} from 'react'
import {View,Text,ScrollView,TouchableOpacity,Image,Dimensions,TextInput} from 'react-native';
import { Card,CardItem,Container, Header, Title, Content, H3,Item,Input, List, ListItem, Button, Footer, FooterTab, Left, Right, Body } from 'native-base';
import {Actions} from 'react-native-router-flux'
import songList from './songbookListDummy.json'
import styles from '../style/styles.js'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class SongPage extends Component{

 constructor(){
        super()
        this.state ={
            data: [],
            search:''
          }
          this.getData =this.getData.bind(this);
    }

    getData(){
      const data = songList.songbooks
      this.setState({data: data})  
    }
        componentDidMount() {
        this.getData();
    }
    render() {
      let FilteredData = this.state.data.filter(
          (data) =>{
            var songData = data.song_name.toLowerCase();
            return data.song_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1;
          }
        )
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
                       {FilteredData.map(item =>
                        <Content key={item.song_name}>
                        <TouchableOpacity  onPress={()=>{Actions.songLyrics({text:item.text,title:item.song_name})}}>
                          <Card>
                            <CardItem>
                       	      <View key={item.id}>
                                  <Text style={styles.tabTextSize}>{item.song_name}</Text>
                                  <Text numberOfLines={1} ellipsizeMode='tail' style={styles.tabTextSize}>{item.text}</Text>
                              </View>
                            </CardItem>
                          </Card>
                        </TouchableOpacity>
                        </Content>
                        )}
                    </ScrollView>   
                    </View>
                  </View>
                )

                                                                                                                                                                                                                                          
}
}


  
