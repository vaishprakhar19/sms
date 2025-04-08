const express = require("express");
const db = require("../core/db");

const router = express.Router();

router.post("/register", (req, res) => {
    try {
        const { uid, name, mobile, rollNo, batch, gender, department } = req.body;
        
        console.log("Registration request received:", { uid, name, mobile, rollNo, batch, gender, department });
        
        // Basic validation
        if (!uid || !name || !mobile || !rollNo || !batch || !gender || !department) {
            console.error("Missing required fields in registration request");
            return res.status(400).json({ error: "All fields are required" });
        }
        
        // Simple SQL query without complex validation
        const sql = "INSERT INTO users (uid, name, mobile, rollNo, batch, gender, department) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const values = [uid, name, mobile, rollNo, batch, gender, department];
        
        console.log("Executing SQL query:", sql, "with values:", values);
        
        // Execute the SQL query using the connection pool
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Error saving user data:", err);
                
                // Check for duplicate entry error
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ error: "User with this UID already exists" });
                }
                
                return res.status(500).json({ error: "An error occurred while saving user data" });
            }
            
            console.log(`User registered successfully: ${uid}, Department: ${department}, Batch: ${batch}`);
            return res.status(200).json({ message: "User registered successfully" });
        });
    } catch (error) {
        console.error("Unexpected error in registration:", error);
        return res.status(500).json({ error: "An unexpected error occurred" });
    }
});

// Endpoint to check if a user exists and get their details
router.get("/user/:uid", (req, res) => {
    try {
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
    } catch (error) {
        console.error("Unexpected error in user retrieval:", error);
        return res.status(500).json({ error: "An unexpected error occurred" });
    }
});

module.exports = router;