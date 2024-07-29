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

    try {
      const maxId = notices.reduce((max, notice) => (notice.id > max ? notice.id : max), 0);
      const newId = maxId + 1;

      const streamSegment = noticeStream ? `/${noticeStream}` : '';
      const semesterSegment = noticeSemester ? `/${noticeSemester}` : '';
      const url = `https://biasportalback.vercel.app/api/notices${streamSegment}${semesterSegment}`;

      const response = await axios.post(url, { id: newId, title, body, stream: noticeStream, semester: noticeSemester });
      setNotices([...notices, { id: newId, title, body, stream: noticeStream, semester: noticeSemester }]);

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
         <form className="notice-form" onSubmit={handleAddNotice}>
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
           <div className="input-container">
             <div class="checkbox-wrapper-46">
               <input type="checkbox" id="cbx-46" class="inp-cbx"
                 checked={isNoticeGeneral}
                 onChange={handleGeneralNoticeChange} />
               <label for="cbx-46" class="cbx"
               ><span>
                   <svg viewBox="0 0 12 10" height="10px" width="12px">
                     <polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg>
                 </span>
                 <span>ALL</span>
               </label>
             </div>
           </div>
           {!isNoticeGeneral && (
             <>
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
                   value={noticeSemester || ''} // Ensure empty string if null
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
             </>
           )}
         </div>
         <div className="input-container">
           <button id="button" type="submit">Add Notice</button>
         </div>
       </form>
      )}
      <div className='notices'>
      {notices.map(notice => (
        <div key={notice.id}>
          <div className="notification">
            <div className="notiglow"></div>
            <div className="notiborderglow"></div>
            <div className="notititle">{notice.title}</div>
            <div className="notibody">{notice.body}</div>

            {isAdmin && <>
              <div className="right">{notice.stream} {notice.semester}{notice.semester === null ? "ALL" : notice.semester === 1 ? "st" : notice.semester === 2 ? "nd" : notice.semester === 3 ? "rd" : "th"} semester</div>
              <button className='adminbtn' onClick={() => handleDeleteNotice(notice.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </button>
            </>}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Notice;
