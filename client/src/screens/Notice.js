import React, { useState } from 'react';
import axios from 'axios';
import "./notice.css"
import { useAppState } from '../AppStateContext';

const Notice = ({ onAddNotice }) => {
  const { isAdmin } = useAppState();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [noticeStream, setNoticeStream] = useState(''); // Add state for stream
  const [noticeSemester, setNoticeSemester] = useState(''); // Add state for semester
  const [showAddNoticeForm, setShowAddNoticeForm] = useState(false); // Add state to control form visibility

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting automatically
  
    try {
      // Construct the URL based on whether stream and semester are selected
      const streamSegment = noticeStream ? `/${noticeStream}` : '';
      const semesterSegment = noticeSemester ? `/${noticeSemester}` : '';
      const url = `/api/notices${streamSegment}${semesterSegment}`;
  
      await axios.post(url, { title, body });
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
<div className='notice'>
  <h3>Add New Notice</h3>
  <form className="notice-form" onSubmit={handleSubmit}>
    <div className="form-column">
      <div className="input-container">
        <input
          className="inputField"
          type="text"
          placeholder="Notice title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="input-container">
        <textarea
          className="inputField textareaField"
          placeholder="Notice body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          ></textarea>
      </div>
        </div>
    <div className="form-column">
      
      <div className="radio-inputs notice-radio">
        <label className='radio'>
          <input
            type="radio"
            name="stream"
            value="CSE"
            checked={noticeStream === "CSE"}
            onChange={(e) => {
              setNoticeStream(e.target.value);
              setNoticeSemester(''); // Reset NoticeSemester value when changing stream
            }}
          />
          <span className="name">CSE</span>
        </label>
        <label className='radio'>
          <input
            type="radio"
            name="stream"
            value="ECE"
            checked={noticeStream === "ECE"}
            onChange={(e) => {
              setNoticeStream(e.target.value);
              setNoticeSemester(''); // Reset NoticeSemester value when changing stream
            }}
          />
          <span className="name">ECE</span>
        </label>
        <label className='radio'>
          <input
            type="radio"
            name="stream"
            value="MCA"
            checked={noticeStream === "MCA"}
            onChange={(e) => {
              setNoticeStream(e.target.value);
              setNoticeSemester(''); // Reset NoticeSemester value when changing stream
            }}
          />
          <span className="name">MCA</span>
        </label>
      </div>
      <div className="input-container">
      <select
  className="inputField"
  value={noticeSemester}
  onChange={(e) => setNoticeSemester(e.target.value)}
  required={!!noticeStream} // Only required if a stream is selected
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

      </div>
    </div>
    <div className="input-container">
      <button id="button" type="submit">Add Notice</button>
    </div>
  </form>
</div>


);
};

export default Notice;
