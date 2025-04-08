const express = require("express");
const { getUserDetails } = require("../utils");
const db = require("../core/db");
const twilio = require("../core/twilio");

const router = express.Router();

//showing student data

router.get("/users", (req, res) => {
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



// Combined route for timetable
router.get("/timetable", (req, res) => {
  const { uid, stream, year, isAdmin } = req.query;

  if (isAdmin === "true") {
    // Construct the timetable table name based on the user's stream and semester
    const timetableTable = `timetable${stream}${year}`;

    // Query to retrieve timetable based on the dynamically determined table name
    const timetableQuery = `SELECT DayOfWeek, StartTime, EndTime, SubjectName FROM ${timetableTable}`;

    // Execute the SQL query with a timeout
    const queryTimeout = setTimeout(() => {
      res.status(504).json({ error: "Database operation timed out" });
    }, 30000); // 30 second timeout

    db.query(timetableQuery, (error, results) => {
      clearTimeout(queryTimeout);
      
      if (error) {
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
      const timetableQuery = `SELECT DayOfWeek, StartTime, EndTime, SubjectName FROM ${timetableTable}`;

      // Execute the SQL query with a timeout
      const queryTimeout = setTimeout(() => {
        res.status(504).json({ error: "Database operation timed out" });
      }, 30000); // 30 second timeout

      db.query(timetableQuery, (error, results) => {
        clearTimeout(queryTimeout);
        
        if (error) {
          return res.status(500).json({ error: "Internal server error" });
        }
        res.json(results);
      });
    });
  }
});

//USE THIS AS A MODEL WHEREVER YOU NEED TO GET THE SEM AND STREAM
router.get("/userdata/:uid", (req, res) => {
  const uid = req.params.uid;
  getUserDetails(uid, (error, userDetails) => {
    if (error) {
      return res.status(error.status).json({ error: error.error });
    }
    const { batchYear, stream, currentSemester } = userDetails;
    res.json({ batchYear, stream, currentSemester });
  });
});

// Twilio for Whatsapp

router.post('/send-message', (req, res) => {
    const { to, body } = req.body;
    twilio.sendWhatsApp(to, body).then(() => {
      res.send('Message sent successfully');
    }).catch((error) => {
      console.error(error);
      res.status(500).send('Failed to send message');
    });
  });
  
router.post('/test/send-message', (req, res) => {
    twilio.sendWhatsApp("+918279796721", "Twilio is working properly.").then(() => {
      res.send('Message sent successfully');
    }).catch((error) => {
      console.error(error);
      res.status(500).send('Failed to send message');
    });
  });

module.exports = router;
