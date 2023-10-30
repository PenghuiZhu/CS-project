const mysql = require('mysql');
//const mysql = require('mariadb');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'sec_connector',
  password: 'password',
  database: 'sec_site'
});

con.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id' + con.threadId);
});



con.end();

