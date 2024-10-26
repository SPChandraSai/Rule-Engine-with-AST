// backend/config/database.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your DB username
  password: 'Password', // replace with your DB password
  database: 'rule_engine_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database!");
});

module.exports = db;
