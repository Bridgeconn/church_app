import React, {Component} from 'react'
import {AppRegistry,StyleSheet,Text,ScrollView} from 'react-native';
import {Header, Card, Title, Left,Button,Right,Icon,Body,ListItem,List} from 'native-base'
import Panel from './AccordionEvents';

<<<<<<< HEAD

=======
>>>>>>> 22bd387d3f76abf6b321bda70780f5fdb63ca002
export default class AccordianMenuExample extends Component{
   
  render() {
    return (
      <ScrollView >
         <Panel title="Past">
            <List>
                <ListItem>
                    <Text>
                        1
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        2
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        3
                    </Text>
                </ListItem>
            </List>
        </Panel>  
             
        <Panel title="Today">
            <List>
                <ListItem>
                    <Text>
                        1
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        2
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        3
                    </Text>
                </ListItem>
            </List>
            </Panel>
            <Panel title="Future">
            <List>
                <ListItem>
                    <Text>
                        1
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        2
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        3
                    </Text>
                </ListItem>
            </List>
            </Panel>  
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex            : 1,
    backgroundColor : '#f4f7f9',
    paddingTop      : 30
  },
  
})
