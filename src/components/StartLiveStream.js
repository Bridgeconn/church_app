import React, {Component} from 'react'
import {View,Text,TouchableOpacity,Image,ScrollView, Platform,} from 'react-native'
import {Header, Card, Title, Left,Button,Right,Icon,Body,Content,CardItem} from 'native-base'
import {Actions} from 'react-native-router-flux'
import styles from '../style/styles.js'
let SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'church_app_new.db', location: 'default'})

export default class LiveStreamPage extends Component{
	constructor(){
		super()
	}

	createTable(){
		console.log("createTable")
		 db.transaction((tx)=>{
			tx.executeSql('CREATE TABLE IF NOT EXISTS verseOfTheDay (data text, data_num integer)',[],(tx, res)=>{
				console.log("Table created",JSON.stringify(res))
			})
		 })

	}
	addRow(){
		db.transaction((tx)=>{
			 tx.executeSql("INSERT INTO verseOfTheDay (data, data_num) VALUES (?,?)", ["test", 100], function(tx, res) {
			 	    console.log("insertId: " + res.insertId + " -- probably 1");
                	console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
			 })

		})

	}
	showTable(){
	db.transaction((tx) => {
      tx.executeSql('SELECT * FROM verseOfTheDay', [], function(tx,res){
          console.log("Query completed");
          console.log("data response",JSON.stringify(res))
          let rows = res.rows.raw();
            rows.map(row => console.log(`data_num: ${row.data_num}`));
          
        })
    })

	
}
	deleteRow(){
		db.transaction((tx) => {
      		tx.executeSql('DROP TABLE IF EXISTS  verseOfTheDay')
      		console.log("deleted table")
    	})
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
	            <Button onPress={()=>this.createTable()} style={{margin:5}}><Text>Create Table</Text></Button>
				<Button onPress={()=>this.addRow()} style={{margin:5}}><Text>Add Row</Text></Button>
				<Button onPress={()=>this.showTable()} style={{margin:5}}><Text>Show Table</Text></Button>
				<Button onPress={()=>this.deleteRow()} style={{margin:5}}><Text>Delete Row</Text></Button>
              	</Content>        
            </ScrollView>
          </View>

			)


	}


	
} 

