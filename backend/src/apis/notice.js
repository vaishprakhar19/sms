const express = require("express");
const db = require("../core/db");

const router = express.Router();

router.get("/:stream?/:semester?/:isAdmin", (req, res) => {
  let { semester, stream, isAdmin } = req.params;

  // Convert empty strings and 'null' strings to actual null values
  semester = (!semester || semester === 'null' || semester === '') ? null : semester;
  stream = (!stream || stream === 'null' || stream === '') ? null : stream;

  console.log("Received parameters:", { semester, stream, isAdmin });

  let query;
  let queryParams;

  if (isAdmin === "true") {
    console.log("Admin user detected");
    query = "SELECT * FROM notices ORDER BY id DESC";
    queryParams = [];
  } else {
    console.log("Non-admin user detected");
    query = `
      SELECT * FROM notices 
      WHERE (semester = ? OR semester IS NULL) 
      AND (stream = ? OR stream IS NULL) 
      ORDER BY id DESC
    `;
    queryParams = [semester, stream];
  }

  console.log("Executing query:", query, "with parameters:", queryParams);

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Error fetching notices" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: "No notices found" });
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
        res.json({ message: "Notice added successfully" });
      }
    );
  });
  
  // DELETE route to delete a notice by ID
  router.delete("/:id", (req, res) => {
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

  module.exports = router;