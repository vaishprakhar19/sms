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
    <div className='notices '>
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
  <div className='radio-inputs notice-radio'>
    <label  className='radio'>  <input
    type="radio"
    name="stream"
    value="CSE"
    checked={noticeStream === "CSE"}
    onChange={(e) => {
      setNoticeStream(e.target.value);
      setNoticeSemester(''); // Reset SemsetNoticeSemester value when changing stream
    }}
  />
   <span className="name">CSE</span></label>


<label className='radio'> <input
    type="radio"
    id="ece"
    name="stream"
    value="ECE"
    checked={noticeStream === "ECE"}
    onChange={(e) => {
      setNoticeStream(e.target.value);
      setNoticeSemester(''); // Reset SemsetNoticeSemester value when changing stream
    }}
  />
  <span className="name">ECE</span></label> 
  <label className='radio'> <input
    type="radio"
    name="stream"
    value="MCA"
    checked={noticeStream === "MCA"}
    onChange={(e) => {
      setNoticeStream(e.target.value);
      setNoticeSemester(''); // Reset SemsetNoticeSemester value when changing stream
    }}
  />
  <span className="name">MCA</span></label> 
 
</div>

<select
  className="inputField"
  value={noticeSemester}
  onChange={(e) => setNoticeSemester(e.target.value)}
  required
>
  <option value="">Select Semester</option>
  {noticeStream === "MCA" ? (
    <>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </>
  ) : (
    <>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
    </>
  )}
</select>

        <button id="button" type="submit">Add Notice</button>
      </form>
    </div>
  );
};

export default Notice;
