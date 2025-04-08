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
    console.log(`Admin requesting timetable for table: ${timetableTable}`);

    // Query to retrieve timetable based on the dynamically determined table name
    const timetableQuery = `SELECT DayOfWeek, StartTime, EndTime, SubjectName FROM ${timetableTable}`;

    db.query(timetableQuery, (error, results) => {
      if (error) {
        console.error("Error retrieving timetable:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      console.log(`Retrieved ${results.length} timetable entries for admin`);
      res.json(results);
    });
  } else {
    getUserDetails(uid, (error, userDetails) => {
      if (error) {
        console.error("Error retrieving user details:", error);
        return res.status(500).json({ error: "Error retrieving user details" });
      }

      const { currentYear, stream } = userDetails;
      console.log(`User ${uid} requesting timetable with details:`, userDetails);

      // Construct the timetable table name based on the user's stream and semester
      // Make sure to use the correct format: timetableCSE1, timetableECE2, etc.
      const timetableTable = `timetable${stream}${currentYear}`;
      console.log(`User timetable table: ${timetableTable}`);

      // Query to retrieve timetable based on the dynamically determined table name
      const timetableQuery = `SELECT DayOfWeek, StartTime, EndTime, SubjectName FROM ${timetableTable}`;

      db.query(timetableQuery, (error, results) => {
        if (error) {
          console.error("Error retrieving timetable:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
        console.log(`Retrieved ${results.length} timetable entries for user ${uid}`);
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
