import React, {Component} from 'react'
import {Text,View, ScrollView} from 'react-native';
import styles from '../style/styles.js'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Actions} from 'react-native-router-flux'

export default class EventsDetail extends Component{

  constructor(props){
    super(props);
  }

  render(){
      return (
        <View style={styles.container}>

          <ScrollView style={styles.songLyricsScrollView} showsVerticalScrollIndicator={false}>
            <View>
              <Text style={styles.textSong}>{this.props.songLyrics + '\n\n\n\n'}</Text>
            </View>
          </ScrollView>

          <Icon color={'#cc181e'} 
            onPress={() => {
              Actions.youtubeSongSearch({title:this.props.title, songId:this.props.songId})
            }}
            name="youtube-play" 
            size={60} 
            style={styles.youtubeButton}/>
        </View>
      );
  }
}