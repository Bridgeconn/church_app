
import React, {Component} from 'react'
import {View,Text,ScrollView,TouchableOpacity,Image,Dimensions,Share,Button} from 'react-native';
import {ListItem,List,Card,CardItem,Body} from 'native-base'
import {Actions} from 'react-native-router-flux'
import verse from './verseOfTheDayListDummy.json'
import Timestamp from 'react-timestamp';
import styles from '../style/styles.js'

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
      console.log("data"+data)
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
                        <Card key={item.book_name}>
                        <CardItem style={styles.verseListItemStyle}>
                          <Text style={styles.verseTextStyle}>{item.book_name}</Text>
                          <Text style={styles.verseTextStyle}> {item.chapter} : {item.verse_number} </Text>
                          <Text style={styles.verseTextStyle}>{item.version}</Text>
                          <Timestamp time={item.timestamp} component={Text} style={styles.verseTimestamp}/>
                        </CardItem>
                        <CardItem>
                          <Text style={styles.verseTextStyle}>{item.verse_text}</Text>
                        </CardItem>
                        <CardItem>
                        <Button  onPress={this._shareMessage.bind(this,
                          item.verse_text,
                          item.book_name,
                          item.chapter,
                          item.version,
                          item.verse_number)}
                          title="Share"
                          color="#3F51B5"
                          >
                        
                        </Button>
                        </CardItem>
                        </Card>
                        )}
                    </ScrollView>
                    </View>
                )                                                                                                                                                                                                                                        
}
}
