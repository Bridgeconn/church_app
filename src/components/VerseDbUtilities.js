let SQLite = require('react-native-sqlite-storage')
export class VerseDb {
	let db = SQLite.openDatabase(
		{name: 'churchapp.db'}, 
		this.openCB, this.errorCB, this.successCB); 
     db.transaction((tx) => {
        tx.executeSql('SELECT * FROM VerseDB', [], (tx, results) => {
           let rows = results.rows.raw();
            rows.map(row => console.log(` email: ${row.email}, name: ${row.name}`));
            this.setState({rows});
        }
        );
      })   
}