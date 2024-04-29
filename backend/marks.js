// server.js
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const app = express();
const PORT = 3002;

// Twilio credentials
const accountSid = 'ACeec88105c080eea72e948b4e22c83f42';
const authToken = '7e0cc7095d6913a7e3b8712a953f6421';
const twilioNumber = '+13342139110';

const client = new twilio(accountSid, authToken);

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
app.use(bodyParser.json());
app.get('/api/marks/:studentId', (req, res) => {
  const studentId = "student1";
  const marks = marksData[studentId];
  if (marks) {
    marks.parentPhoneNumber = parentNumbers[studentId]; // Add parent's phone number to marks data
    res.json(marks);
  } else {
    res.status(404).send('Marks not found for this student');
  }
});

// API endpoint to send WhatsApp message
app.post('/api/send-message', (req, res) => {
  const { to, body } = req.body;
  client.messages.create({
    body: body,
    from: `whatsapp:${twilioNumber}`,
    to: `whatsapp:${to}`
  }).then(() => {
    res.send('Message sent successfully');
  }).catch((error) => {
    console.error(error);
    res.status(500).send('Failed to send message');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
