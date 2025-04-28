const express = require("express");
const db = require("../core/db");

const router = express.Router();

router.get("/", (req, res) => {
    const query = `SELECT * FROM holidays`;
    db.query(query, (error, results) => {
      if (error) {
        console.error("Error fetching holidays:", error);
        res.status(500).json({error});
        return;
      }
      res.json(results);
    });
  });
  
  router.post("/add", (req, res) => {
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
  
  router.delete("/:id", (req, res) => {
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

  module.exports = router;