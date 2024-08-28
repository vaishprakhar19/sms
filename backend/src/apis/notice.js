const express = require("express");
const db = require("../core/db");
const { getIo } = require("../core/socket");

const router = express.Router();

router.get("/:stream/:semester/:isAdmin", (req, res) => {
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
  router.post("/:stream?/:semester?", (req, res) => {
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
        const io = getIo();
        io.emit('newNotice', newNotice);
        res.json({ message: "Notice added successfully" });
      }
    );
  });
  
  // DELETE route to delete a notice by ID
  router.delete("/:id", (req, res) => {
    const noticeId = req.params.id;
    console.log("Deleting notice with ID:", noticeId);
    const io = getIo();
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

  module.exports = router;