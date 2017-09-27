
import React, {Component} from 'react'
import {View,StyleSheet,Text,ScrollView,TouchableHighlight,Image,Dimensions} from 'react-native';
import {ListItem,List} from 'native-base'
import {Actions} from 'react-native-router-flux'
import songList from './songbookListDummy.json'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

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
      let data = this.state.data;
      console.log("render "+data.events)
          return (
                    <View style={styles.container}>
                       {data.map(item =>
                       	<View key={item.id}>
                          <TouchableHighlight  onPress={()=>{Actions.songLyrics({text:item.text,song_name:item.song_name})}}>
                             <Text style={styles.songText}>{item.song_name}</Text>
                          </TouchableHighlight>
                        </View>
                        )}
                    </View>
                
                )

                                                                                                                                                                                                                                          
}
}

var styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent:"flex-start",
    alignItems:"flex-start",
  },
  songText:{
  	fontSize:20,
  	fontWeight:"700",
  	color:"#3F51B5"
  }
})
  
