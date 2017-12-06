
import React, {Component} from 'react'
import {View,Text,ScrollView,TouchableOpacity,Image,Dimensions,Share} from 'react-native';
import {ListItem,List,Card,CardItem,Body} from 'native-base'
import {Actions} from 'react-native-router-flux'
import verse from './verseOfTheDayListDummy.json'
import Timestamp from 'react-timestamp';
import styles from '../style/styles.js'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
export default class VersePage extends Component{

 constructor(){
        super()
        this.state ={
            data: [],
            result:""   
          }
          this.getData =this.getData.bind(this);
          this._shareMessage = this._shareMessage.bind(this);
          this._showResult = this._showResult.bind(this);
    }

    getData(){
      const data = verse.verses
      this.setState({data: data})  
    }
    _showResult(result) {
    this.setState({result});
  }

  _shareMessage(message, book_name, chapter, version, verse_number) {
    let messageText = book_name+" " +chapter+ ":" +verse_number+ " " +version+ "\n" +message;
    Share.share({
      message: messageText
    }).then(this._showResult);
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
                        <Card key={item.book_name} style={styles.cardVerse}>
                        <CardItem style={styles.verseListItemStyle}>
                          <Text style={styles.tabTextSize}>{item.book_name} {item.chapter} : {item.verse_number} {item.version}</Text>
                          <Timestamp time={item.timestamp} component={Text} style={styles.verseTimestamp}/>
                        </CardItem>
                        <CardItem>
                          <Text style={styles.tabTextSize}>{item.verse_text}</Text>
                        </CardItem>
                        <CardItem>
                        <TouchableOpacity  onPress={this._shareMessage.bind(this,
                          item.verse_text,
                          item.book_name,
                          item.chapter,
                          item.version,
                          item.verse_number)}
                          title="Share"
                          color="#3F51B5"
                          >
                          <Icon name="share-variant" size={24} color="#3F51B5"/>
                          </TouchableOpacity>
                        </CardItem>
                        </Card>
                        )}
                    </ScrollView>
                    </View>
                )                                                                                                                                                                                                                                        
}
}
