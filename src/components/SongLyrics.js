import React, {Component} from 'react'
import {Text,View,Image,TouchableOpacity} from 'react-native';
import {Button}  from 'native-base'
import styles from '../style/styles.js'
import Config from 'react-native-config'
const queryString = 'Beautiful Garden of Prayer';

export default class EventsDetail extends Component{

  constructor(props){
    super(props);
    console.log("title_name "+this.props.song_name)
    this.state = {
        title:this.props.song_name,
        isLoading: true,
        data: []
    }
  }

  render(){
      return (
        <View style={styles.container}>
          
          <Text style={styles.textSong}>{this.props.text}</Text>

          <Button onPress={() =>{this.callFetchLib();}}>
            <Text>Search YOUTUBE !</Text>
          </Button>

        </View>
      );
  }

  callFetchLib() {
    let formattedString = queryString.replace(/ /g,'+');

    fetch('https://www.googleapis.com/youtube/v3/search?key='+ Config.YOUTUBE_API_KEY +
      '&part=snippet,id&maxResults=5&type=video&videoDefinition=any&q='+ formattedString)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("response in fetch : " + JSON.stringify(responseJson));
      })
      .catch((error) => {
        console.log("error in fetch : "+error);
      });
  }
}