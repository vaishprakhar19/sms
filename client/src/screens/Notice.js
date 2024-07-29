import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppState } from '../AppStateContext';
import './notice.css';
import { io } from 'socket.io-client';

const Notice = () => {
  const { isAdmin, stream, semester } = useAppState();
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [noticeStream, setNoticeStream] = useState(null);
  const [noticeSemester, setNoticeSemester] = useState(null);
  const [isNoticeGeneral, setIsNoticeGeneral] = useState(false);
  const [showAddNoticeForm, setShowAddNoticeForm] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(`https://biasportalback.vercel.app/api/notices/${stream}/${semester}/${isAdmin}`);
        setNotices(response.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    if ((semester && stream) || isAdmin) {
      fetchNotices();
    }

    const socket = io('https://biasportalback.vercel.app', {
      transports: ['websocket'],
      withCredentials: true
    });

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('newNotice', (newNotice) => {
      setNotices((prevNotices) => [newNotice, ...prevNotices]);
    });

    socket.on('deleteNotice', (noticeId) => {
      setNotices((prevNotices) => prevNotices.filter((notice) => notice.id !== noticeId));
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, [stream, semester, isAdmin]);

  const handleAddNotice = async (e) => {
    e.preventDefault();

    try {
      const maxId = notices.reduce((max, notice) => (notice.id > max ? notice.id : max), 0);
      const newId = maxId + 1;

      const streamSegment = noticeStream ? `/${noticeStream}` : '';
      const semesterSegment = noticeSemester ? `/${noticeSemester}` : '';
      const url = `https://biasportalback.vercel.app/api/notices${streamSegment}${semesterSegment}`;

      const response = await axios.post(url, { id: newId, title, body, stream: noticeStream, semester: noticeSemester });
      setNotices([...notices, response.data]);

      setTitle('');
      setBody('');
      setNoticeStream(null);
      setNoticeSemester(null);
      setIsNoticeGeneral(false);
    } catch (error) {
      console.error('Error adding notice:', error);
    }
  };

  const handleDeleteNotice = async (id) => {
    try {
      await axios.delete(`https://biasportalback.vercel.app/api/notices/${id}`);
      setNotices((prevNotices) => prevNotices.filter((notice) => notice.id !== id));
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };

  const handleGeneralNoticeChange = (e) => {
    setIsNoticeGeneral(e.target.checked);
    if (e.target.checked) {
      setNoticeStream(null);
      setNoticeSemester(null);
    }
  };

  return (
    <div className='notice'>
      <h2>Notices</h2>
      {isAdmin && (
        <button className='adminbtn' onClick={() => setShowAddNoticeForm(!showAddNoticeForm)}>
          {showAddNoticeForm ? 'Cancel' : 'Add Notice'}
        </button>
      )}
      {isAdmin && showAddNoticeForm && (
        <form className='notice-form' onSubmit={handleAddNotice}>
          <div className='form-column'>
            <div className='input-container'>
              <input
                className='inputField'
                type='text'
                placeholder='Notice title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className='input-container'>
              <textarea
                className='inputField textareaField'
                placeholder='Notice body'
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
          <div className='form-column'>
            <div className='input-container'>
              <div className='checkbox-wrapper-46'>
                <input type='checkbox' id='cbx-46' className='inp-cbx' checked={isNoticeGeneral} onChange={handleGeneralNoticeChange} />
                <label htmlFor='cbx-46' className='cbx'>
                  <span>
                    <svg viewBox='0 0 12 10' height='10px' width='12px'>
                      <polyline points='1.5 6 4.5 9 10.5 1'></polyline>
                    </svg>
                  </span>
                  <span>General Notice</span>
                </label>
              </div>
            </div>
            <div className='input-container'>
              <select
                value={noticeStream || ''}
                onChange={(e) => setNoticeStream(e.target.value)}
                disabled={isNoticeGeneral}
              >
                <option value=''>Select stream</option>
                <option value='CSE'>CSE</option>
                <option value='IT'>IT</option>
                <option value='ECE'>ECE</option>
              </select>
            </div>
            <div className='input-container'>
              <select
                value={noticeSemester || ''}
                onChange={(e) => setNoticeSemester(e.target.value)}
                disabled={isNoticeGeneral}
              >
                <option value=''>Select semester</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
              </select>
            </div>
          </div>
          <button type='submit' className='btn'>
            Post
          </button>
        </form>
      )}
      <div className='notice-list'>
        {notices.map((notice) => (
          <div key={notice.id} className='notice-item'>
            <h3>{notice.title}</h3>
            <p>{notice.body}</p>
            {isAdmin && (
              <button className='delete-notice-btn' onClick={() => handleDeleteNotice(notice.id)}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notice;
