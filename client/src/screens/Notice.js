
import React, { useState } from 'react';
import axios from 'axios';

const Notice = ({ onAddNotice }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      await axios.post('/api/notices', { title, body });
      onAddNotice({ title, body });
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('Error adding notice:', error);
    }
  };

  return (
    <div>
      <h2>Add New Notice</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Notice title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Notice body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
        <button type="submit">Add Notice</button>
      </form>
    </div>
  );
};

export default Notice;
