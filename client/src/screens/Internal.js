// src/App.js
import React, { useState } from 'react';
import BackHandler from '../components/BackHandler';

function Internal() {
  BackHandler();
  const [studentId, setStudentId] = useState('');
  const [marksResult, setMarksResult] = useState('');

  const  handlemarks = async (event) => {
    event.preventDefault();
    
    try {
      const studentId = 'student1'
      const response = await fetch(`/api/marks/${studentId}`);
      // const response = await fetch(`/api/marks/student1`);
      if (!response.ok) {
        throw new Error('Marks not found for this student');
      }
      const marksData = await response.json();
      const message = `Subject: ${marksData.subject}, Marks: ${marksData.marks}`;
      await sendWhatsAppMessage(marksData.parentPhoneNumber, message);
      setMarksResult('Message sent to WhatsApp');
    } catch (error) {
      setMarksResult(error.message);
    }
  };

  const sendWhatsAppMessage = async (to, message) => {
    try {
      await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ to: to, body: message })
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to send message');
    }
  };

  return (
    <div>
      <h1>Student Marks</h1>
      <form onSubmit={ handlemarks}>
        <label htmlFor="studentId">Student ID:</label>
        <input type="text" id="studentId" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
        <button type="submit">Get Marks</button>
      </form>
      <div>{marksResult}</div>
    </div>
  );
}

export default Internal;
