const express = require("express");
const db = require("../core/db");
const { updateMenuDataInDatabase } = require("../utils");

const router = express.Router();

router.post("/timetable", (req, res) => {
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

  router.post("/holidays", (req, res) => {
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
  
  router.post("/mess/timing", (req, res) => {
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

  router.post("/mess/menu", (req, res) => {
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

module.exports = router