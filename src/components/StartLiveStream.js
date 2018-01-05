import React, {Component} from 'react'
import {View,Text,TouchableOpacity,Image,ScrollView, Platform,} from 'react-native'
import {Header, Card, Title, Left,Button,Right,Icon,Body,Content,CardItem} from 'native-base'
import {Actions} from 'react-native-router-flux'
import styles from '../style/styles.js'
let SQLite = require('react-native-sqlite-storage')
let db;

export default class LiveStreamPage extends Component{
	constructor(){
		super()
		
	}

	render(){
		return(
		<View style={styles.container}>
            <ScrollView>
              	<Content>
	              	<Card>
	              		<CardItem >
	              			<TouchableOpacity onPress={() =>{Actions.live()}} style={{flexDirection:"row"}}>
	              				<Text style={styles.tabTextSize}>Start Live Streaming</Text>   
	              			</TouchableOpacity>
	              		</CardItem>
	              	</Card>
	             <Button onPress={this.openDB()}><Text>OPEN DATABASE</Text></Button>
	             <Button onPress={this.createTable(db)}><Text>Create Table</Text></Button>
				<Button onPress={this.addRow(db)}><Text>Add Row</Text></Button>
				<Button onPress={this.deleteRow(db)}><Text>Delete Row</Text></Button>
				<Button onPress={this.showTable(db)}><Text>SHOW Table</Text></Button>
              	</Content>        
            </ScrollView>
          </View>

			)


	}


	openDB() {

		db = SQLite.openDatabase({name: 'test.db', 
					createFromLocation : "~demo.db"});

		// SQLite.openDatabase(
		// {name: 'churchapp.db', createFromLocation:"demo.db"}).then((DB) => {
		// 	db = DB;
		// }); 
	}
	createTable(db){

		// db.executeSql(
		// 'create table if not exists verse (text varchar(50),bookName varchar(30))')
		// .then(([tx, results]) => {
		// 	console.log("create table query success :: " + results);
		// })
		// .catch((error) => {
		// 	console.log("error in create tableverse :: " + error)
		// });

		db.transaction((tx) => {
        tx.executeSql(
        	// 'SELECT * FROM contactDetail'
		'create table if not exists verse (text varchar(50),bookName varchar(30))'

        	, [], (tx, results) => {
           console.log("reult  "+results)
        })
      
      })
		
		// db.transaction((tx) => {
  //        tx.executeSql('Create Table verse(text varchar(50),bookName varchar(30)'),
  //         (tx, results) => {
  //           // let rows = results.rows.raw();
  //           //  rows.map(row => console.log(` email: ${row.email}, name: ${row.name}`));
  //           //  this.setState({rows});
  //           console.log(results)
  //           console.log("createTable")
  //        }
  //    })
      
      
	}
	errorCB(error){
		console.log(eror)
	}
	showTable(db){
		
		db.transaction((tx) => {
        tx.executeSql(
        	// 'SELECT * FROM contactDetail'
		'show tables'

        	, [], (tx, results) => {
           console.log("reult  "+results)
        })
      
      })
		

		// db.executeSql('show tables')
		// .then(([tx, results]) => {
		// 	console.log("show table query success :: " + results);
		// })
		// .catch((error) => {
		// 	console.log("error in show tableverse :: " + error)
		// });
		// db.transaction((tx) => {
  //        tx.executeSql('SHOW Tables'),
  //         (tx, results) => {
  //           // let rows = results.rows.raw();
  //           //  rows.map(row => console.log(` email: ${row.email}, name: ${row.name}`));
  //           //  this.setState({rows});
  //           console.log(results)
  //           console.log("deleteTable")
  //        }})
      
       // })
	}
	deleteRow(){

	}
	addRow(){

	}
} 

