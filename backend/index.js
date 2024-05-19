const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
// const server = require("./server.js");
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "mysql-3a77e907-smsbias.d.aivencloud.com",
  port: "18571",
  user: "avnadmin",
  password: "AVNS_9Xh3a0omKoSO_qlzFC6",
  database: "students",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.post("/api/register", (req, res) => {
  const { uid, name, mobile, rollNo, batch, gender, department } = req.body;
  const sql =
    "INSERT INTO users (uid, name, mobile, rollNo, batch, gender, department) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [uid, name, mobile, rollNo, batch, gender, department];

  // Execute the SQL query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error saving user data:", err);
      res
        .status(500)
        .json({ error: "An error occurred while saving user data" });
    } else {
      console.log("User data saved successfully");
      res.status(200).json({ message: "User registered successfully" });
    }
  });
});
  

//showing student data

app.get("/api/users", (req, res) => {
  const { semester, department, gender } = req.query;
  let sql = "SELECT * FROM users WHERE 1=1";
  const values = [];

  if (semester) {
    sql += " AND batch = ?";
    values.push(semester);
  }
  if (department) {
    sql += " AND department = ?";
    values.push(department);
  }
  if (gender) {
    sql += " AND gender = ?";
    values.push(gender);
  }

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error fetching user data:", err);
      res.status(500).json({ error: "An error occurred while fetching user data" });
    } else {
      res.status(200).json(results);
    }
  });
});


// Route to fetch mess timings
app.get("/api/mess/timing", (req, res) => {
  const query = "SELECT * FROM mess_timing";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching mess timings:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    console.table(results);
    res.json(results);
  });
});

app.get("/api/mess_menu", (req, res) => {
  const query = `SELECT * FROM mess_menu`;
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching mess menu:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.get("/api/timetable", (req, res) => {
  const query = "SELECT * FROM timetable";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching mess timings:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    console.table(results);
    res.json(results);
  });
});

// Routes
// Get all notices
app.get("/api/notices/:stream/:semester/:isAdmin", (req, res) => {
  const { semester, stream ,isAdmin} = req.params; // Extract batch and stream from query parameters
 // Assuming 'req.user' contains the authenticated user's info

  let query;
  let queryParams;
// console.log(stream,semester,isAdmin)
  if (isAdmin==="true") {
    query = "SELECT * FROM notices";
    queryParams = [];
  } else {
    query = "SELECT * FROM notices WHERE semester = ? AND stream = ?";
    queryParams = [semester, stream];
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Error fetching notices:", err);
      res.status(500).json({ error: "Error fetching notices" });
      return;
    }
    res.json(results);
  });
});



// Add a new notice
// POST route to add a new notice
app.post("/api/notices/:stream/:semester", (req, res) => {
  const { title, body } = req.body;
  const { semester, stream } = req.params; // Extract semester and stream from URL parameters

  // Get the ID of the last inserted notice
  db.query("SELECT MAX(id) AS maxId FROM notices", (err, result) => {
    if (err) {
      console.error("Error fetching last inserted ID:", err);
      res.status(500).json({ error: "Error adding notice" });
      return;
    }
    // Generate ID for the new notice (increment last inserted ID by 1)
    const newId = result[0].maxId ? result[0].maxId + 1 : 1;

    // Insert the new notice with the generated ID, semester, stream, and batch
    db.query(
      "INSERT INTO notices (id, title, body, stream, semester) VALUES (?, ?, ?, ?, ?)",
      [newId, title, body, stream,semester],
      (err, result) => {
        if (err) {
          console.error("Error adding notice:", err);
          res.status(500).json({ error: "Error adding notice" });
          return;
        }
        res.json({ message: "Notice added successfully" });
      }
    );
  });
});



// DELETE route to delete a notice by ID
app.delete("/api/notices/:id", (req, res) => {
  const noticeId = req.params.id;
  console.log("Deleting notice with ID:", noticeId);
  db.query("DELETE FROM notices WHERE id = ?", [noticeId], (err, result) => {
    if (err) {
      console.error("Error deleting notice:", err);
      res.status(500).json({ error: "Error deleting notice" });
      return;
    }
    res.json({ message: "Notice deleted successfully" });
  });
});



function calculateSemester(batchYear) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // Months are zero-indexed
  const yearsDifference = currentYear - batchYear;
  let semester = yearsDifference * 2 + 1; // Default to the first semester of the current year
  if (currentMonth > 6) {
    // Assume semester changes mid-year (e.g., July)
    semester++;
  }
  return semester;
}


//THIS IS A GENERIC FUNCTION TO GET SEMESTER AND STREAM FROM THE DATABASE
function getUserDetails(uid, callback) {
  const userQuery = "SELECT batch, department FROM users WHERE uid = ?";
  db.query(userQuery, [uid], (error, userResults) => {
    if (error) {
      console.error("Error retrieving user batch:", error);
      callback({ status: 500, error: "Internal server error" });
    } else if (userResults.length === 0) {
      callback({ status: 404, error: "User not found" });
    } else {
      const batchYear = userResults[0].batch;
      const stream = userResults[0].department;
      const currentSemester = calculateSemester(batchYear);
      // console.log(`Calculated semester: ${currentSemester} for batch year: ${batchYear}`);
      callback(null, { batchYear, stream, currentSemester });
    }
  });
}

app.get("/timetable/:uid", (req, res) => {
  const uid = req.params.uid;

  getUserDetails(uid, (error, userDetails) => {
    if (error) {
      return res.status(500).json({ error: "Error retrieving user details" });
    }

    const { currentSemester, stream } = userDetails;

    // Construct the timetable table name based on the user's stream and semester
    const timetableTable = `timetable${stream}${currentSemester}`;

    // Query to retrieve timetable based on the dynamically determined table name
    const timetableQuery = `
    SELECT DayOfWeek, StartTime, EndTime, SubjectName
    FROM ${timetableTable}
    `;

    db.query(timetableQuery, (error, results) => {
      if (error) {
        console.error("Error retrieving timetable:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json(results);
    });
  });
});


//USE THIS AS A MODEL WHEREVER YOU NEED TO GET THE SEM AND STREAM
app.get("/pyq/:uid", (req, res) => {
  const uid = req.params.uid;
  getUserDetails(uid, (error, userDetails) => {
    if (error) {
      return res.status(error.status).json({ error: error.error });
    }
    const { batchYear, stream, currentSemester } = userDetails;
    res.json({ batchYear, stream, currentSemester });
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
