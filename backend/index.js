const express = require('express');
const mysql = require('mysql');

const app = express();
const server = require("./server.js");
app.use("/api", server);
const port = process.env.PORT || 5000;

const db = mysql.createConnection({
  host: 'mysql-3a77e907-smsbias.d.aivencloud.com',
  port: '18571',
  user: 'avnadmin',
  password: 'AVNS_9Xh3a0omKoSO_qlzFC6',
  database: 'students'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Route to fetch mess timings
app.get("/api/mess/timing", (req, res) => {
  const query = "SELECT * FROM mess_timing";
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching mess timings:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.table(results);
    res.json(results);
  });
});

app.get("/", (req, res) => {
  res.send("Backend API is working");
});

app.listen(port, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log("App listening on port:", port);
  }
});
