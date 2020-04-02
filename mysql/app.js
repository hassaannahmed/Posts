// app.js
const mysql = require('mysql');

// First you need to create a connection to the db
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'picturealbum',
});

connection.connect((err) => {
  if(err){
      console.log(err)
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});
connection.query('SELECT * FROM users', (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Db:\n');
    rows.forEach( (row) => {
        console.log(`${row.username} has password ${row.password}`);
      });
  });

connection.end((err) => {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});