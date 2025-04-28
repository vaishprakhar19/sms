const express = require("express");
const db = require("../core/db");

const router = express.Router();

router.post("/register", (req, res) => {
    const { uid, name, mobile, rollNo, batch, gender, department } = req.body;
    
    // Basic validation
    if (!uid || !name || !mobile || !rollNo || !batch || !gender || !department) {
        return res.status(400).json({ error: "All fields are required" });
    }
    
    // Simple SQL query
    const sql = "INSERT INTO users (uid, name, mobile, rollNo, batch, gender, department) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [uid, name, mobile, rollNo, batch, gender, department];
    
    // Execute the SQL query with a timeout
    const queryTimeout = setTimeout(() => {
        res.status(504).json({ error: "Database operation timed out" });
    }, 30000); // 30 second timeout
    
    db.query(sql, values, (err, result) => {
        clearTimeout(queryTimeout);
        
        if (err) {
            // Check for duplicate entry error
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: "User with this UID already exists" });
            }
            
            return res.status(500).json({ error: "An error occurred while saving user data" });
        }
        
        return res.status(200).json({ message: "User registered successfully" });
    });
});

// Endpoint to check if a user exists and get their details
router.get("/user/:uid", (req, res) => {
    const { uid } = req.params;
    
    if (!uid) {
        return res.status(400).json({ error: "UID is required" });
    }
    
    const sql = "SELECT * FROM users WHERE uid = ?";
    
    // Execute the SQL query with a timeout
    const queryTimeout = setTimeout(() => {
        res.status(504).json({ error: "Database operation timed out" });
    }, 30000); // 30 second timeout
    
    db.query(sql, [uid], (err, results) => {
        clearTimeout(queryTimeout);
        
        if (err) {
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