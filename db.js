const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootpassword',        // 👈 If no password, leave as empty string. Otherwise, enter your MySQL password here.
  database: 'pharmacy_db'  // ✅ Replace with your actual DB name
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;
