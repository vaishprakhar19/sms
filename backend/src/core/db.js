const mysql = require("mysql2");

const db = mysql.createConnection({
    host: 'mysql-2aca9b8f-bhatiag417-663d.k.aivencloud.com',
    port: '15190',
    user: 'avnadmin',
    password: 'AVNS_zNcBYCpZkhXT2mtKeCG',
    database: 'sms_db'
});

// Test the connection with a ping
db.ping((err) => {
  if (err) {
    console.error('Error pinging database:', err);
    console.error('Error code:', err.code);
    console.error('Error message:', err.message);
    return;
  }
  console.log('Database connection is alive');
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    console.error("Error code:", err.code);
    console.error("Error message:", err.message);
    return;
  }
  console.log("Connected to MySQL database");
});

// Handle connection errors
db.on('error', (err) => {
  console.error('Database error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Database connection was closed.');
  }
  if (err.code === 'ER_CON_COUNT_ERROR') {
    console.error('Database has too many connections.');
  }
  if (err.code === 'ECONNREFUSED') {
    console.error('Database connection was refused.');
  }
});

module.exports = db;