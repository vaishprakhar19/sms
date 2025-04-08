const express = require("express");
const db = require("../core/db");

const router = express.Router();

router.post("/register", (req, res) => {
    const { uid, name, mobile, rollNo, batch, gender, department } = req.body;
    
    // Validate required fields
    if (!uid || !name || !mobile || !rollNo || !batch || !gender || !department) {
      console.error("Missing required fields in registration request");
      return res.status(400).json({ error: "All fields are required" });
    }
    
    // Validate department format (should match timetable table naming convention)
    const validDepartments = ["CSE", "ECE", "MCA"];
    if (!validDepartments.includes(department)) {
      console.error(`Invalid department: ${department}`);
      return res.status(400).json({ error: "Invalid department. Must be one of: CSE, ECE, MCA" });
    }
    
    // Validate batch format (should be a year like 2023)
    if (!/^\d{4}$/.test(batch)) {
      console.error(`Invalid batch format: ${batch}`);
      return res.status(400).json({ error: "Batch must be a 4-digit year (e.g., 2023)" });
    }
    
    const sql =
      "INSERT INTO users (uid, name, mobile, rollNo, batch, gender, department) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [uid, name, mobile, rollNo, batch, gender, department];
  
    // Execute the SQL query
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error saving user data:", err);
        
        // Check for duplicate entry error
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ error: "User with this UID already exists" });
        }
        
        res.status(500).json({ error: "An error occurred while saving user data" });
      } else {
        console.log(`User registered successfully: ${uid}, Department: ${department}, Batch: ${batch}`);
        res.status(200).json({ message: "User registered successfully" });
      }
    });
  });

// Endpoint to check if a user exists and get their details
router.get("/user/:uid", (req, res) => {
  const { uid } = req.params;
  
  if (!uid) {
    return res.status(400).json({ error: "UID is required" });
  }
  
  const sql = "SELECT * FROM users WHERE uid = ?";
  
  db.query(sql, [uid], (err, results) => {
    if (err) {
      console.error("Error retrieving user data:", err);
      return res.status(500).json({ error: "An error occurred while retrieving user data" });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Return user data without sensitive information
    const userData = {
      uid: results[0].uid,
      name: results[0].name,
      rollNo: results[0].rollNo,
      batch: results[0].batch,
      department: results[0].department,
      gender: results[0].gender
    };
    
    res.status(200).json(userData);
  });
});

module.exports = router;