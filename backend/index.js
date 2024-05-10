const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const app = express();
// const server = require("./server.js");
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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
app.get('/api/mess_menu', (req, res) => {
  const query = `SELECT * FROM mess_menu`;
db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching mess menu:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


// Routes
// Get all notices
app.get('/api/notices', (req, res) => {
  db.query('SELECT * FROM notices', (err, results) => {
    if (err) {
      console.error('Error fetching notices:', err);
      res.status(500).json({ error: 'Error fetching notices' });
      return;
    }
    res.json(results);
  });
});

// Add a new notice
// POST route to add a new notice
app.post('/api/notices', (req, res) => {
  const { title, body } = req.body;
  // Get the ID of the last inserted notice
  db.query('SELECT MAX(id) AS maxId FROM notices', (err, result) => {
    if (err) {
      console.error('Error fetching last inserted ID:', err);
      res.status(500).json({ error: 'Error adding notice' });
      return;
    }
    // Generate ID for the new notice (increment last inserted ID by 1)
    const newId = result[0].maxId ? result[0].maxId + 1 : 1;
    // Insert the new notice with the generated ID
    db.query('INSERT INTO notices (id, title, body) VALUES (?, ?, ?)', [newId, title, body], (err, result) => {
      if (err) {
        console.error('Error adding notice:', err);
        res.status(500).json({ error: 'Error adding notice' });
        return;
      }
      res.json({ message: 'Notice added successfully' });
    });
  });
});

// DELETE route to delete a notice by ID
app.delete('/api/notices/:id', (req, res) => {
  const noticeId = req.params.id;
  console.log('Deleting notice with ID:', noticeId);
  db.query('DELETE FROM notices WHERE id = ?', [noticeId], (err, result) => {
    if (err) {
      console.error('Error deleting notice:', err);
      res.status(500).json({ error: 'Error deleting notice' });
      return;
    }
    res.json({ message: 'Notice deleted successfully' });
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
