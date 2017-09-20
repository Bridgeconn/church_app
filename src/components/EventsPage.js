
import React, {Component} from 'react'
import {View,StyleSheet,Text,ScrollView,TouchableHighlight} from 'react-native';
import {ListItem,List} from 'native-base'
import {Actions} from 'react-native-router-flux'
import Panel from './EventsAccordion';
import eventsList from './eventListDummy.json'
export default class EventsPage extends Component{

 constructor(){
        super()
        this.state ={
            data:{}    
          }
          this.getData =this.getData.bind(this);
    }

    getData(){
      const data = eventsList
      this.setState({data: data.events})  
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
                       <View><Text>hello</Text></View>
                       {data.map(item =>
                        <List>
                        <ListItem key={item.events.event_name}><Text>{item.events.event_name}</Text></ListItem>
                        </List>
                        )}
                      
                    </View>
                
                )

       
}
}

var styles = StyleSheet.create({
  container: {
    flex            : 1,
    backgroundColor : '#f4f7f9',
    paddingTop      : 30
  }
})
  
