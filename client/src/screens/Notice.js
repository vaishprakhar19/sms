
import React, { useState } from 'react';
import axios from 'axios';
import "./notice.css"

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
    <div className='notices'>
      <h2>Add New Notice</h2>
      <form class="form_main notice-form" onSubmit={handleSubmit}>
        <input
        class="inputField"
          type="text"
          placeholder="Notice title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
        class="inputField"
          placeholder="Notice body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></input>
        <button id="button" type="submit">Add Notice</button>
      </form>
    </div>
  );
};

export default Notice;
