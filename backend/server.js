const express = require("express");
const mysql = require("mysql");


const app = express();
// app.use("/api", server);

// const server = require("./server.js");
// app.use("/api", server);
const port = process.env.PORT || 5000;

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL database connection configuration
const db = mysql.createConnection({
  host: 'mysql-3a77e907-smsbias.d.aivencloud.com',
  port: '18571',
  user: 'avnadmin',
  password: 'AVNS_9Xh3a0omKoSO_qlzFC6',
  database: 'students'
});

// Connect to MySQL database


// API endpoint to handle user registration


// Close the database connection when the server is shut down
process.on('SIGINT', () => {
  db.end((err) => {
    if (err) {
      console.error("Error closing database connection:", err);
    } else {
      console.log("Database connection closed");
    }
    process.exit();
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
  
