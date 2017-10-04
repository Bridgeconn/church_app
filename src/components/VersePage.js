
import React, {Component} from 'react'
import {View,StyleSheet,Text,ScrollView,TouchableHighlight,Image,Dimensions} from 'react-native';
import {ListItem,List,Card,CardItem,Body} from 'native-base'
import {Actions} from 'react-native-router-flux'
import verse from './verseOfTheDayListDummy.json'
import Timestamp from 'react-timestamp';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class VersePage extends Component{

 constructor(){
        super()
        this.state ={
            data: []   
          }
          this.getData =this.getData.bind(this);
    }

    getData(){
      const data = verse.verses
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
                        <Card key={item.book_name}>
                        <CardItem style={styles.listItemStyle}>
                          <Text style={styles.textStyle}>{item.book_name}</Text>
                          <Text style={styles.textStyle}> {item.chapter} : {item.verse_number} </Text>
                          <Text style={styles.textStyle}>{item.version}</Text>
                          <Timestamp time={item.timestamp} component={Text} style={styles.timestamp}/>
                        </CardItem>
                        <CardItem>
                          <Text style={styles.textStyle}>{item.verse_text}</Text>
                        </CardItem>
                        </Card>
                        )}
                    </ScrollView>
                    </View>
                
                )

                                                                                                                                                                                                                                          
}
}

var styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"flex-start",
    alignItems:"flex-start",
    backgroundColor:"#fff"
  },
  listStyle:{
    padding:5,
    margin: 5,
    width:width*0.98,
    height:height*0.33
  },
  listItemStyle:{
    borderBottomWidth:0,

  },
  timestamp:{
    paddingLeft:30,
    fontSize:16
  },
  textStyle:{
    padding:0,
    fontSize:20
  }
})
  

