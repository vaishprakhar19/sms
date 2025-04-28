const mysql = require("mysql");

const db = mysql.createConnection({
    host: 'mysql-3a77e907-smsbias.d.aivencloud.com',
    port: '18571',
    user: 'avnadmin',
    password: 'AVNS_9Xh3a0omKoSO_qlzFC6',
    database: 'students'
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database ");
});


module.exports = db;