const mysql = require("mysql");

// Create a connection pool with more reliable settings
const pool = mysql.createPool({
    host: 'mysql-2aca9b8f-bhatiag417-663d.k.aivencloud.com',
    port: '15190',
    user: 'avnadmin',
    password: 'AVNS_zNcBYCpZkhXT2mtKeCG',
    database: 'sms_db',
    connectionLimit: 10,
    connectTimeout: 60000,
    acquireTimeout: 60000,
    timeout: 60000,
    waitForConnections: true,
    queueLimit: 0
});


db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database ");
});


module.exports = db;


