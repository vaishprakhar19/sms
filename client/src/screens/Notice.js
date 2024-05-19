import React, { useState } from 'react';
import axios from 'axios';
import "./notice.css"

const Notice = ({ onAddNotice }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [noticeStream, setNoticeStream] = useState(''); // Add state for stream
  const [noticeSemester, setNoticeSemester] = useState(''); // Add state for semester

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting automatically

    try {
      // Make sure to include stream and semester in the request
      await axios.post(`/api/notices/${noticeStream}/${noticeSemester}`, {title, body});
      onAddNotice({ title, body });
      setTitle('');
      setBody('');
      setNoticeStream(''); // Reset stream
      setNoticeSemester(''); // Reset semester
    } catch (error) {
      console.error('Error adding notice:', error);
    }
  };

  return (
    <div className='notices'>
      <h2>Add New Notice</h2>
      <form className="form_main notice-form" onSubmit={handleSubmit}>
        <input
          className="inputField"
          type="text"
          placeholder="Notice title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="inputField"
          placeholder="Notice body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        {/* Add input fields for stream and semester */}
        <input
          className="inputField"
          placeholder="Stream"
          value={noticeStream}
          onChange={(e) => setNoticeStream(e.target.value)}
          required
        />
        <input
          className="inputField"
          placeholder="Semester"
          value={noticeSemester}
          onChange={(e) => setNoticeSemester(e.target.value)}
          required
        />
        <button id="button" type="submit">Add Notice</button>
      </form>
    </div>
  );
};

export default Notice;
