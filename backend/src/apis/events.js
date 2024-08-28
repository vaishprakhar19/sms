const express = require("express");
const db = require("../core/db");

const router = express.Router();

router.get('/', (req, res) => {
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
  router.post('/', (req, res) => {
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
  
  router.delete("/:id", (req, res) => {
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

  module.exports = router;