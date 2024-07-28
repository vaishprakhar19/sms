const express = require("express");
const mysql = require("mysql");
const cors = require('cors');
const bodyParser = require("body-parser");
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
// const server = require("./server.js");
const port = process.env.PORT || 5000;

app.use(cors({
  origin:["https://biasportal.vercel.app"],
  method:["POST","GET","DELETE"],
  credentials:true
}));

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
// WebSocket connection
const io = socketIo(server)
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
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
    // console.table(results);
    res.json(results);
  });
});
app.post("/api/mess/timing/update", (req, res) => {
  const updatedTimings = req.body.updatedTimings;

  // Here you should add code to update your database with the new timings
  // For simplicity, let's assume you're using MySQL and the table name is 'mess_timing'

  updatedTimings.forEach((timing) => {
    const query = "UPDATE mess_timing SET timing = ? WHERE day = ? AND meal_type = ? AND gender = ?";
    db.query(query, [timing.timing, timing.day, timing.meal_type, timing.gender], (err, results) => {
      if (err) {
        console.error("Error updating mess timings:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
    });
  });

  // After all updates, fetch the updated timings to return to the client
  db.query("SELECT * FROM mess_timing", (err, results) => {
    if (err) {
      console.error("Error fetching updated mess timings:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results);
  });
});



//messmenu
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

app.post("/api/update_mess_menu", (req, res) => {
  const updatedMenuData = req.body;

  // Assuming you have a function to update the database
  updateMenuDataInDatabase(updatedMenuData)
    .then(() => {
      res.status(200).json({ message: "Menu data updated successfully" });
    })
    .catch((error) => {
      console.error("Error updating mess menu:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

function updateMenuDataInDatabase(updatedMenuData) {
  return new Promise((resolve, reject) => {
    const updateQueries = updatedMenuData.map(item => {
      return new Promise((resolve, reject) => {
        const query = `UPDATE mess_menu SET 
                       breakfast = ?,
                       lunch = ?,
                       evening_snacks = ?,
                       dinner = ?
                       WHERE menu_id = ?`;
        const values = [item.breakfast, item.lunch, item.evening_snacks, item.dinner, item.menu_id];
        db.query(query, values, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    });

    Promise.all(updateQueries)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}





// Routes
// Get all notices
app.get("/api/notices/:stream/:semester/:isAdmin", (req, res) => {
  const { semester, stream, isAdmin } = req.params; // Extract semester, stream, and isAdmin from request parameters

  let query;
  let queryParams;

  if (isAdmin === "true") {
    query = "SELECT * FROM notices ORDER BY id DESC"; // Order notices by created_at descending for admins
    queryParams = [];
  } else {
    query = `
      SELECT * FROM notices 
      WHERE (semester = ? OR semester IS NULL) 
      AND (stream = ? OR stream IS NULL) 
      ORDER BY id DESC
    `; // Order notices by created_at descending for non-admins
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
app.post("/api/notices/:stream?/:semester?", (req, res) => {
  const { title, body, newId } = req.body;
  const { stream, semester } = req.params; // Extract semester and stream from URL parameters

  // // Get the ID of the last inserted notice
  // db.query("SELECT MAX(id) AS maxId FROM notices", (err, result) => {
  //   if (err) {
  //     console.error("Error fetching last inserted ID:", err);
  //     res.status(500).json({ error: "Error adding notice" });
  //     return;
  //   }
  // Generate ID for the new notice (increment last inserted ID by 1)
  // const newId = result[0].maxId ? result[0].maxId + 1 : 1;

  // Insert the new notice with the generated ID, semester, stream, and batch
  db.query(
    "INSERT INTO notices (id, title, body, stream, semester) VALUES (?, ?, ?, ?, ?)",
    [newId, title, body, stream || null, semester || null],
    (err, result) => {
      if (err) {
        console.error("Error adding notice:", err);
        res.status(500).json({ error: "Error adding notice" });
        return;
      }
      const newNotice = { id: newId, title, body, stream: stream || null, semester: semester || null };

      // Broadcast the new notice to all connected clients
      io.emit('newNotice', newNotice);
      res.json({ message: "Notice added successfully" });
    }
  );
});

// DELETE route to delete a notice by ID
app.delete("/api/notices/:id", (req, res) => {
  const noticeId = req.params.id;
  console.log("Deleting notice with ID:", noticeId);
  io.emit('deleteNotice', noticeId);
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

  // Calculate the years difference
  const yearsDifference = currentYear - batchYear;

  // Calculate the base semester assuming July as the start for odd semesters
  let semester = yearsDifference * 2 + 1;

  // Adjust semester based on current month
  if (currentMonth < 7) {
    // Before July, it's the first semester of the current academic year
    semester--;
  }
  return semester;
}


function getCurrentAcademicYear(batchYear) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() returns month index from 0-11

  let academicYear;

  // Calculate the academic year
  if (currentMonth >= 1 && currentMonth < 7) { // January to June
    academicYear = currentYear - batchYear;
  } else { // July to December
    academicYear = currentYear - batchYear + 1;
  }

  // Ensure academic year is between 1 and 4
  if (academicYear < 1) {
    academicYear = 1;
  } else if (academicYear > 4) {
    academicYear = 4;
  }

  return academicYear;
}

// Example usage:
const batchYear = 2022;
const currentYear = getCurrentAcademicYear(batchYear);
console.log(`Current academic year for batch ${batchYear}: ${currentYear}`);


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
      const currentYear = getCurrentAcademicYear(batchYear);
      const currentSemester = calculateSemester(batchYear);
      // console.log(`Calculated semester: ${currentSemester} for batch year: ${batchYear}`);
      callback(null, { batchYear, stream, currentSemester, currentYear });
    }
  });
}

// Combined route for timetable
app.get("/timetable", (req, res) => {
  const { uid, stream, year, isAdmin } = req.query;

  if (isAdmin === "true") {
    // Construct the timetable table name based on the user's stream and semester
    const timetableTable = `timetable${stream}${year}`;

    // Query to retrieve timetable based on the dynamically determined table name
    const timetableQuery = `SELECT DayOfWeek, StartTime, EndTime, SubjectName FROM ${timetableTable}`;

    db.query(timetableQuery, (error, results) => {
      if (error) {
        console.error("Error retrieving timetable:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json(results);
    });
  } else {
    getUserDetails(uid, (error, userDetails) => {
      if (error) {
        return res.status(500).json({ error: "Error retrieving user details" });
      }

      const { currentYear, stream } = userDetails;

      // Construct the timetable table name based on the user's stream and semester
      const timetableTable = `timetable${stream}${currentYear}`;

      // Query to retrieve timetable based on the dynamically determined table name
      const timetableQuery = `
      SELECT DayOfWeek, StartTime, EndTime, SubjectName FROM ${timetableTable}`;

      db.query(timetableQuery, (error, results) => {
        if (error) {
          console.error("Error retrieving timetable:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
        res.json(results);
      });
    });
  }
});


app.post("/update-timetable", (req, res) => {
  const { timetable, stream, year } = req.body;
  const timetableTable = `timetable${stream}${year}`;

  const updateQueries = timetable.map((item) => {
    const times = item.time.split(" - ");
    const startTime = times[0];
    const endTime = times[1];
    return Object.keys(item.days).map((day) => {
      const subject = item.days[day] === "-" ? "" : item.days[day];
      return `
        INSERT INTO ${timetableTable} (DayOfWeek, StartTime, EndTime, SubjectName)
        VALUES ('${day}', '${startTime}', '${endTime}', '${subject}')
        ON DUPLICATE KEY UPDATE
        SubjectName = VALUES(SubjectName);
      `;
    });
  }).flat();

  let promises = updateQueries.map(query => {
    return new Promise((resolve, reject) => {
      db.query(query, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  });

  Promise.all(promises)
    .then(() => {
      res.json({ message: "Timetable updated successfully" });
    })
    .catch((error) => {
      console.error("Error updating timetable:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.get("/api/holidays", (req, res) => {
  const query = `SELECT * FROM holidays`;
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching holidays:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

app.post("/api/update_holidays", (req, res) => {
  const holidays = req.body;

  if (!Array.isArray(holidays)) {
    return res.status(400).json({ error: "Invalid data format" });
  }

  const updatePromises = holidays.map(holiday => {
    const { id, festival, no_of_holidays, date, day } = holiday;

    // Ensure all required fields are present
    if (!id || !festival || !no_of_holidays || !date || !day) {
      return Promise.reject(new Error("Missing required holiday fields"));
    }

    const query = `UPDATE holidays SET festival = ?, no_of_holidays = ?, date = ?, day = ? WHERE id = ?`;
    const values = [festival, no_of_holidays, date, day, id]; // Date is already a string

    return new Promise((resolve, reject) => {
      db.query(query, values, (error, results) => {
        if (error) {
          console.error(`Error updating holiday with id ${id}:`, error);
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  });

  Promise.all(updatePromises)
    .then(results => {
      res.json({ message: "Holidays updated successfully" });
    })
    .catch(error => {
      res.status(500).json({ error: "Failed to update holidays" });
    });
});


app.post("/api/add_holiday", (req, res) => {
  const { festival, no_of_holidays, date, day } = req.body;

  // Ensure all required fields are present
  if (!festival || !no_of_holidays || !date || !day) {
    return res.status(400).json({ error: "Missing required holiday fields" });
  }

  const query = `INSERT INTO holidays (festival, no_of_holidays, date, day) VALUES (?, ?, ?, ?)`;
  const values = [festival, no_of_holidays, date, day];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error("Error adding new holiday:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json({ message: "Holiday added successfully", holidayId: results.insertId });
  });
});

app.delete("/api/holidays/:id", (req, res) => {
  const holidayId = req.params.id;
  console.log("Deleting holiday with ID:", holidayId);
  db.query("DELETE FROM holidays WHERE id = ?", [holidayId], (err, result) => {
    if (err) {
      console.error("Error deleting event:", err);
      res.status(500).json({ error: "Error deleting event" });
      return;
    }
    res.json({ message: "Event deleted successfully" });
  });
});



//USE THIS AS A MODEL WHEREVER YOU NEED TO GET THE SEM AND STREAM
app.get("/userdata/:uid", (req, res) => {
  const uid = req.params.uid;
  getUserDetails(uid, (error, userDetails) => {
    if (error) {
      return res.status(error.status).json({ error: error.error });
    }
    const { batchYear, stream, currentSemester } = userDetails;
    res.json({ batchYear, stream, currentSemester });
  });
});

app.get('/api/events', (req, res) => {
  db.query('SELECT * FROM events', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch events' });
    } else {
      res.json(results);
    }
  });
});

// Add a new event
app.post('/api/events', (req, res) => {
  const { thumbnailImage, category, heading, date, driveLink } = req.body;
  const newEvent = { thumbnailImage, category, heading, date, driveLink };

  db.query('INSERT INTO events SET ?', newEvent, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add event' });
    } else {
      res.status(201).json({ id: results.insertId, ...newEvent });
    }
  });
});

app.delete("/api/events/:id", (req, res) => {
  const eventId = req.params.id;
  console.log("Deleting event with ID:", eventId);
  db.query("DELETE FROM events WHERE id = ?", [eventId], (err, result) => {
    if (err) {
      console.error("Error deleting event:", err);
      res.status(500).json({ error: "Error deleting event" });
      return;
    }
    res.json({ message: "Event deleted successfully" });
  });
});

app.get("/", (req, res) => {
  //  res.render('index');
  res.send("Backend API is working");
});

server.listen(port, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log("App listening on port:", port);
  }
});
