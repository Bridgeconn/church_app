
import React, {Component} from 'react'
import {View,Text,ScrollView,TouchableOpacity,Image,Dimensions} from 'react-native';
import {Content,Card,CardItem} from 'native-base'
import {Actions} from 'react-native-router-flux'
import songList from './songbookListDummy.json'
import styles from '../style/styles.js'

export default class SongPage extends Component{

 constructor(){
        super()
        this.state ={
            data: []   
          }
          this.getData =this.getData.bind(this);
    }

    getData(){
      const data = songList.songbooks
      this.setState({data: data})  
      console.log("data"+data)
    }
        componentDidMount() {
        this.getData();
    }
    render() {
      const data = this.state.data;
          return (
                    <View style={styles.container}>
                    <ScrollView>
                       {data.map(item =>
                        <Content key={item.song_name}>
                        <TouchableOpacity  onPress={()=>{Actions.songLyrics({text:item.text,title:item.song_name})}}>
                          <Card>
                            <CardItem>
                       	      <View key={item.id}>
                                  <Text style={styles.songText}>{item.song_name}</Text>
                                  <Text>{item.text}</Text>
                              </View>
                            </CardItem>
                          </Card>
                        </TouchableOpacity>
                        </Content>
                        )}
                    </ScrollView>   
                    </View>
                
                )

                                                                                                                                                                                                                                          
}
}


  
