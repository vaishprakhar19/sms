// server.js
const express = require('express');

const router = express.Router();

// Example data sheet mapping student IDs to parent phone numbers
const parentNumbers = {
  'student1': '+917456827497',
  'student2': '+918604615068'
};

// Example marks data (you would fetch this from your Excel sheet or database)
const marksData = {
  'student1': { subject: 'Math', marks: 85 },
  'student2': { subject: 'Science', marks: 90 }
};

// API endpoint to retrieve marks
router.get('/:studentId', (req, res) => {
  const studentId = "student1";
  const marks = marksData[studentId];
  if (marks) {
    marks.parentPhoneNumber = parentNumbers[studentId]; // Add parent's phone number to marks data
    res.json(marks);
  } else {
    res.status(404).send('Marks not found for this student');
  }
});

module.exports = router;