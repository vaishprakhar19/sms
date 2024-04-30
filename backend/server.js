const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

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
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    process.exit(1); // Exit the process if unable to connect
  }
  console.log("Connected to MySQL database");
});

// API endpoint to handle user registration
app.post("/api/register", (req, res) => {
  const { uid, name, mobile, rollNo, batch, gender, department } = req.body;

  const sql = "INSERT INTO users (uid, name, mobile, rollNo, batch, gender, department) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [uid, name, mobile, rollNo, batch, gender, department];

  // Execute the SQL query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error saving user data:", err);
      res.status(500).json({ error: "An error occurred while saving user data" });
    } else {
      console.log("User data saved successfully");
      res.status(200).json({ message: "User registered successfully" });
    }
  });
});

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
  
